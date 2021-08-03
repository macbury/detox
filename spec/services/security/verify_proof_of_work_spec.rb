require 'rails_helper'

RSpec.describe Security::VerifyProofOfWork do
  subject(:result) { described_class.call(jwt_token: jwt_token, input: input, counter: counter, hash: hash) }

  let(:jwt_token) { 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsibm9uY2UiXSwibm9uY2UiOiJkZjg5ODY0YmRkMDg4YWU2ODAzMGNkZmQ2ZWYyYmNiNTczZTVlM2IzNGFhYWFhNmVkM2JjYmQxZTBmZTY3MmVkIiwiZGlmZmljdWx0eSI6IjAwMCIsImV4cCI6MTU5NjQ2MTkyOX0.hmulitSOXwLBvZzt8_aocuCBHHCr3yQ6-i3qTJa1Sbw' }
  let(:input) { ['detox', 'admin'] }
  let(:counter) { 6 }
  let(:hash) { '00059523bf70f825be74b038fb9b81c56f55047d20a127762a1b859206d43977b14f1f0aeb8cfe99d7d54f4dba9e15d83892e8a803a8d6a47134409691db0d02' }

  before do
    allow(ENV).to receive(:fetch).with('SECRET_KEY_BASE').and_return('267dc1f8df6693d219f36562e689e4309c17e46c03535ab6f77d52c40b8948dca50d7744464fdfb143190b8090ff03c25230929d27474583a699f65d8af7e18e')
  end

  after { Timecop.return }

  describe 'when valid token' do
    before { Timecop.travel(DateTime.new(2020, 8, 2, 13, 0, 0)) }

    it { is_expected.to eq(true) }
  end

  describe 'when expired token' do
    before { Timecop.travel(DateTime.new(2030, 8, 2, 13, 0, 0)) }

    it { expect { result }.to raise_error(ServiceFailure, 'Invalid nonce') }
  end
end