require 'rails_helper'

RSpec.describe Channels::Rss::BlacklistedEntry do
  subject { described_class.call(channel: channel, entry: entry) }

  let(:channel) { create(:channel, :with_user, block_rules: rules) }
  let(:entry) { instance_double(Feedjira::Parser::RSSEntry, title: title) }

  describe 'channel without block rules' do
    let(:title) { 'fear porn article click bait' }
    let(:rules) { [] }

    it { is_expected.to be_falsey }
  end

  describe 'channel with block rules' do
    let(:rules) { ['porn'] }

    context 'with entry to block' do
      let(:title) { 'fear porn article click bait' }

      it { is_expected.to be_truthy }
    end

    context 'with entry to leave' do
      let(:title) { 'very positive article about how nice is to look at hamsters' }

      it { is_expected.to be_falsey }
    end
  end
end