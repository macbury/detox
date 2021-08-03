require 'rails_helper'

RSpec.describe 'logout', type: :graphql do
  subject { schema.execute(queries.logout) }

  let(:sign_out) { instance_double('SignoutMethod', call: nil) }
  let(:current_user) { create(:user) }
  let(:session) { create(:session, user: current_user) }
  let(:context) { { current_user: current_user, sign_out: sign_out, current_session: session } }
  let(:schema)  { use_schema(DetoxSchema, context: context) }
  let(:queries) { graphql_fixture('mutation/logout.graphql') }

  it { is_expected.to be_successful_query }

  it 'removes session' do
    session
    expect { subject }.to change(Session, :count).by(-1)
  end
end