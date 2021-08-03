require 'rails_helper'

RSpec.describe Extract::MediaTypeFromUrl do
  subject(:media_metadata) { described_class.call(url, mime_type: mime_type) }
  include_context 'asyncReactor'

  describe 'when passing in valid url' do
    let(:url) { 'https://yolo.page/' }
    let(:mime_type) { nil }

    before do
      stub_request(:any, url)
        .to_return(status: 404, body: '', headers: { 'content-type': 'text/html' })
    end

    it { is_expected.to be_nil }
  end

  describe 'when passing valid url' do
    let(:url) { 'https://yolo.page/' }
    let(:mime_type) { nil }

    before do
      stub_request(:any, url)
        .to_return(status: 200, body: '', headers: { 'content-type': 'text/html' })
    end

    it { is_expected.to be_present }
    it { expect(media_metadata.url).to eq(url) }
    it { expect(media_metadata.mime_type).to eq('text/html') }
  end

  describe 'when passing valid url and mime type' do
    let(:url) { 'https://yolo.page/' }
    let(:mime_type) { 'media/audio' }

    it { is_expected.to be_present }
    it { expect(media_metadata.url).to eq(url) }
    it { expect(media_metadata.mime_type).to eq(mime_type) }
  end
end