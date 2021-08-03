require 'rails_helper'

RSpec.describe 'unsubscribe', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.unsubscribe, variables) }

  let(:mutations) { graphql_fixture('mutation/unsubscribe.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }
    let(:variables) { { input: { id: channel.id } } }
    let(:channel) { create(:channel, :with_user, status: :pending) }

    it { is_expected.to be_unauthorized_query }
  end

  context 'when user' do
    let(:current_user) { create(:user) }

    describe 'not existing channel' do
      let(:variables) { { input: { id: 'xxxx' } } }

      it 'returns null channel' do
        is_expected.to be_successful_query

        expect(response).to eq({
          'data' => {
            'unsubscribe' => nil
          }
        })
      end
    end

    describe 'existing channel' do
      let(:variables) { { input: { id: channel.id } } }
      let(:channel) { create(:channel, status: :pending, user: current_user) }

      it 'returns updated channel' do
        is_expected.to be_successful_query

        expect(response).to eq({
          'data' => {
            'unsubscribe' => {
              'channel' => {
                'id' => channel.id,
                'status' => 'ARCHIVED'
              },
              'errors' => nil
            }
          }
        })
      end
    end
  end
end