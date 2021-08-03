require 'rails_helper'

RSpec.describe Channel, type: :model do
  describe '#new' do
    subject { described_class.new }

    it { expect(subject.user_agent).to eq(Channel::DEFAULT_HEADER) }
    it { is_expected.to be_pending }
    it { is_expected.to be_rss }
  end

  describe '#associations' do
    it { is_expected.to have_and_belong_to_many(:groups) }
    it { is_expected.to have_many(:stories) }
    it { is_expected.to have_one(:pubsub_subscription) }
    it { is_expected.to belong_to(:user) }
  end

  describe '#validations' do
    it { is_expected.to validate_uniqueness_of(:source).scoped_to([:kind, :user_id]).case_insensitive }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:source) }
    it { is_expected.to validate_presence_of(:kind) }
    it { is_expected.to validate_presence_of(:site_url) }

    describe 'for extraction_rules' do
      it 'passes validation for valid rule' do
        channel = build(:channel, :with_user, extraction_rules: 'html > body')
        expect(channel).to be_valid
        expect(channel.errors.full_messages).to be_empty

        channel = build(:channel, :with_user, extraction_rules: '')
        expect(channel).to be_valid
        expect(channel.errors.full_messages).to be_empty
      end

      it 'fails validation for ivalid rule' do
        channel = build(:channel, :with_user, extraction_rules: '$$$')
        expect(channel).not_to be_valid
        expect(channel.errors.full_messages).to eq(["Extraction rules unexpected '$' after ''"])
      end
    end

    describe 'for reject_rules' do
      it 'passes validation for valid rule' do
        channel = build(:channel, :with_user, reject_rules: 'html > body')
        expect(channel).to be_valid
        expect(channel.errors.full_messages).to be_empty

        channel = build(:channel, :with_user, reject_rules: '')
        expect(channel).to be_valid
        expect(channel.errors.full_messages).to be_empty
      end

      it 'fails validation for ivalid rule' do
        channel = build(:channel, :with_user, reject_rules: '$$$')
        expect(channel).not_to be_valid
        expect(channel.errors.full_messages).to eq(["Reject rules unexpected '$' after ''"])
      end
    end
  end
end
