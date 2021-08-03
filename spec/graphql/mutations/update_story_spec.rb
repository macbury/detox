require 'rails_helper'

RSpec.describe 'updateStory', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.update_story, variables) }

  let(:mutations) { graphql_fixture('mutation/updateStory.graphql') }
  let(:context) { { current_user: current_user } }
  let(:story) { channel.stories.first }
  let(:channel) { create(:channel, :with_one_unread_story, user: owner) }
  let(:variables) { {} }

  describe 'when guest' do
    let(:current_user) { nil }
    let(:owner) { create(:user) }
    let(:variables) { { input: { id: story.to_param } } }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user) }
    let(:owner) { current_user }

    let(:variables) do
      {
        input: {
          id: story.to_param,
          is_read: true
        }
      }
    end

    it { is_expected.to be_successful_query }
    it { expect { response }.to change { story.reload.is_read }.from(false).to(true) }
  end
end