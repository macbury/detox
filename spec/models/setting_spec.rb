require 'rails_helper'

RSpec.describe Setting, type: :model do
  describe '#validations' do
    it { is_expected.to validate_presence_of(:key) }
  end
end
