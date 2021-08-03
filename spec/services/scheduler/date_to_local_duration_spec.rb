require 'rails_helper'

RSpec.describe Scheduler::DateToLocalDuration do
  let(:time) { Time.zone.parse('2020-07-03 11:00:29') }
  subject(:slot) { described_class.call(time) }

  it { is_expected.to eq(11.hours + 29.seconds) }
end