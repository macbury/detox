require 'rails_helper'

RSpec.describe 'users', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(queries.get_users) }

  let(:queries) { graphql_fixture('query/users.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user) }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when admin' do
    let(:current_user) { create(:user, :as_admin) }

    it { is_expected.to be_successful_query }

    it 'list other users with him' do
      other_user = create(:user)

      expect(response).to eq(
        'data' => {
          'users' => {
            'nodes' => [
              {
                'username' => other_user.username
              },
              {
                'username' => current_user.username
              }
            ]
          }
        }
      )
    end
  end
end