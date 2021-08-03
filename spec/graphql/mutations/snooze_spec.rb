require 'rails_helper'

RSpec.describe 'snooze', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.snooze, variables) }

  let(:mutations) { graphql_fixture('mutation/snooze.graphql') }
  let(:context) { { current_user: current_user } }
  let(:story) { channel.stories.first }
  let(:channel) { create(:channel, :with_one_read_story, user: owner) }
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

    let(:variables) { { input: { id: story.to_param } } }

    it { is_expected.to be_successful_query }
    it { expect { response }.to change { story.reload.is_read }.from(true).to(false) }

    it 'set view at in future' do
      expect(story.reload.view_at).to be_past
      response
      expect(story.reload.view_at).to be_future
    end
  end
end