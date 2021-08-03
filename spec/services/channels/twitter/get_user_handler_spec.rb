require 'rails_helper'

RSpec.describe Channels::Twitter::GetUserHandler do
  subject(:username) { described_class.call(url) }

  describe 'when https://twitter.com/futurepaul' do 
    let(:url) { 'https://twitter.com/futurepaul' }

    it { is_expected.to eq('futurepaul') }
  end

  describe 'when https://twitter.com/Lukewearechange' do
    let(:url) { 'https://twitter.com/Lukewearechange' }

    it { is_expected.to eq('Lukewearechange'.downcase) }
  end
end