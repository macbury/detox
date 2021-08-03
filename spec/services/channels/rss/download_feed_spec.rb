require 'rails_helper'

RSpec.describe Channels::Rss::DownloadFeed do
  subject { described_class.call(feed_url: 'http://feed.local/myfeed') }

  include_context 'asyncReactor'

  before do
    stub_request(:any, 'http://feed.local/myfeed')
      .to_return(status: 200, body: body.read)
  end

  describe 'rss' do
    let(:body) { file_fixture('feeds/dilbert.xml') }

    it { expect(subject.entries).not_to be_empty }
  end

  describe 'atom' do
    let(:body) { file_fixture('feeds/yearofcommit.atom') }

    it { expect(subject.entries).not_to be_empty }
  end

  describe 'unknown' do
    let(:body) { file_fixture('tasty.html') }

    it { expect { subject }.to raise_error(ServiceFailure) }
  end
end