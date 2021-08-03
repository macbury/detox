require 'rails_helper'

RSpec.describe 'subscribe', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.subscribe, variables) }

  let(:mutations) { graphql_fixture('mutation/subscribe.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }
    let(:variables) { { input: { source: 'http://reason.com/feed', kind: 'RSS' } } }

    it { is_expected.to be_unauthorized_query }
  end

  context 'when user' do
    let(:current_user) { create(:user) }
    let(:variables) { { input: { source: 'http://reason.com/feed', kind: 'RSS' } } }

    describe 'on service failure' do
      before do
        allow(Channels::Create).to receive(:call).and_raise(ServiceFailure.new('Service failure'))
      end

      it 'returns errors' do
        is_expected.to be_successful_query

        expect(response).to eq({
          'data' => {
            'subscribe' => {
              'channel' => nil,
              'errors' => ['Service failure']
            }
          }
        })
      end
    end

    describe 'invalid params' do
      let(:channel) { create(:channel, user: current_user) }

      before do
        allow(channel.errors).to receive(:full_messages).and_return(['Record is invalid'])
        allow(Channels::Create).to receive(:call).with(source: 'http://reason.com/feed', kind: 'rss', user: current_user).and_raise(ActiveRecord::RecordInvalid.new(channel))
      end

      it 'returns errors' do
        is_expected.to be_successful_query

        expect(response).to eq({
          'data' => {
            'subscribe' => {
              'channel' => nil,
              'errors' => ['Record is invalid']
            }
          }
        })
      end
    end

    describe 'valid params' do
      let(:channel) { create(:channel, user: current_user) }

      before do
        allow(Channels::Create).to receive(:call).with(source: 'http://reason.com/feed', kind: 'rss', user: current_user).and_return(channel)
      end

      it 'returns new channels' do
        is_expected.to be_successful_query

        expect(response).to eq({
          'data' => {
            'subscribe' => {
              'channel' => {
                'name' => channel.name,
                'id' => channel.id
              },
              'errors'=>nil
            }
          }
        })
      end
    end
  end
end