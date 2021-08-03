require 'rails_helper'

RSpec.describe Extract::PageMetadata do
  subject { described_class.async_call(url: url) }
  include_context 'asyncReactor'

  before do
    stub_request(:any, url)
      .to_return(status: 200, body: content, headers: { 'content-type': 'text/html' })
  end

  describe 'page with twitter card' do
    let(:url) { 'https://bezprawnik.pl/dyrektor-youtube-otrzymala-nagrode-wolnosci-slowa-sponsorowana-przez-youtube/' }
    let(:content) { file_fixture('pages/twitter_card.html').read }

    it { is_expected.to be_kind_of(PageMetadata) }
    it { expect(subject.title).to eq('Dyrektor YouTube otrzymała nagrodę wolności słowa sponsorowaną przez YouTube') }
    it { expect(subject.description).to be_present }
    it { expect(subject.image).to eq('https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/bezprawnik/2021/04/pexels-pixabay-221181.jpg') }
  end

  describe 'page without any tags' do
    let(:url) { 'https://yolo.page' }
    let(:content) { '' }

    it { is_expected.not_to be_present }
  end
end