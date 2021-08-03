require 'rails_helper'

RSpec.describe Urls::YoutubeProxy do
  subject(:html) { CGI.unescapeHTML(described_class.call(content).to_html) }

  let(:content) { file_fixture('youtube_iframe.html').read }

  xit { is_expected.to eq("<video data-youtube-id=\"krRskVc3s4c\" controls poster=\"/proxy/3d5766445dcc/media/aHR0cHM6Ly9pMy55dGltZy5jb20vdmkva3JSc2tWYzNzNGMvbWF4cmVzZGVmYXVsdC5qcGc=\" src=\"/proxy/d9271ea526d4/youtube/video/a3JSc2tWYzNzNGM=\"></video>") }
end