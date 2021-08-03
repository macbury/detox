require 'rails_helper'

RSpec.describe Extract::ContentWithRules do
  let(:page_content) { file_fixture('extract/veto.html').read }

  subject do
    described_class.async_call(
      content: page_content,
      scrape: '.entry-featured-media img, .entry-content',
      reject: ['.adace-slot-wrapper']
    )
  end

  it 'extract content using rules' do
    is_expected.to match_snapshot('extract/veto.html')
  end
end
