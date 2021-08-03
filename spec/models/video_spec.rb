require 'rails_helper'

RSpec.describe Video, type: :model do
  describe '#associations' do
    it { is_expected.to have_one(:story) }
  end

  describe '#validations' do
    it { is_expected.to validate_presence_of(:uri) }
    it { is_expected.not_to validate_presence_of(:body) }
    it { is_expected.to validate_presence_of(:width) }
    it { is_expected.to validate_presence_of(:height) }
    it { is_expected.to validate_numericality_of(:width) }
    it { is_expected.to validate_numericality_of(:height) }
  end
end
