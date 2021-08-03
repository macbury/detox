require 'rails_helper'

RSpec.describe Download::Get do
  include_context 'asyncReactor'

  subject(:response) { described_class.call(url: url, html: html) }

  describe 'when user tries to download html page' do
    let(:html) { true }
    let(:url) { 'https://duckduckgo.com' }

    before do
      stub_request(:any, 'https://duckduckgo.com/').to_return(
        status: 200,
        body: '<html />',
        headers: {
          "content-type": "text/html"
        }
      )
    end

    it { is_expected.not_to be_empty }
  end

  describe 'when user tries to download pdf' do
    let(:url) { 'http://www.cl.cam.ac.uk/~mjcg/plans/Coinduction.pdf' }

    before do
      stub_request(:head, url).to_return(
        status: 200,
        body: '',
        headers: {
          "content-type": "application/pdf"
        }
      )

      stub_request(:get, url).to_return(
        status: 200,
        body: 'pdf content'
      )
    end

    describe 'when html flag is enabled' do
      let(:html) { true }

      it { expect { response }.to raise_error ServiceFailure, 'Url http://www.cl.cam.ac.uk/~mjcg/plans/Coinduction.pdf is not a webpage!' }
    end

    describe 'when html flag is disabled' do
      let(:html) { false }

      it { expect(response).to eq('pdf content') }
    end
  end
end