require 'rails_helper'

RSpec.describe 'markStories', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.mark_stories, variables) }

  let(:mutations) { graphql_fixture('mutation/markStories.graphql') }
  let(:context) { { current_user: current_user } }
  let(:variables) { {} }

  describe 'when guest' do
    let(:current_user) { nil }
    let(:variables) { { input: { ids: ['2341'] } } }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user) }
    let(:story) { channel.stories.first }
    let(:channel) { create(:channel, :with_one_unread_story, user: owner) }

    let(:variables) do
      {
        input: {
          ids: [story.to_param],
          is_read: true
        }
      }
    end

    describe 'and owns story' do
      let(:owner) { current_user }

      it { is_expected.to be_successful_query }
      it { expect { response }.to change { story.reload.is_read }.from(false).to(true) }
    end

    describe 'and access story of other user' do
      let(:owner) { create(:user) }

      it 'returns empty array of stories' do
        is_expected.to eq(
          'data' => {
            'markStories' => {
              'stories' => [],
              'errors' => []
            }
          }
        )
      end

      it 'story is still unread' do
        response
        expect(story.reload.is_read).to eq(false)
      end
    end
  end
end