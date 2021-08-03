require 'rails_helper'

RSpec.describe Proxy::ResolveUrl do
  include_context 'asyncReactor'

  subject(:result) { described_class.call(url) }
  let(:current_user) { create(:user) }

  describe 'when http://homeassistant.io' do
    let(:url) { 'http://homeassistant.io' }

    before do
      stub_request(:head, "http://homeassistant.io").
        to_return(
          status: 301,
          body: '',
          headers: {
            location: 'https://www.home-assistant.io'
          }
        )

      stub_request(:head, "https://www.home-assistant.io/").
        to_return(status: 200, body: "", headers: {})
    end

    it { is_expected.to eq('https://www.home-assistant.io/') }
  end

  describe 'when https://news.bitcoin.com' do
    let(:url) { 'https://news.bitcoin.com' }

    before do
      stub_request(:head, "https://news.bitcoin.com").
        to_return(status: 200, body: "", headers: {})
    end

    it { is_expected.to eq('https://news.bitcoin.com') }
  end
end