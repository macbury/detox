require 'rails_helper'

RSpec.describe Extract::PageWithRules do
  let(:page_content) { 'page content html' }

  it 'downloads and trigger sub service' do
    stub_request(:any, 'https://veto.media/oplata-produktowa-nawet-1-zl-za-plastikowy-kubek/')
      .to_return(status: 200, body: page_content, headers: { 'content-type': 'text/html' })

    expect(Extract::ContentWithRules).to receive(:call).with(
      content: page_content,
      scrape: ['.entry-featured-media img', '.entry-content'],
      reject: ['.adace-slot-wrapper']
    )

    described_class.async_call(
      url: 'https://veto.media/oplata-produktowa-nawet-1-zl-za-plastikowy-kubek/',
      scrape: ['.entry-featured-media img', '.entry-content'],
      reject: ['.adace-slot-wrapper']
    )
  end
end
