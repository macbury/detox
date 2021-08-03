require 'rails_helper'

RSpec.describe Sanitizer::ModifyLinks do
  subject(:html) { CGI.unescapeHTML(described_class.call(content).to_html) }

  let(:content) { '<a href="test.html">Hello</a>' }

  it { is_expected.to eq('<a href="test.html" target="_blank">Hello</a>') }
end