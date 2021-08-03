require 'rails_helper'

RSpec.describe Security::VerifyUrl do
  it 'decodes url with valid hash' do
    result = described_class.call(
      hash: '2ddfec7cea34',
      encoded_url: 'aHR0cHM6Ly9tYWNidXJ5Lm5pbmphL3JvYm90cy50eHQ'
    )

    expect(result).to eq('https://macbury.ninja/robots.txt')
  end

  it 'raises ServiceFailure for invalid hash' do
    expect do
      described_class.call(
        hash: '2ddfec7s',
        encoded_url: 'aHR0cHM6Ly9tYWNidXJ5Lm5pbmphL3JvYm90cy50eHQ'
      )
    end.to raise_error('Invalid hash(2ddfec7s) for https://macbury.ninja/robots.txt')
  end
end