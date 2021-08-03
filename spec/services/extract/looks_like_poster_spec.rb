require 'rails_helper'

RSpec.describe Extract::LooksLikePoster do
  include_context 'asyncReactor'

  subject(:hash) { described_class.call(image_url) }

  describe 'when image is url' do
    let(:image_url) { 'https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg' }

    before do
      stub_request(:any, "https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg").
        to_return(
          status: 200,
          body: file_fixture('domsy101.jpg').read,
          headers: {
            'content-type': 'image/jpeg'
          }
        )
    end

    it { is_expected.to be_truthy }
  end

  describe 'when image is PosterMetadata' do
    let(:image_url) do
      PosterMetaData.new(
        url: 'https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg',
        width: 320,
        height: 240,
        resolution: 320 * 240
      )
    end

    it { is_expected.to be_truthy }
  end

  describe 'when image is small PosterMetadata' do
    let(:image_url) do
      PosterMetaData.new(
        url: 'https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg',
        width: 32,
        height: 24,
        resolution: 32 * 24
      )
    end

    it { is_expected.to be_falsey }
  end

  describe 'when image is nil' do
    let(:image_url) { nil }

    it { is_expected.to be_falsey }
  end
end