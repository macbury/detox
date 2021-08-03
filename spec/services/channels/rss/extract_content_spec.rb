require 'rails_helper'

RSpec.describe Channels::Rss::ExtractContent do
  subject { described_class.async_call(entry, channel) }

  let(:channel) { create(:channel, :with_user, kind: :rss, download_page: download_page, source: source, site_url: site_url, extraction_rules: extraction_rules) }
  let(:rss) { Feedjira.parse(feed_rss) }
  let(:entry) { rss.entries.first }

  describe 'dilbert.com' do
    let(:feed_rss) { file_fixture('feeds/dilbert.xml').read }
    let(:source) { 'https://dilbert.com/feed' }
    let(:site_url) { 'https://dilbert.com' }
    let(:extraction_rules) { 'span.comic-title-name, img.img-comic' }
    let(:download_page) { true }

    before do
      stub_request(:any, "https://dilbert.com/strip/2021-04-07")
        .to_return(status: 200, body: file_fixture('extract/dilbert_strip.html'), headers: { 'content-type': 'text/html' })

      stub_request(:get, /assets.amuniversal.com/)
        .to_return(status: 404, body: "", headers: {})
    end

    it 'downloads and extract comic strip' do
      is_expected.to match_snapshot('extract/dilbert/strip.html')
    end
  end

  describe '/r/unixporn' do
    let(:feed_rss) { file_fixture('feeds/unixporn.rss').read }
    let(:source) { 'https://www.reddit.com/r/unixporn/.rss' }
    let(:site_url) { 'https://reddit.com/r/unixporn/' }
    let(:extraction_rules) { 'img' }
    let(:download_page) { false }
    let(:entry) { rss.entries.second }

    before do
      stub_request(:get, /preview.redd.it/)
        .to_return(status: 404, body: "", headers: {})
    end

    it 'downloads and extract comic strip' do
      is_expected.to match_snapshot('extract/unixporn/image.html')
    end
  end

  describe 'ipfs.io' do
    let(:feed_rss) { file_fixture('feeds/ipfs.xml').read }
    let(:source) { 'https://ipfs.io/feed' }
    let(:site_url) { 'https://ipfs.io' }
    let(:extraction_rules) { 'a' }
    let(:download_page) { false }

    it 'extract content from feed' do
      is_expected.to match_snapshot('extract/ipfs/strip_only_a.html')
    end
  end
end