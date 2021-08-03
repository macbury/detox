require 'rails_helper'

RSpec.describe Sanitizer::Story do
  subject(:result) do
    described_class.call(input_content, base_url: 'https://local.url.test/')
  end

  include_context Async::RSpec::Reactor

  before do
    stub_request(:any, /\.png/i)
      .to_return(status: 200, body: file_fixture('test.png'), headers: { 'content-type': 'image' })
    stub_request(:any, /(instagram)/i)
      .to_return(status: 200, body: file_fixture('dommy.jpg'), headers: { 'content-type': 'image' })
  end

  let(:input_content) { file_fixture('content.html').read }

  it 'content is sanitized' do 
    is_expected.to match_snapshot('sanitizer/story.html')
  end
end