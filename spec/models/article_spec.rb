require 'rails_helper'

RSpec.describe Article, type: :model do
  describe '#associations' do
    it { is_expected.to have_one(:story) }
  end

  describe '#validations' do
    it { is_expected.not_to validate_presence_of(:body) }
  end
end
