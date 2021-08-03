require 'rails_helper'

RSpec.describe 'discover', type: :graphql do
  include_context 'asyncReactor'

  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.discover, variables) }

  let(:mutations) { graphql_fixture('mutation/discover.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }
    let(:variables) { { input: { url: 'http://reason.com' } } }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user) }
    let(:variables) { { input: { url: 'http://reason.com' } } }

    it 'returns discovered channels' do
      expect(Channels::Discovery).to receive(:call).with(url: 'http://reason.com').and_return([
        DiscoveredChannel.new(
          kind: 'rss',
          title: 'Reason',
          source: 'https://reason.com/feed/',
          url: 'https://reason.com/',
          icon_url: 'https://d2eehagpk5cl65.cloudfront.net/wp-content/themes/reason-com/dist/images/favicon/apple-icon-180x180_fec8c668.png'
        )
      ])

      is_expected.to be_successful_query

      expect(response).to eq({
        'data' => {
          'discover' => {
            'channels' => [
              { 'kind' => 'RSS', 'source' => 'https://reason.com/feed/' }
            ],
            'errors' => nil
          }
        }
      })
    end
  end
end