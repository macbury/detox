require 'rails_helper'

RSpec.describe Scheduler::SlotsForChannel do
  let(:channel) { create(:channel, :with_one_unread_story, :with_user) }
  subject(:slot) { described_class.call(channel) }

  before { Timecop.freeze(Time.zone.parse('2020-07-03 11:00:29')) }
  after { Timecop.return }

  #it { is_expected.to eq([11.hours]) }
end