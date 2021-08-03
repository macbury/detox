require 'rails_helper'

RSpec.describe Channels::Rss::Refresh do
  include_context 'asyncReactor'

  subject(:service) { perform_enqueued_jobs { described_class.call(channel) } }

  let(:today) { Time.zone.parse('2020-07-02 11:30:52') }

  before do
    Timecop.freeze(today)
    allow(Extract::PageMetadata).to receive(:call).and_return(nil)
    allow(Sanitizer::CacheImageSizeAndBlurhash).to receive(:call).and_return(nil)
    allow(Proxy::ResolveUrl).to receive(:call) { |url| url } # just pass url and do not resolve them
  end

  after { Timecop.return }

  describe 'download only new stories' do
    let(:channel) { create(:channel, :with_user, kind: :rss, source: 'https://reason.com/feed/') }

    before do
      stub_request(:any, "https://reason.com/feed/")
        .to_return(status: 200, body: file_fixture('reason.rss'))

      stub_request(:get, /cloudfront/)
        .to_return(status: 200, body: file_fixture('dommy.jpg'))

      stub_request(:any, /https:\/\/reason\.com\/2020/i)
        .to_return(status: 200, body: "", headers: {})
    end

    it 'dont create rss story' do
      expect(Channels::Rss::BlacklistedEntry).to receive(:call).exactly(10).and_return(false)

      expect { service }.to change(Story, :count).by(10)
      expect { service }.to change(Story, :count).by(0)
    end

    it 'block rss story' do
      expect(Channels::Rss::BlacklistedEntry).to receive(:call).exactly(10).and_return(true)

      expect { service }.to change(Story, :count).by(0)
    end
  end

  describe 'hackaday.com' do
    let(:channel) { create(:channel, :with_user, kind: :rss, source: 'https://hackaday.com/feed/', status: :archived) }

    before do
      stub_request(:any, "https://hackaday.com/feed/")
        .to_return(status: 200, body: file_fixture('hackaday.rss'))

      stub_request(:any, /hackaday.com\/wp-content\/uploads/i)
        .to_return(status: 200, body: file_fixture('dommy.jpg'))
      stub_request(:head, /hackaday.co/)
        .to_return(status: 200, body: "", headers: {})
    end

    it { expect { service }.to change(Story, :count).by(7) }
    it { expect { service }.to change(Article, :count).by(7) }

    it 'have articles with comments' do
      service

      expect(channel.stories.first.attachment.comments_url).to eq('https://hackaday.com/2020/09/06/diy-relay-module-saves-time/#comments')
    end
  end

  describe 'reason.com' do
    let(:channel) { create(:channel, :with_user, kind: :rss, source: 'https://reason.com/feed/', status: :archived) }

    before do
      stub_request(:any, "https://reason.com/feed/").
        to_return(status: 200, body: file_fixture('reason.rss'))

      stub_request(:get, /cloudfront/)
        .to_return(status: 200, body: file_fixture('dommy.jpg'))

      stub_request(:any, /https:\/\/reason\.com\/2020/i)
        .to_return(status: 200, body: "", headers: {})
    end

    it { expect { service }.to change(Story, :count).by(10) }
    it { expect { service }.to change(Article, :count).by(10) }

    it 'uses sanitizer' do
      expect(Sanitizer::Story).to receive(:call).exactly(10).times.and_return('body from sanitizer')
      service
      expect(channel.stories.first.summary).to eq('body from sanitizer')
      expect(channel.stories.first.attachment.body).to eq('body from sanitizer')
    end

    describe 'second story' do
      subject(:story) { channel.stories.find_by!(guid: 'https://reason.com/?p=8083330') }

      before { service }

      it { expect(story.guid).to eq('https://reason.com/?p=8083330') }
      it { expect(story.summary).to be_present }
      it { expect(story.title).to eq 'School Calls Cops on 12-Year-Old Boy Who Held Toy Gun During Zoom Class' }
      it { expect(story.permalink).to eq 'https://reason.com/2020/09/07/zoom-nerf-gun-school-cops-kid-isaiah-elliott/' }
      it { expect(story.published_at).to eq story.view_at }
    end
  end
end