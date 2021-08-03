require 'rails_helper'

RSpec.describe 'refresh', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.refresh, variables) }

  let(:mutations) { graphql_fixture('mutation/refresh.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'not existing channel' do
    let(:current_user) { nil }
    let(:variables) { { input: { id: 'not-found' } } }

    it { is_expected.to eq('data' => { 'refresh' => nil }) }
  end

  describe 'when guest' do
    let(:current_user) { nil }
    let(:channel) { create(:channel, :with_user) }
    let(:variables) { { input: { id: channel.id } } }

    it { is_expected.to be_unauthorized_query }
  end

  context 'when user' do
    let(:current_user) { create(:user) }
    let(:variables) { { input: { id: channel.id } } }

    describe 'not archived chanel' do
      let(:channel) { create(:channel, user: current_user) }

      it 'add job for refreshing' do
        expect(RefreshChannelJob).to receive(:perform_later).with(channel.id)

        is_expected.to be_successful_query

        expect(response).to eq({
          'data' => {
            'refresh' => {
              'channel' => {
                'id' => channel.id
              },
              'errors'=>nil
            }
          }
        })
      end
    end

    describe 'cannot refresh archived channel' do
      let(:channel) { create(:channel, user: current_user, status: :archived) }

      it 'returns null' do
        expect(RefreshChannelJob).not_to receive(:perform_later).with(channel.id)

        is_expected.to be_successful_query

        expect(response).to eq({
          'data' => {
            'refresh' => nil
          }
        })
      end
    end
  end
end