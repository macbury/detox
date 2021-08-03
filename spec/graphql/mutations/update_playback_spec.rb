require 'rails_helper'

RSpec.describe 'updatePlayback', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.update_playback, variables) }

  let(:mutations) { graphql_fixture('mutation/updatePlayback.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let!(:current_user) { nil }
    let(:story) { create(:article_story, :with_channel) }
    let(:variables) { { input: { id: story.to_param, position: 1, isPlaying: true, duration: 2 } } }

    it 'is unathorized' do
      expect(Playbacks::Control).not_to receive(:call)
      is_expected.to be_unauthorized_query
    end
  end

  describe 'when other user' do
    let!(:current_user) { create(:user) }
    let(:story) { create(:article_story, :with_channel) }
    let(:variables) { { input: { id: story.to_param, position: 1, isPlaying: true, duration: 2 } } }

    it 'is unathorized' do
      expect(Playbacks::Control).not_to receive(:call)
      is_expected.to be_unauthorized_query
    end
  end

  describe 'when user' do
    let(:channel) { create(:channel, :with_user) }
    let(:current_user) { channel.user }
    let(:story) { create(:audio_story, channel: channel) }
    let(:variables) { { input: { id: story.to_param, position: 1, isPlaying: true, duration: 2 } } }

    before { current_user }

    it { is_expected.to be_successful_query }

    it 'is expected to use Playbacks::Control service' do
      expect(Playbacks::Control).to receive(:call)

      expect(response).to eq(
        'data' => {
          'updatePlayback' => {
            'story' => {
              'id' => story.to_param
            },
            'errors' => nil
          }
        }
      )
    end
  end
end