require 'rails_helper'

RSpec.describe Channels::TypeFromUrl do
  subject(:type) { described_class.call(url) }

  describe 'when reason.com' do
    let(:url) { 'https://reason.com/' }

    it { is_expected.to eq(:rss) }
  end

  describe 'when https://www.youtube.com/user/LinusTechTips' do
    let(:url) { 'https://www.youtube.com/user/LinusTechTips' }

    it { is_expected.to eq(:youtube) }
  end

  describe 'when https://www.youtube.com/channel/UC70RHgm8FoCkN2163piIfVg' do
    let(:url) { 'https://www.youtube.com/channel/UC70RHgm8FoCkN2163piIfVg' }

    it { is_expected.to eq(:youtube) }
  end

  describe 'when https://www.youtube.com/c/UC70RHgm8FoCkN2163piIfVg' do
    let(:url) { 'https://www.youtube.com/c/UC70RHgm8FoCkN2163piIfVg' }

    it { is_expected.to eq(:youtube) }
  end
end