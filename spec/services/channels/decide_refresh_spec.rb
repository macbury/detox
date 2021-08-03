require 'rails_helper'

RSpec.describe Channels::DecideRefreshStrategy do
  include_context 'asyncReactor'

  subject(:service) { described_class.call(channel) }

  before do
    Timecop.freeze(Time.zone.parse('2020-07-03 11:00:29'))
    expect(Channels::UpdateIcon).to receive(:call)
  end

  after { Timecop.return }

  describe 'when rss' do
    let(:channel) { create(:channel, :with_user, kind: kind, status: :error, last_check_at: Time.zone.parse('2020-06-03 01:00:29'), error: 'some error', source: "http://www.rubyflow.com/rss") }
    let(:kind) { :rss }

    before do
      stub_request(:any, "http://www.rubyflow.com/rss").
        to_return(status: 200, body: file_fixture('rubyflow.rss'), headers: {})
    end

    it 'uses Rss::Refresh service' do
      expect(Channels::Rss::Refresh).to receive(:call).with(channel)
      expect(service).to be(true)
    end

    it { expect(service).to be(true) }
    it { expect { service }.to change(channel, :status).from('error').to('refreshed') }
    it { expect { service }.to change(channel, :error).from('some error').to(nil) }
    it { expect { service }.to change(channel, :last_check_at).from(Time.zone.parse('2020-06-03 01:00:29')).to(Time.zone.parse('2020-07-03 11:00:29')) }
  end

  describe 'when twitter' do
    let(:channel) { create(:channel, :with_user, kind: kind, status: :archived, source: "http://www.rubyflow.com/rss") }
    let(:kind) { :twitter }

    xit { expect { service }.to change(channel, :status).from('archived').to('error') }
    xit { expect { service }.to change(channel, :error).to('Kind twitter is not supported, Cannot refresh channel: http://www.rubyflow.com/rss') }
  end

  describe 'when youtube' do
    let(:channel) { create(:channel, :with_user, kind: kind, status: :error, last_check_at: Time.zone.parse('2020-06-03 01:00:29'), error: 'some error', source: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCJFp8uSYCjXOMnkUyb3CQ3Q') }
    let(:kind) { :youtube }

    before do
      stub_request(:any, "https://www.youtube.com/feeds/videos.xml?channel_id=UCJFp8uSYCjXOMnkUyb3CQ3Q").
        to_return(status: 200, body: file_fixture('spaceDock.rss'))

      stub_request(:any, /ytimg.com/).
        to_return(status: 200, body: file_fixture('maxresdefault.jpg'))

      stub_request(:any, /www.youtube.com\/watch/i).
        to_return(status: 200, body: file_fixture('youtube/Z3fr6c9Ek64.html').read)
    end

    it 'uses Rss::Refresh service' do
      expect(Channels::Rss::Refresh).to receive(:call).with(channel)
      expect(service).to be(true)
    end

    it { expect(service).to be(true) }
    it { expect { service }.to change(channel, :status).from('error').to('refreshed') }
    it { expect { service }.to change(channel, :error).from('some error').to(nil) }
    it { expect { service }.to change(channel, :last_check_at).from(Time.zone.parse('2020-06-03 01:00:29')).to(Time.zone.parse('2020-07-03 11:00:29')) }
  end
end