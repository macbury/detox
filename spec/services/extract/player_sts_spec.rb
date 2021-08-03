require 'rails_helper'

RSpec.describe Extract::Youtube::PlayerSts do
  include_context 'asyncReactor'

  subject { described_class.call(youtube_id) }

  let(:youtube_id) { 'j7hUHqjwyZc' }

  before do
    stub_request(:any, "https://www.youtube.com/embed/j7hUHqjwyZc").
      to_return(status: 200, body: file_fixture('youtube/sts/embed.html'), headers: { 'content-type': 'text/html' })

    stub_request(:any, "https://youtube.com/s/player/fa244a41/player_ias.vflset/pl_PL/base.js").
      to_return(status: 200, body: file_fixture('youtube/sts/base.js'), headers: {})
  end

  it { is_expected.to eq('18739') }
end
