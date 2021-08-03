require 'rails_helper'

RSpec.describe Urls::ExpandDynamicImages do
  subject { described_class.call(content.read).to_html }

  describe 'when veto' do
    let(:content) { file_fixture('extract/veto.html') }

    it 'gets dynamic image instead data:svg placeholder' do
      is_expected.to match_snapshot('extract/veto/image.html')
    end
  end
end