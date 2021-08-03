require 'rails_helper'

RSpec.describe Channels::Youtube::Download do
  include_context 'asyncReactor'

  describe 'when passes valid channel id' do
    subject(:metadata) { described_class.call(youtube_channel_id: channel_id) }
    let(:channel_id) { 'UCItHdUEqlpfvDlcCeyZwH6w' }

    before do
      stub_request(:any, "https://youtube.com/channel/UCItHdUEqlpfvDlcCeyZwH6w").
        to_return(status: 200, body: file_fixture('youtube/MenOfTheWest.html'), headers: {
          'content-type': 'text/html'
        })
    end

    it { expect(metadata.kind).to eq('youtube') }
    it { expect(metadata.title).to eq('Men of the West') }
    it { expect(metadata.source).to eq('https://www.youtube.com/feeds/videos.xml?channel_id=UCItHdUEqlpfvDlcCeyZwH6w') }
    it { expect(metadata.site_url).to eq('https://www.youtube.com/channel/UCItHdUEqlpfvDlcCeyZwH6w') }
    it { expect(metadata.icon_url).to eq('https://yt3.ggpht.com/a/AATXAJyypJaedj7vchv3K2PZlrX3PFs8E71WCB3vUhsO9w=s900-c-k-c0xffffffff-no-rj-mo') }
    it { expect(metadata.id).to eq('UCItHdUEqlpfvDlcCeyZwH6w') }
    it { expect(metadata.description).to be_present }
  end

  describe 'when passes invalid channel id' do
    subject(:metadata) { described_class.call(youtube_channel_id: channel_id) }
    let(:channel_id) { 'fakechannelid' }

    before do
      stub_request(:any, "https://youtube.com/channel/fakechannelid").
        to_return(status: 404, body: file_fixture('youtube/404.html'), headers: {
          'content-type': 'text/html'
        })
    end

    it { expect { metadata }.to raise_error(ServiceFailure, 'Response status code is invalid: 404') }
  end

  describe 'when passes valid channel url' do
    subject(:metadata) { described_class.call(youtube_url: youtube_url) }
    let(:youtube_url) { 'https://www.youtube.com/user/numberphile' }

    before do
      stub_request(:any, "https://www.youtube.com/user/numberphile").
        to_return(status: 200, body: file_fixture('youtube/numberphile.html'), headers: {
          'content-type': 'text/html'
        })
    end

    it { expect(metadata.kind).to eq('youtube') }
    it { expect(metadata.title).to eq('Numberphile') }
    it { expect(metadata.source).to eq('https://www.youtube.com/feeds/videos.xml?channel_id=UCoxcjq-8xIDTYp3uz647V5A') }
    it { expect(metadata.site_url).to eq('https://www.youtube.com/channel/UCoxcjq-8xIDTYp3uz647V5A') }
    it { expect(metadata.icon_url).to eq('https://yt3.ggpht.com/a/AATXAJy3xtsIRabi8_-bFFQYCKg2UTHDEiyFbyfrYbj7Tg=s900-c-k-c0xffffffff-no-rj-mo') }
    it { expect(metadata.id).to eq('UCoxcjq-8xIDTYp3uz647V5A') }
    it { expect(metadata.description).to be_present }
  end

  describe 'when passes valid channel url' do
    subject(:metadata) { described_class.call(youtube_url: youtube_url) }
    let(:youtube_url) { 'https://www.youtube.com/channel/UCWt3xWeVSCnVPZFdhcjFsUQ' }

    before do
      stub_request(:any, "https://www.youtube.com/channel/UCWt3xWeVSCnVPZFdhcjFsUQ").
        to_return(status: 200, body: file_fixture('youtube/animelab.html'), headers: {
          'content-type': 'text/html'
        })
    end

    it { expect(metadata.kind).to eq('youtube') }
    it { expect(metadata.title).to eq('animelab') }
    it { expect(metadata.source).to eq('https://www.youtube.com/feeds/videos.xml?channel_id=UCWt3xWeVSCnVPZFdhcjFsUQ') }
    it { expect(metadata.site_url).to eq('https://www.youtube.com/channel/UCWt3xWeVSCnVPZFdhcjFsUQ') }
    it { expect(metadata.icon_url).to eq('https://yt3.ggpht.com/a/AATXAJyVcg3bGw4Lu2QPEupnHVoruyV2We1vhze4BaMugQ=s900-c-k-c0xffffffff-no-rj-mo') }
    it { expect(metadata.id).to eq('UCWt3xWeVSCnVPZFdhcjFsUQ') }
    it { expect(metadata.description).to be_present }
  end
end