require 'rails_helper'

RSpec.describe Channels::Create do
  include_context 'asyncReactor'

  subject(:channel) { described_class.call(**attributes) }

  let(:current_user) { create(:user) }

  context 'when youtube' do
    let(:attributes) { { source: 'https://www.youtube.com/user/FreeTalkLiveRadio', kind: :youtube, user: current_user } }

    before do
      stub_request(:any, "https://www.youtube.com/user/FreeTalkLiveRadio").
        to_return(status: 200, body: file_fixture('youtube/FreeTalkLiveRadio.html'), headers: { 'content-type': 'text/html' })
      allow(Proxy::ResolveUrl).to receive(:call).and_return('https://www.youtube.com/user/FreeTalkLiveRadio')
      stub_request(:any, /ggpht.com/).to_return(status: 200, body: "", headers: {})
    end

    it { is_expected.to be_persisted }
    it { expect(channel.source).to eq('https://www.youtube.com/user/FreeTalkLiveRadio') }
    it { expect(channel.user).to eq(current_user) }
    it { is_expected.to be_youtube }
    it { expect(RefreshChannelJob).to have_been_enqueued.with(channel.id) }
  end

  context 'when rss' do
    let(:attributes) { { source: 'http://www.rubyflow.com/rss', kind: :rss, user: current_user } }

    before do
      stub_request(:any, "http://www.rubyflow.com/favicon.png").
        to_return(status: 200, body: file_fixture('dommy.jpg'))
      stub_request(:any, "http://www.rubyflow.com").
        to_return(status: 200, body: file_fixture('rubyflow.html'), headers: { 'content-type': 'text/html' })
      stub_request(:any, "http://www.rubyflow.com/rss").
        to_return(status: 200, body: file_fixture('rubyflow.rss'))
    end

    it { is_expected.to be_persisted }
    it { expect(channel.source).to eq('http://www.rubyflow.com/rss') }
    it { expect(channel.user).to eq(current_user) }
    it { is_expected.to be_rss }
    it { expect(RefreshChannelJob).to have_been_enqueued.with(channel.id) }
  end

  describe 'when have invalid attribute' do
    let(:attributes) { { kind: :rss, source: 'http://example.com', user: current_user } }

    before do
      stub_request(:any, 'http://example.com').and_return(status: 200, body: 'this should fail')
    end

    it { expect { channel }.to raise_error('No valid parser for XML.') }
  end

  describe 'when fetching normal webpage' do
    let(:attributes) { { kind: :rss, source: 'https://reason.com/', user: current_user } }

    before do
      stub_request(:any, 'https://reason.com/').and_return(status: 200, body: '<html>content</html>')
    end

    it { expect { channel }.to raise_error('No valid parser for XML.') }
  end
end