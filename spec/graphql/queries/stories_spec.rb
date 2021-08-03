require 'rails_helper'

RSpec.describe 'stories', type: :graphql do
  subject(:response) { use_schema(DetoxSchema, context: context).execute(queries.stories, variables) }

  let(:queries) { graphql_fixture('query/stories.graphql') }
  let(:context) { { current_user: current_user } }
  let(:variables) { {} }

  describe 'when guest' do
    let(:current_user) { nil }

    it { is_expected.to be_unauthorized_query }
  end

  describe 'when user' do
    subject(:response_titles) { response.dig('data', 'stories', 'nodes').map { |node| node['title'] }.sort }

    let(:total_count) { response.dig('data', 'stories', 'totalCount') }
    let(:current_user) { create(:user) }
    let(:owner) { current_user }
    let!(:developer_news) { create(:developer_news, user: owner) }

    before do
      create(:reasons_com, user: current_user)
      create(:codest)
    end

    describe 'did not specify any filters' do
      let(:all_articles) do
        [
          "Alternative Career Paths for Software Developers",
          "Brickbat: Ooooh, That Smell",
          "Did Trump's Coronavirus Stimulus Save 51 Million Jobs? The Claim Relies on Shaky Math and Questionable Economics.",
          "Has the U.S. Government Finally Spent Too Much?",
          "How to Calculate the Average of a List — Statistics and Python's Mean Function Explained in Detail",
          "How to Create a Dynamic Rick and Morty Wiki Web App with Next.js ",
          "Massachusetts Regulators Knowingly Drive Vapers to the Black Market",
          "Seattle's 'Autonomous Zone' Is Dead, But Its Amazon Tax Has Come Roaring Back to Life",
          "The Paycheck Protection Program Is a Mess. Here's Who Is Benefitting From the Dysfunction.",
          "The Reaction to the Harper's Letter on Cancel Culture Proves Why It Was Necessary",
          "What is a Correlation Coefficient? The r Value in Statistics Explained "
        ]
      end

      it { expect(response_titles).to eq(all_articles) }
      it { expect(total_count).to eq(11) }
    end

    describe 'added unread filter' do
      let(:variables) { { unread: true } }
      let(:unread_articles) do
        [
          "Alternative Career Paths for Software Developers",
          "Did Trump's Coronavirus Stimulus Save 51 Million Jobs? The Claim Relies on Shaky Math and Questionable Economics.",
          "Has the U.S. Government Finally Spent Too Much?",
          "How to Calculate the Average of a List — Statistics and Python's Mean Function Explained in Detail",
          "Seattle's 'Autonomous Zone' Is Dead, But Its Amazon Tax Has Come Roaring Back to Life",
          "The Reaction to the Harper's Letter on Cancel Culture Proves Why It Was Necessary"
        ]
      end

      it { expect(response_titles).to eq(unread_articles) }
      it { expect(total_count).to eq(6) }

      describe 'when articles are owned by other user' do
        let(:owner) { create(:user) }

        it { expect(response_titles).not_to eq(unread_articles) }
        it { expect(total_count).not_to eq(6) }
      end
    end

    describe 'added channel id filter' do
      let(:variables) { { channel_id: developer_news.id } }
      let(:unread_articles) do
        [
          "How to Calculate the Average of a List — Statistics and Python's Mean Function Explained in Detail",
          'Alternative Career Paths for Software Developers',
          'How to Create a Dynamic Rick and Morty Wiki Web App with Next.js ',
          'What is a Correlation Coefficient? The r Value in Statistics Explained '
        ]
      end

      it { expect(response_titles).to match_array(unread_articles) }
      it { expect(total_count).to eq(4) }
    end
  end
end