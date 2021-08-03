require 'rails_helper'

# Ported from https://github.com/atmos/camo/blob/master/test/proxy_test.rb
# Run server in background using: PROXY_KEY=0x24FEEDFACEDEADBEEFCAFE FRONTEND_PORT=5555 yarn web:start
RSpec.describe 'WarpPipe', type: :proxy do
  let(:frontend_port) { 5555 }
  let(:config_host) { "http://localhost:#{ENV.fetch('FRONTEND_PORT', frontend_port)}" }

  before do
    WebMock.disable!
    allow_any_instance_of(Security::GenerateProxyUrl).to receive(:proxy_host).and_return(config_host)
  end

  xit 'proxy localhost test server' do
    spawn_server :ok do |host|
      response = RestClient.get("http://#{host}/octocat.jpg")
      expect(response.code).to be(200)

      response = request("http://#{host}/octocat.jpg")
      expect(response.code).to be(200)
    end
  end

  xit 'redirect without location' do
    response = request('http://media.ebaumsworld.com/picture/Mincemeat/Pimp.jpg')
    expect(response.code).to be(200)

    spawn_server(:redirect_without_location) do |host|
      expect { request("http://#{host}") }.to raise_error(RestClient::ResourceNotFound)
    end
  end

  xit 'follows https redirect for image links' do
    response = request('https://user-images.githubusercontent.com/38/30243591-b332eb8a-9561-11e7-8b8c-cad1fe0c821c.jpg')
    expect(response.code).to be(200)
  end

  xit 'always sets security headers' do
    ['/api/proxy/status', '/api/proxy'].each do |path|
      response = RestClient.get("#{config_host}#{path}")

      expect(response.headers[:x_frame_options]).to eq('deny')
      expect(response.headers[:content_security_policy]).to eq("default-src 'none'; img-src data:; media-src *; style-src 'unsafe-inline'")
      expect(response.headers[:x_content_type_options]).to eq('nosniff')
      expect(response.headers[:strict_transport_security]).to eq('max-age=31536000; includeSubDomains')
    end

    response = request('https://user-images.githubusercontent.com/38/30243591-b332eb8a-9561-11e7-8b8c-cad1fe0c821c.jpg')

    expect(response.headers[:x_frame_options]).to eq('deny')
    expect(response.headers[:content_security_policy]).to eq("default-src 'none'; img-src data:; media-src *; style-src 'unsafe-inline'")
    expect(response.headers[:x_content_type_options]).to eq('nosniff')
    expect(response.headers[:strict_transport_security]).to eq('max-age=31536000; includeSubDomains')
  end

  xit 'proxy valid image url' do
    response = request('http://media.ebaumsworld.com/picture/Mincemeat/Pimp.jpg')
    expect(response.code).to be(200)
  end

  xit 'svg image with delimited content type url' do
    response = request('https://saucelabs.com/browser-matrix/bootstrap.svg')
    expect(response.code).to be(200)
  end

  xit 'proxy valid image url with crazy subdomain' do
    response = request('http://68.media.tumblr.com/c5834ed541c6f7dd760006b05754d4cf/tumblr_osr3veEPRj1uzkitwo1_1280.jpg')
    expect(response.code).to be(200)
  end

  xit 'strict image content type checking' do
    expect { request("http://calm-shore-1799.herokuapp.com/foo.png") }.to raise_error(RestClient::ResourceNotFound)
  end

  xit 'proxy valid google chart url' do
    response = request('http://chart.apis.google.com/chart?chs=920x200&chxl=0:%7C2010-08-13%7C2010-09-12%7C2010-10-12%7C2010-11-11%7C1:%7C0%7C0%7C0%7C0%7C0%7C0&chm=B,EBF5FB,0,0,0&chco=008Cd6&chls=3,1,0&chg=8.3,20,1,4&chd=s:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&chxt=x,y&cht=lc')
    expect(response.code).to be(200)
  end

  xit 'proxy valid chunked image file' do
    response = request('https://www.httpwatch.com/httpgallery/chunked/chunkedimage.aspx')

    expect(response.code).to be(200)
    expect(response.headers[:content_length]).to be_nil
  end

  xit 'proxy https octocat' do
    response = request('https://octodex.github.com/images/original.png')
    expect(response.code).to be(200)
  end

  xit 'proxy https gravatar' do
    response = request('https://1.gravatar.com/avatar/a86224d72ce21cd9f5bee6784d4b06c7')
    expect(response.code).to be(200)
  end

  xit 'follows redirects' do
    response = request('https://httpbin.org/redirect-to?status_code=301&url=https%3A%2F%2Fhttpbin.org%2Fimage%2Fjpeg')
    expect(response.code).to be(200)
  end

  xit 'follows redirects with path only location headers' do
    request('https://httpbin.org/redirect-to?url=%2Fimage%2Fjpeg')
  end

  xit 'forwards 404 with image' do
    spawn_server(:not_found) do |host|
      expect { request("http://#{host}/octocat.jpg") }.to raise_error(RestClient::NotFound)
    end
  end

  xit '404s on request error' do
    spawn_server(:crash_request) do |host|
      expect { request("http://#{host}/cats.png") }.to raise_error(RestClient::ResourceNotFound)
    end
  end

  xit '404s on infinidirect' do
    expect { request('http://modeselektor.herokuapp.com/') }.to raise_error(RestClient::ResourceNotFound)
  end

  xit '404s on urls without an http host' do
    expect { request('/picture/Mincemeat/Pimp.jpg') }.to raise_error(RestClient::ResourceNotFound)
  end

  xit '404s on host not found' do
    expect { request('http://flabergasted.cx') }.to raise_error(RestClient::ResourceNotFound)
  end

  xit '404s on non image content type' do
    expect { request('https://github.com/atmos/cinderella/raw/master/bootstrap.sh') }.to raise_error(RestClient::ResourceNotFound)
  end

  xit '404s on connect timeout' do
    expect { request('http://10.0.0.1/foo.cgi') }.to raise_error(RestClient::ResourceNotFound)
  end

  xit '404s on environmental excludes' do
    expect { request('http://iphone.internal.example.org/foo.cgi') }.to raise_error(RestClient::ResourceNotFound)
  end

  xit 'follows temporary redirects' do
    response = request('https://httpbin.org/redirect-to?status_code=302&url=https%3A%2F%2Fhttpbin.org%2Fimage%2Fjpeg')
    expect(response.code).to eq(200)
  end

  xit '404s send cache headers' do
    uri = Security::GenerateProxyUrl.call("http://example.org/")
    response = RestClient.get(uri) { |response, _request, _result| response }

    expect(response.code).to eq(404)
    expect(response.headers[:expires]).to eq("0")
    expect(response.headers[:cache_control]).to eq("no-cache, no-store, private, must-revalidate")
  end
end