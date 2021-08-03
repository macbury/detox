require 'rails_helper'

RSpec.describe 'groups', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(queries.groups) }

  let(:queries) { graphql_fixture('query/groups.graphql') }
  let(:context) { { current_user: current_user } }

  describe 'when guest' do
    let!(:other_user_group) { create(:group, user: create(:user)) }
    let(:current_user) { nil }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    let(:current_user) { create(:user) }
    let(:group) { create(:group, user: current_user) }
    let!(:other_user_group) { create(:group, user: create(:user)) }

    before { group }

    it { is_expected.to be_successful_query }

    it 'is expedted to return groups owned by user' do
      is_expected.to eq(
        'data' => {
          'groups' => [
            { "name" => group.name, "icon" => group.icon, "id" => group.id }
          ]
        }
      )
    end
  end
end