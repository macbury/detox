require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#validations' do
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_presence_of(:password).on(:create) }
  end

  describe '#associations' do
    it { is_expected.to have_many(:sessions) }
    it { is_expected.to have_many(:channels) }
    it { is_expected.to have_many(:stories) }
    it { is_expected.to have_many(:articles) }
    it { is_expected.to have_many(:videos) }
  end

  it 'cleanups old tokens after save' do
    user = create(:user)

    Timecop.travel(1.month.ago) do
      2.times { user.sessions.create!(attributes_for(:session)) }
    end

    refresh_token = user.sessions.create!(attributes_for(:session))
    expect(user.reload.sessions.count).to eq(3)
    user.save!
    expect(user.reload.sessions).to eq([refresh_token])
  end
end
