require 'rails_helper'

RSpec.describe 'currentUser', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(queries.current_user) }

  let(:queries) { graphql_fixture('query/currentUser.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user) }

    it { is_expected.to be_successful_query }

    it 'show his information' do
      expect(response).to eq(
        'data' => {
          'currentUser' => {
            'username' => current_user.username,
            'status' => 'NORMAL',
            'id' => current_user.id
          }
        }
      )
    end
  end
end