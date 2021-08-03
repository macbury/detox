require 'rails_helper'

RSpec.describe Extract::ImageBlurhash do
  include_context 'asyncReactor'

  subject(:hash) { described_class.call(image_url) }

  describe 'when image is valid' do
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

    it { is_expected.to eq('LRSP2?s8tRXU?GRPR*ogPXaxadn#') }
  end

  describe 'when image is not existing' do
    let(:image_url) { 'https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg' }

    before do
      stub_request(:any, "https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg").to_return(status: 404)
    end

    it { expect { hash }.to raise_error(ServiceFailure, "Could not download: #{image_url}, HTTP status is: 404") }
  end

  describe 'when content is not image' do
    let(:image_url) { 'https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg' }

    before do
      stub_request(:any, "https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg").
        to_return(
          status: 200,
          body: 'wop wop wop',
          headers: {
            'content-type': 'text/plain'
          }
        )
    end

    it { expect { hash }.to raise_error(ServiceFailure, "https://news.bitcoin.com/wp-content/uploads/2020/07/domsy101.jpg is not image") }
  end
end