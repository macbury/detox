require 'rails_helper'

RSpec.describe Extract::ColorFromImage do
  subject { described_class.call(file_path) }

  describe 'when valid image' do
    let(:file_path) { 'spec/fixtures/files/maxresdefault.jpg' }

    # let(:colors_meta) do
    #   {
    #     accent: '#c49d59',
    #     background: '#30525e',
    #     foreground: '#e3e2e3'
    #   }
    # end

    it { is_expected.not_to be_empty }
  end
end
