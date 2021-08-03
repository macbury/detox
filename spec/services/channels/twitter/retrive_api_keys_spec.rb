require 'rails_helper'

RSpec.describe Channels::Twitter::RetriveApiKeys do
  include_context 'asyncReactor'

  subject { described_class.call }

  before do
    stub_request(:any, 'https://twitter.com/')
      .to_return(
        status: 200,
        body: file_fixture('twitter/page.html').read,
        headers: {
          'content-type' => 'text/html'
        }
      )
    stub_request(:any, 'https://abs.twimg.com/responsive-web/client-web-legacy/main.048ed425.js')
      .to_return(
        status: 200,
        body: file_fixture('twitter/main.js').read,
        headers: {
          'content-type' => 'text/javascript'
        }
      )
  end

  it 'returns api token and guest token' do
    guest_token, api_token = subject

    expect(guest_token).to eq('1400376866142404619')
    expect(api_token).to eq('AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA')
  end
end