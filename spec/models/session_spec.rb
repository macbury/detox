require 'rails_helper'

RSpec.describe Session, type: :model do
  subject { build(:session) }

  describe '#associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe '#validations' do
    it { is_expected.to validate_presence_of :name }
    it { is_expected.to validate_presence_of :public_key }
  end

  describe '#public_key' do
    it 'valid pem key string returns OpenSSL::PKey::EC' do
      expect(subject.public_key).to be_a(OpenSSL::PKey::EC)
    end

    it 'nil key returns nil' do
      subject.public_key = nil
      expect(subject.public_key).to be_nil
    end

    it 'empty key returns nil' do
      subject.public_key = ''
      expect(subject.public_key).to be_nil
    end
  end
end
