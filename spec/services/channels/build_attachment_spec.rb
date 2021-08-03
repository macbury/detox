require 'rails_helper'

RSpec.describe Channels::BuildAttachment do
  include_context 'asyncReactor'

  subject(:attachment) { described_class.call(channel: channel, entry_metadata: entry_metadata) }

  let(:channel) { nil }

  describe 'when youtube video link' do
    before do
      allow(Extract::Youtube::PlayerSts).to receive(:call).and_return('abcsts')

      stub_request(:any, /ytimg.com/).
        to_return(status: 200, body: file_fixture('maxresdefault.jpg'))

      stub_request(:any, /www.youtube.com\/watch/i).
        to_return(status: 200, body: file_fixture('youtube/Z3fr6c9Ek64.html').read)
    end

    let(:entry_metadata) do
      EntryMetaData.new(
        guid: 'https://www.youtube.com/watch?v=AAsICMPwGPY',
        title: 'Entry title',
        permalink: 'https://www.youtube.com/watch?v=AAsICMPwGPY',
        poster: nil,
        comments_url: nil,
        body: '',
        published_at: Time.zone.now,
        media_url: nil,
        poster_url: nil
      )
    end

    it { is_expected.to be_kind_of(Video) }
    it { expect(attachment.uri).to eq('https://www.youtube.com/watch?v=AAsICMPwGPY') }
    it 'has poster' do
      expect(attachment.poster).to be_present
      expect(attachment.poster.width).to eq(1280)
      expect(attachment.poster.height).to eq(720)
      expect(attachment.poster.blurhash).to be_present
    end
  end

  describe 'when normal link' do
    before do
      stub_request(:get, "https://www.xda-developers.com/files/2020/08/Mobvoi-Earbuds-Gesture-launch-1-810x298_c.jpg")
        .to_return(status: 200, body: file_fixture('streetlights-768x432.jpg'))
    end

    let(:entry_metadata) do
      EntryMetaData.new(
        guid: 'https://www.xda-developers.com/mobvoi-earbuds-gesture-are-new-tws-earbuds-with-head-gestures/',
        title: '',
        permalink: 'https://www.xda-developers.com/mobvoi-earbuds-gesture-are-new-tws-earbuds-with-head-gestures/',
        poster_url: 'https://www.xda-developers.com/files/2020/08/Mobvoi-Earbuds-Gesture-launch-1-810x298_c.jpg',
        comments_url: nil,
        body: 'body content',
        published_at: Time.zone.now,
        media_url: nil
      )
    end

    it { is_expected.to be_kind_of(Article) }
    it { expect(attachment.body).to eq('body content') }
    it 'has poster' do
      expect(attachment.poster).to be_present
      expect(attachment.poster.width).to eq(768)
      expect(attachment.poster.height).to eq(432)
      expect(attachment.poster.blurhash).to be_present
    end
  end
end