require 'rails_helper'

RSpec.describe 'refreshAll', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.refresh_all, variables) }

  let(:mutations) { graphql_fixture('mutation/refresh_all.graphql') }
  let(:context) { { current_user: current_user } }
  let(:variables) { {} }

  describe 'when guest' do
    let(:current_user) { nil }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user triggers refresh' do
    let(:current_user) { create(:user) }

    let!(:owned_channels) { create_list(:channel, 10, user: current_user) }
    let!(:other_channels) { create_list(:channel, 10, :with_user) }

    it { is_expected.to be_successful_query }

    it 'add job for refreshing all' do
      expect(owned_channels).not_to be_empty
      expect(other_channels).not_to be_empty

      owned_channels.each do |channel|
        expect(RefreshChannelJob).to receive(:perform_later).with(channel.id)
      end

      other_channels.each do |channel|
        expect(RefreshChannelJob).not_to receive(:perform_later).with(channel.id)
      end

      expect(response).to be_successful_query
      expect(response).to eq(
        'data' => {
          'refreshAll' => {
            'success' => true
          }
        }
      )
    end
  end
end