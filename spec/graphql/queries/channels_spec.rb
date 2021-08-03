require 'rails_helper'

RSpec.describe 'channels', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(queries.channels) }

  let(:queries) { graphql_fixture('query/channels.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let!(:other_user_channel) { create(:channel, user: create(:user), status: 'pending') }
    let(:current_user) { nil }

    it 'returns empty array' do
      is_expected.to eq(
        'data' => {
          'channels' => {
            'nodes' => []
          }
        }
      )
    end
  end

  describe 'when user' do
    let(:current_user) { create(:user) }
    let(:channel) { create(:channel, user: current_user, status: 'pending') }
    let!(:other_user_channel) { create(:channel, user: create(:user), status: 'pending') }

    before { channel }

    it { is_expected.to be_successful_query }

    it 'return channels owned by user' do
      is_expected.to eq(
        'data' => {
          'channels' => {
            'nodes' => [
              { "name" => "Example channel" }
            ]
          }
        }
      )
    end
  end
end