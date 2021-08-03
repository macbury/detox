require 'rails_helper'

RSpec.describe 'updatePassword', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.update_password, variables) }

  let(:mutations) { graphql_fixture('mutation/updatePassword.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }
    let(:variables) { { input: { password: '', password_confirmation: '', current_password: '' } } }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user) }

    describe 'pass valid variables' do
      let(:variables) { { input: { password: 'hello', password_confirmation: 'hello', current_password: 'admin1234' } } }

      it 'return success' do
        expect(response).to eq(
          'data' => {
            'updatePassword' => {
              'success' => true,
              'errors' => []
            }
          }
        )
      end
    end

    describe 'pass invalid variables' do
      let(:variables) { { input: { password: '', password_confirmation: '', current_password: '' } } }

      it 'return error response' do
        expect(response).to eq(
          'data' => {
            'updatePassword' => {
              'success' => false,
              'errors' => ["Current password can't be blank"]
            }
          }
        )
      end
    end
  end
end