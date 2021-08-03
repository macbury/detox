require 'rails_helper'

RSpec.describe Channels::Discovery do
  include_context 'asyncReactor'

  subject(:result) { described_class.call(url: url) }

  describe 'when rss discovery' do
    describe 'reason.com' do
      let(:url) { 'https://reason.com' }

      before do
        stub_request(:any, "https://reason.com").
          to_return(status: 200, body: file_fixture('reason.html'), headers: { 'content-type': 'text/html' })

        stub_request(:any, "https://reason.com/feed").
          to_return(status: 200, body: file_fixture('reason.rss'))

        stub_request(:any, 'https://reason.com/latest/feed/').
          to_return(status: 200, body: file_fixture('reason.rss'))
 
        stub_request(:any, "https://reason.com/feed/").
          to_return(status: 200, body: file_fixture('reason.rss'), headers: {})

        stub_request(:any, "https://reason.com/rss").
          to_return(status: 404, body: "", headers: {})

        stub_request(:any, "https://reason.com/rss.xml").
          to_return(status: 404, body: "", headers: {})

        stub_request(:any, "https://reason.com/atom").
          to_return(status: 404, body: "", headers: {})

        stub_request(:any, "https://reason.com/feed.rss").
          to_return(status: 404, body: "", headers: {})

        stub_request(:any, "https://reason.com/feed.xml").
          to_return(status: 404, body: "", headers: {})

        stub_request(:any, "https://reason.com/feed.atom").
          to_return(status: 404, body: "", headers: {})

        stub_request(:any, /reason.com\/wp-json/).
          to_return(status: 404, body: "{}", headers: {})

        stub_request(:any, /https:\/\/reason.com\/wp-content\/themes/).
          to_return(status: 200, body: "", headers: {})
      end

      it { expect(result.map(&:source)).to eq ['https://reason.com/feed'] }
      it { expect(result.map(&:kind)).to eq ['rss'] }
    end

    describe 'signal.org' do
      let(:url) { 'https://signal.org/blog/' }

      before do
        stub_request(:any, 'https://signal.org/blog/')
          .to_return(status: 200, body: file_fixture('signal.html').read, headers: { 'content-type': 'text/html' })

        stub_request(:any, "https://signal.org/blog/rss.xml")
          .to_return(status: 200, body: file_fixture('signal.rss').read)

        stub_request(:any, 'https://signal.org/blog/feed')
          .to_return(status: 404, body: "", headers: {})
        stub_request(:any, 'https://signal.org/blog/rss')
          .to_return(status: 404, body: "", headers: {})
        stub_request(:any, 'https://signal.org/blog/atom')
          .to_return(status: 404, body: "", headers: {})
        stub_request(:any, 'https://signal.org/blog/feed.rss')
          .to_return(status: 404, body: "", headers: {})
        stub_request(:any, 'https://signal.org/blog/feed.xml')
          .to_return(status: 404, body: "", headers: {})
        stub_request(:any, 'https://signal.org/blog/feed.atom')
          .to_return(status: 404, body: "", headers: {})

        allow(Favicon::FromUrl).to receive(:call).and_return('https://page.local/favicon.png')
      end

      it { expect(result.map(&:kind)).to eq ['rss'] }
      it { expect(result.map(&:title)).to eq ['Signal Blog'] }
    end

    describe 'fake page' do
      let(:url) { 'http://fake.local' }

      before do
        stub_request(:any, /fake.local/)
          .to_return(status: 404, body: "{}", headers: {})
      end

      it { is_expected.to be_empty }
    end

    describe 'shitty string' do
      let(:url) { 'this is not a fucking url' }

      it { expect { result }.to raise_error(ServiceFailure, /this is not a fucking url/) }
    end
  end

  describe 'when twitter discovery' do
    before do
      allow(Channels::Twitter::RetriveApiKeys).to receive(:call).and_return(['key', 'key'])
    end

    describe 'with invalid twitter' do
      let(:url) { 'https://twitter.com/' }

      before do
        allow(Channels::Twitter::Fetch).to receive(:call).and_return(JSON.parse(file_fixture('twitter/empty_feed.json').read))
      end

      it { is_expected.to be_empty }
    end

    describe 'with existing user handler' do
      let(:url) { 'https://twitter.com/futurepaul' }

      before do
        allow(Channels::Twitter::Fetch).to receive(:call).and_return(JSON.parse(file_fixture('twitter/feed.json').read))
      end

      it { is_expected.not_to be_empty }
      it { expect(result.map(&:source)).to eq ['https://twitter.com/futurepaul'] }
      it { expect(result.map(&:kind)).to eq ['twitter'] }
      it { expect(result.map(&:title)).to eq ['futurepaul'] }
      it { expect(result.map(&:url)).to eq ['https://twitter.com/futurepaul'] }
    end
  end

  describe 'when youtube discovery' do
    describe 'with sutrowatchtower' do
      let(:url) { 'https://www.youtube.com/user/sutrowatchtower' }

      before do
        stub_request(:any, "https://www.youtube.com/user/sutrowatchtower").
          to_return(status: 200, body: file_fixture('sutrowatchtower.html'), headers: { 'content-type': 'text/html' })
      end

      it { expect(result.map(&:source)).to eq ['https://www.youtube.com/feeds/videos.xml?channel_id=UC5T0tXJN5CrMZUEJuz4oovw'] }
      it { expect(result.map(&:kind)).to eq ['youtube'] }
      it { expect(result.map(&:title)).to eq ['Nerdrotic'] }
      it { expect(result.map(&:url)).to eq ['https://www.youtube.com/channel/UC5T0tXJN5CrMZUEJuz4oovw'] }
    end

    describe 'with tasty' do
      let(:url) { 'https://www.youtube.com/channel/UCJFp8uSYCjXOMnkUyb3CQ3Q' }

      before do
        stub_request(:any, "https://www.youtube.com/channel/UCJFp8uSYCjXOMnkUyb3CQ3Q").
          to_return(status: 200, body: file_fixture('tasty.html'), headers: { 'content-type': 'text/html' })
      end

      it { expect(result.map(&:source)).to eq ['https://www.youtube.com/feeds/videos.xml?channel_id=UCJFp8uSYCjXOMnkUyb3CQ3Q'] }
      it { expect(result.map(&:kind)).to eq ['youtube'] }
      it { expect(result.map(&:title)).to eq ['Tasty'] }
      it { expect(result.map(&:url)).to eq ['https://www.youtube.com/channel/UCJFp8uSYCjXOMnkUyb3CQ3Q'] }
    end
  end
end
