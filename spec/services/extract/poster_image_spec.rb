require 'rails_helper'

RSpec.describe Extract::PosterImage do
  subject(:poster) { described_class.call(input_content) }

  describe 'get biggest image' do
    let(:input_content) { file_fixture('images.html').read }

    before do
      stub_request(:get, "https://news.bitcoin.com/wp-content/uploads/2020/07/dommy.jpg").
        to_return(status: 200, body: file_fixture('dommy.jpg').read)

      stub_request(:get, "https://news.bitcoin.com/wp-content/uploads/2020/07/streetlights-768x432.jpg").
        to_return(status: 200, body: file_fixture('streetlights-768x432.jpg').read)

      stub_request(:get, "https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg").
        to_return(status: 200, body: file_fixture('domsy101.jpg').read)
    end

    it { expect(poster.url).to eq('https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg') }
    it { expect(poster.width).to eq(1280) }
    it { expect(poster.height).to eq(720) }
  end

  describe 'ignore too small images' do
    let(:input_content) { '<img data-detox-src="https://www.home-assistant.io/images/favicon-192x192.png" />' }

    before do
      stub_request(:get, "https://www.home-assistant.io/images/favicon-192x192.png").
        to_return(status: 200, body: file_fixture('favicon-192x192.png').read)
    end

    it { expect(poster.url).to eq('https://www.home-assistant.io/images/favicon-192x192.png') }
    it { expect(poster.width).to eq(192) }
    it { expect(poster.height).to eq(192) }
  end

  describe 'ignore wrong images' do
    let(:input_content) { '<img data-detox-src="https://duckduckgo.com" />' }

    before do
      stub_request(:get, "https://duckduckgo.com").
        to_return(status: 200, body: '')
    end

    it { is_expected.to be_nil }
  end

  describe 'ignore empty content' do
    let(:input_content) { '<p>Boohohooho</p>' }

    it { is_expected.to be_nil }
  end
end