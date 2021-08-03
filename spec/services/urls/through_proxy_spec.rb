require 'rails_helper'

RSpec.describe Urls::ThroughProxy do
  context 'when img tag' do
    subject(:html) { Nokogiri::XML(described_class.call("<img src='#{url}' />").to_html).search('img').first }

    describe 'when src is http://google.com' do
      let(:url) { 'http://google.com' }

      it { expect(html.name).to eq('img') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/a1fa9bb361cf9f1bf6b9a6a3b10615456637d23d/687474703a2f2f676f6f676c652e636f6d') }
      it { expect(html[:'data-detox-src']).to eq(url) }
    end

    describe 'when src is https://fbcdn.com/image.php?test=23s&vc=33' do
      let(:url) { 'https://fbcdn.com/image.php?test=23s&vc=33' }

      it { expect(html.name).to eq('img') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/6a486a2725d934053cd645d6c85dea8f29e958a7/68747470733a2f2f666263646e2e636f6d2f696d6167652e7068703f746573743d3233732676633d3333') }
    end

    describe 'when src is https://i.imgflip.com/477zjh.jpg' do
      let(:url) { 'https://i.imgflip.com/477zjh.jpg' }

      it { expect(html.name).to eq('img') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/0997f88113dc68bd54f1848810c6ea5dc64f6919/68747470733a2f2f692e696d67666c69702e636f6d2f3437377a6a682e6a7067') }
    end
  end

  context 'when src is video tag' do
    subject(:html) { Nokogiri::XML(CGI.unescapeHTML(described_class.call("<video src='#{url}' />").to_html)).search('video').first }

    describe 'when src is http://google.com' do
      let(:url) { 'http://google.com' }

      it { expect(html.name).to eq('video') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/a1fa9bb361cf9f1bf6b9a6a3b10615456637d23d/687474703a2f2f676f6f676c652e636f6d') }
    end

    describe 'when src is https://fbcdn.com/image.php?test=23s&vc=33' do
      let(:url) { 'https://fbcdn.com/image.php?test=23s&vc=33' }

      it { expect(html.name).to eq('video') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/6a486a2725d934053cd645d6c85dea8f29e958a7/68747470733a2f2f666263646e2e636f6d2f696d6167652e7068703f746573743d3233732676633d3333') }
    end

    describe 'when src is https://i.imgflip.com/477zjh.jpg' do
      let(:url) { 'https://i.imgflip.com/477zjh.jpg' }

      it { expect(html.name).to eq('video') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/0997f88113dc68bd54f1848810c6ea5dc64f6919/68747470733a2f2f692e696d67666c69702e636f6d2f3437377a6a682e6a7067') }
    end
  end

  context 'when src is source tag' do
    subject(:html) { Nokogiri::XML(CGI.unescapeHTML(described_class.call("<source src='#{url}' />").to_html)).search('source').first }

    describe 'when src is http://google.com' do
      let(:url) { 'http://google.com' }

      it { expect(html.name).to eq('source') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/a1fa9bb361cf9f1bf6b9a6a3b10615456637d23d/687474703a2f2f676f6f676c652e636f6d') }
    end

    describe 'when src is https://fbcdn.com/image.php?test=23s&vc=33' do
      let(:url) { 'https://fbcdn.com/image.php?test=23s&vc=33' }

      it { expect(html.name).to eq('source') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/6a486a2725d934053cd645d6c85dea8f29e958a7/68747470733a2f2f666263646e2e636f6d2f696d6167652e7068703f746573743d3233732676633d3333') }
    end

    describe 'when src is https://i.imgflip.com/477zjh.jpg' do
      let(:url) { 'https://i.imgflip.com/477zjh.jpg' }

      it { expect(html.name).to eq('source') }
      it { expect(html[:src]).to eq('http://localhost:8080/api/proxy/0997f88113dc68bd54f1848810c6ea5dc64f6919/68747470733a2f2f692e696d67666c69702e636f6d2f3437377a6a682e6a7067') }
    end
  end
end