require 'rails_helper'

RSpec.describe 'createUser', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.create_user, variables) }

  let(:mutations) { graphql_fixture('mutation/createUser.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let!(:current_user) { nil }
    let(:variables) { { input: { username: '', password: '' } } }

    it { is_expected.to be_unauthorized_query }
    it { expect { response }.to change(User, :count).by(0) }
  end

  describe 'when user' do
    let!(:current_user) { create(:user) }
    let(:variables) { { input: { username: '', password: '' } } }

    it { is_expected.to be_unauthorized_query }
    it { expect { response }.to change(User, :count).by(0) }
  end

  describe 'when admin' do
    let(:current_user) { create(:user, :as_admin) }
    let(:variables) { { input: { username: 'fromspec', password: 'admin1234' } } }

    before { current_user }

    it { is_expected.to be_successful_query }

    it 'creates new user' do
      expect { response }.to change(User, :count).by(1)
      expect(response).to eq(
        'data' => {
          'createUser' => {
            'user' => {
              'username' => 'fromspec'
            },
            'errors' => nil
          }
        }
      )
    end
  end
end