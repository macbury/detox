require 'rails_helper'

RSpec.describe Playback, type: :model do
  describe '#associations' do
    it { is_expected.to belong_to(:story) }
  end
end
