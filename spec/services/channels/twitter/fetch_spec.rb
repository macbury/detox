require 'rails_helper'

RSpec.describe Channels::Twitter::Fetch do
  include_context 'asyncReactor'

  subject { described_class.call(username) }
  
  before do
    allow(Channels::Twitter::RetriveApiKeys).to receive(:call).and_return(['guest_key', 'api_key'])

    stub_request(:any, "https://api.twitter.com/2/search/adaptive.json?q=from:yolo-user%20include:nativeretweets%20exclude:replies&tweet_mode=extended&tweet_search_mode=live")
      .with(
        headers: {
          'Accept-Encoding'=>'gzip',
          'Authorization'=>'Bearer api_key',
          'X-Guest-Token'=>'guest_key'
        }
      ).to_return(
        status: 200,
        body: feed,
        headers: { 'Content-Type': 'application/json' }
      )
  end

  let(:username) { 'yolo-user' }
  let(:feed) { file_fixture('twitter/feed.json').read }

  it { is_expected.to eq(JSON.parse(feed)) }
end