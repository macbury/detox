require 'rails_helper'

RSpec.describe PubsubSubscription, type: :model do
  describe '#associations' do
    it { is_expected.to belong_to(:channel) }
  end
end
