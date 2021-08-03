require 'rails_helper'

RSpec.describe 'createGroup', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.create_group, variables) }

  let(:mutations) { graphql_fixture('mutation/createGroup.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let!(:current_user) { nil }
    let(:variables) { { input: { name: '', icon: '', channel_ids: [] } } }

    it { is_expected.to be_unauthorized_query }
    it { expect { response }.to change(Group, :count).by(0) }
  end

  describe 'when user' do
    let(:channel) { create(:channel, :with_user) }
    let(:current_user) { channel.user }
    let(:variables) { { input: { name: 'new group', icon: 'bank', channel_ids: [channel.id] } } }

    before { current_user }

    it { is_expected.to be_successful_query }

    it 'is expected to create new group' do
      expect { response }.to change(Group, :count).by(1)
      expect(response).to eq(
        'data' => {
          'createGroup' => {
            'group' => {
              'name' => 'new group',
              'channels' => [
                { 'name' => channel.name }
              ]
            },
            'errors' => nil
          }
        }
      )
    end
  end
end