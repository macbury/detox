require 'rails_helper'

RSpec.describe 'updateUser', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.update_user, variables) }

  let(:mutations) { graphql_fixture('mutation/updateUser.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }
    let(:other_user) { create(:user, username: 'yolo') }
    let(:variables) { { input: { id: other_user.id } } }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user, username: 'yolo') }
    let(:variables) { { input: { id: user.id, username: 'gandalf' } } }

    describe 'edit other user' do
      let(:user) { create(:user) }

      it { is_expected.to be_unauthorized_query }
    end

    describe 'update himself' do
      let(:user) { current_user }
      it { is_expected.to be_successful_query }
      it { expect { response }.to change { user.reload.username }.from('yolo').to('gandalf') }
    end
  end

  describe 'when admin' do
    let(:current_user) { create(:user, :as_admin) }
    let(:variables) { { input: { id: user.id, username: 'fromspec' } } }
    let(:user) { create(:user) }

    it 'updates other user without problem' do
      expect(response).to eq(
        'data' => {
          'updateUser' => {
            'user' => {
              'username' => 'fromspec',
              'status' => 'NORMAL'
            },
            'errors' => nil
          }
        }
      )
    end
  end
end