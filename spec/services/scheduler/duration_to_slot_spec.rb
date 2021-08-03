require 'rails_helper'

RSpec.describe Scheduler::DurationToSlot do
  let(:duration) { 15.hours + 36.minutes }
  subject(:slot) { described_class.call(duration) }

  it { is_expected.to eq(15.hours + 40.minutes) }
end