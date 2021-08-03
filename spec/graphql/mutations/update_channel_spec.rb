require 'rails_helper'

RSpec.describe 'updateChannel', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.update_channel, variables) }

  let(:mutations) { graphql_fixture('mutation/updateChannel.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let(:current_user) { nil }
    let(:channel) { create(:channel, :with_user) }
    let(:variables) { { input: { id: channel.id } } }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when other user' do
    let(:current_user) { create(:user) }
    let(:channel) { create(:channel, :with_user) }
    let(:variables) { { input: { id: channel.id } } }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user) }
    let(:channel) { create(:channel, user: current_user) }

    describe 'passed valid variables' do
      let(:variables) do
        {
          input: {
            id: channel.id,
            name: 'new name',
            source: 'new source',
            site_url: 'new site_url',
            user_agent: 'new user agent',
            download_page: true,
            reject_rules: 'body > .reject',
            extraction_rules: 'body > .extract'
          }
        }
      end

      it { expect { response }.to change { channel.reload.extraction_rules }.to('body > .extract') }
      it { expect { response }.to change { channel.reload.reject_rules }.to('body > .reject') }
      it { expect { response }.to change { channel.reload.download_page }.to(true) }
      it { expect { response }.to change { channel.reload.name }.to('new name') }
      it { expect { response }.to change { channel.reload.source }.to('new source') }
      it { expect { response }.to change { channel.reload.site_url }.to('new site_url') }
      it { expect { response }.to change { channel.reload.user_agent }.to('new user agent') }
    end

    describe 'passed invalid variables' do
      let(:variables) do
        {
          input: {
            id: channel.id,
            name: ''
          }
        }
      end

      it { is_expected.to eq({ "data" => { "updateChannel" => { "channel" => nil, "errors" => ["Name can't be blank"] } } }) }
    end
  end
end