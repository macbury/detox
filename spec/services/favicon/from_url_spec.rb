require 'rails_helper'

RSpec.describe Favicon::FromUrl do
  include_context 'asyncReactor'

  subject(:service) { described_class.call(url) }

  context 'when https://www.youtube.com/user/PowerfulJRE' do
    let(:url) { 'https://www.youtube.com/user/PowerfulJRE' }

    before do
      stub_request(:any, "https://www.youtube.com/user/PowerfulJRE").
        to_return(
          status: 200,
          body: file_fixture('youtube/PowerfulJRE.html').read,
          headers: {
            "content-type": 'text/html'
          }
        )
    end

    it { is_expected.to eq('https://yt3.ggpht.com/a/AATXAJwVJeeimAaxFQxL7vMQWzc7_ElVpT_Vhjnxwi9X=s900-c-k-c0xffffffff-no-rj-mo') }
  end

  context 'when https://www.youtube.com/feeds/videos.xml?channel_id=UCZYTClx2T1of7BRZ86-8fow' do
    let(:url) { 'https://www.youtube.com/feeds/videos.xml?channel_id=UCZYTClx2T1of7BRZ86-8fow' }

    before do
      stub_request(:any, "https://youtube.com/channel/UCZYTClx2T1of7BRZ86-8fow").
        to_return(status: 200, body: file_fixture('youtube/SciShow.html').read, headers: { 'content-type': 'text/html' })
    end

    it { is_expected.to eq('https://yt3.ggpht.com/a/AATXAJz7l1SVybs0VPRCnd0xSIoSIMnTTd9ABp8bSuRM=s900-c-k-c0xffffffff-no-rj-mo') }
  end

  context 'when https://www.youtube.com/channel/UC70RHgm8FoCkN2163piIfVg' do
    let(:url) { 'https://www.youtube.com/channel/UC70RHgm8FoCkN2163piIfVg' }

    before do
      stub_request(:any, "https://www.youtube.com/channel/UC70RHgm8FoCkN2163piIfVg").
        to_return(status: 200, body: file_fixture('youtube/MajorGrin.html').read, headers: { 'content-type': 'text/html' })
    end

    it { is_expected.to eq('https://yt3.ggpht.com/a/AATXAJw5u5Nv62_bcKkh_ba74B0aLOuJ4Bu2GGXJhBiM4A=s900-c-k-c0xffffffff-no-rj-mo') }
  end

  context 'when news.ycombinator.com' do
    let(:url) { 'https://news.ycombinator.com/' }

    before do
      stub_request(:any, "https://news.ycombinator.com/").
        to_return(status: 200, body: file_fixture('ycombinator.html').read, headers: { 'content-type': 'text/html' })

      stub_request(:head, "https://news.ycombinator.com/favicon.ico").
        to_return(status: 200, body: "")

      stub_request(:get, "https://news.ycombinator.com/favicon.ico").
        to_return(status: 200, body: "", headers: {})
    end

    it { is_expected.to eq('https://news.ycombinator.com/favicon.ico') }
  end

  context 'when github.com' do
    let(:url) { 'https://github.com/' }

    before do
      stub_request(:any, "https://github.com/").
        to_return(status: 200, body: file_fixture('github.html').read, headers: { 'content-type': 'text/html' })

      stub_request(:any, "https://github.githubassets.com/apple-touch-icon-180x180.png").
        to_return(status: 200, body: "", headers: {})
    end

    it { is_expected.to eq('https://github.githubassets.com/apple-touch-icon-180x180.png') }
  end

  context 'when cinkciarz.pl' do
    let(:url) { 'http://cinkciarz.pl/' }

    before do

      stub_request(:any, "http://cinkciarz.pl/").
        to_return(status: 200, body: file_fixture('cinkciarz.html').read, headers: { 'content-type': 'text/html' })

      stub_request(:any, "https://cinkciarz.pl/images/favicon-32x32.png?v1").
        to_return(status: 200, body: "", headers: {})
    end

    it { is_expected.to eq('https://cinkciarz.pl/images/favicon-32x32.png?v1') }
  end

  context 'when signal.org' do
    let(:url) { 'https://signal.org/blog/' }

    before do
      stub_request(:any, "https://signal.org/blog/")
        .to_return(status: 200, body: file_fixture('signal.html').read, headers: { 'content-type': 'text/html' })

      stub_request(:any, "https://signal.org/assets/favicon/android-icon-192x192-2ce7be93a7e75de13098e18298fcb8910772ec2e035cea23f3c2ad438ff8e504.png")
        .to_return(status: 200, body: "", headers: {})
    end

    it { is_expected.to eq('https://signal.org/assets/favicon/android-icon-192x192-2ce7be93a7e75de13098e18298fcb8910772ec2e035cea23f3c2ad438ff8e504.png') }
  end
end