require 'rails_helper'

RSpec.describe Channels::Rss::Fetch do
  include_context 'asyncReactor'

  subject(:feed) { described_class.call(channel) }

  describe 'valid attributes' do
    subject(:result) { feed; channel.reload }

    let(:channel) { create(:channel, :with_user, kind: :rss, source: 'http://www.rubyflow.com/rss', status: :archived) }

    before do
      stub_request(:any, "http://www.rubyflow.com/rss")
        .to_return(status: 200, body: file_fixture('rubyflow.rss'))
    end

    it { expect(result).to be_rss }
    it { expect(result.name).to eq('Example channel') }
    it { expect(result.description).to eq('The Ruby and Rails community linklog') }
    it { expect(result.site_url).to eq(channel.site_url) }
  end

  describe 'normal webpage' do
    let(:channel) { create(:channel, :with_user, kind: :rss, source: 'https://reason.com', status: :archived) }

    before do
      stub_request(:any, "https://reason.com")
        .to_return(status: 200, body: 'me gusta')
    end

    it { expect { feed }.to raise_exception(ServiceFailure, 'No valid parser for XML.') }
  end
end