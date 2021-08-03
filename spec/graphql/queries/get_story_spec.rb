require 'rails_helper'

RSpec.describe 'getStory', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(queries.get_story, variables) }

  let(:queries) { graphql_fixture('query/getStory.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }

    describe 'and id for not existing story' do
      let(:variables) { { id: '' } }

      it { is_expected.to eq('data' => { 'getStory' => nil }) }
    end

    describe 'id for existing story' do
      let(:other_story) { create(:channel, :with_user, :with_one_unread_story).stories.first }
      let(:variables) { { id: other_story.to_param } }

      it { is_expected.to be_unauthorized_query }
    end
  end

  describe 'when user' do
    let(:current_user) { create(:user) }
    let(:variables) { { id: story.to_param } }
    let(:story) { channel.stories.first }
    let(:channel) { create(:reasons_com, user: current_user) }

    describe 'owned story' do
      it { is_expected.to be_successful_query }
      it 'returns a title' do
        expect(response).to eq(
          'data' => {
            'getStory' => {
              'title' => story.title
            }
          }
        )
      end
    end

    describe 'other user story' do
      let(:other_story) { create(:channel, :with_one_unread_story, user: create(:user)).stories.first }
      let(:variables) { { id: other_story.to_param } }

      it { is_expected.to be_unauthorized_query }
    end
  end
end