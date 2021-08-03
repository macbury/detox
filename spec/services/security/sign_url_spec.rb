require 'rails_helper'

RSpec.describe Security::SignUrl do
  subject(:result) { described_class.call(url) }

  describe 'when https://macbury.ninja/robots.txt' do
    let(:url) { 'https://macbury.ninja/robots.txt' }

    it { expect(result.hash).to eq('2ddfec7cea34') }
    it { expect(result.encoded_url).to eq('aHR0cHM6Ly9tYWNidXJ5Lm5pbmphL3JvYm90cy50eHQ=') }
  end
end