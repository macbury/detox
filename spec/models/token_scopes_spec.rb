require 'rails_helper'

RSpec.describe TokenScopes, type: :model do
  subject { JWT.decode token, nil, false }

  let(:refresh_token) { create(:refresh_token) }

  before { Timecop.travel(DateTime.new(2020, 2, 23, 13, 0, 0)) }

  after { Timecop.return }

  describe '#nonce' do
    before { allow(SecureRandom).to receive(:hex).and_return('static-random') }

    let(:token) { described_class.nonce_token('000') }

    it do
      expect(subject).to eq([
        {
          'aud' => ['nonce'],
          'difficulty' => '000',
          'exp' => 1_582_462_860,
          'nonce' => 'static-random'
        },
        { 'alg' => 'HS256' }
      ])
    end
  end
end
