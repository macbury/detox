require 'rails_helper'

RSpec.describe Urls::ExpandAbsolute do
  subject(:html) { CGI.unescapeHTML(described_class.call(content, 'https://test.local').to_html) }

  describe 'when ./some-page.html' do
    let(:url) { './some-page.html' }
    let(:content) { "<img src='#{url}' />" }

    it { is_expected.to eq('<img src="https://test.local/some-page.html">') }
  end

  describe 'when other-page.php?wat=2&test=3' do
    let(:url) { 'other-page.php?wat=2&test=3' }
    let(:content) { "<video src='#{url}' />" }

    it { is_expected.to eq('<video src="https://test.local/other-page.php?wat=2&test=3"></video>') }
  end

  describe 'when http://duckduckgo.com/hello' do
    let(:url) { 'http://duckduckgo.com/hello' }
    let(:content) { "<a href='#{url}'>Link</a>" }

    it { is_expected.to eq('<a href="http://duckduckgo.com/hello">Link</a>') }
  end

  describe 'when /wat-wat?test.local' do
    let(:url) { '/wat-wat?test.local' }
    let(:content) { "<iframe src='#{url}' />" }

    it { is_expected.to eq('<iframe src="https://test.local/wat-wat?test.local"></iframe>') }
  end
end