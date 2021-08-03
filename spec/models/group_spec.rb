require 'rails_helper'

RSpec.describe Group, type: :model do
  subject { build(:group) }

  describe '#associations' do
    it { is_expected.to have_and_belong_to_many(:channels) }
    it { is_expected.to belong_to(:user) }
  end

  describe '#validations' do
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id).case_insensitive }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:icon) }
  end
end
