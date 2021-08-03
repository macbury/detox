require 'rails_helper'

RSpec.describe Story, type: :model do
  describe '#associations' do
    it { is_expected.to belong_to(:channel) }
    it { is_expected.to belong_to(:attachment) }

    it { is_expected.to have_one(:playback) }
  end

  describe '#validations' do
    it { is_expected.to validate_uniqueness_of(:guid).scoped_to(:channel_id) }
    it { is_expected.to validate_presence_of(:guid) }
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:permalink) }
    it { is_expected.not_to validate_presence_of(:summary) }
  end
end
