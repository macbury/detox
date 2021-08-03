require 'rails_helper'

RSpec.describe 'signIn', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(mutations.sign_in, variables) }
  let(:user) { create(:user) }
  let(:mutations) { graphql_fixture('mutation/signIn.graphql') }

  let(:context) do
    {
      sign_in: instance_double('SignIn'),
      sign_out: instance_double('SignOut', call: nil),
      ip: '127.0.0.1'
    }
  end

  context 'when valid arguments' do
    let(:variables) do
      {
        input: {
          username: user.username,
          password: 'admin1234',
          name: 'rspec',
          public_key: file_fixture('certs/ec256-public.pem').read
        }
      }
    end

    it 'sign in user' do
      expect(context[:sign_in]).to receive(:call).with(:user, user)
      expect { response }.to change { user.reload.sessions.count }.by(1)
      expect(response).to be_successful_query

      expect(response.dig('data', 'signIn', 'session', 'id')).to be_present
    end
  end

  context 'when invalid pem key' do
    let(:variables) do
      {
        input: {
          username: user.username,
          password: '',
          name: 'rspec',
          public_key: file_fixture('certs/ec256-public.pem').read
        }
      }
    end

    it 'returns error' do
      expect { response }.to change { user.reload.sessions.count }.by(0)
      expect(response).to be_successful_query

      expect(response.dig('data', 'signIn', 'session', 'id')).to be_nil
      expect(response.dig('data', 'signIn', 'errors')).not_to be_empty
    end
  end
end