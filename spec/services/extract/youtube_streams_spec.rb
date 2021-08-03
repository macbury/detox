require 'rails_helper'

RSpec.describe Extract::Youtube::Streams do
  include_context 'asyncReactor'

  subject(:streams) { described_class.call(youtube_id) }

  describe 'get streams for proper yotube id' do
    let(:youtube_id) { 'Z3fr6c9Ek64' }
    let(:expected_streams) do
      [
        YoutubeStream.new(
          :url => "https://r1---sn-f5f7kn7z.googlevideo.com/videoplayback?expire=1624134801&ei=MQDOYOD5BMj4yAWRgoOoBQ&ip=87.207.103.222&id=o-AB7CTe17IwsA6Q2HIGgcSJV1mwyh8mQZ2aqT272YqcBU&itag=22&source=youtube&requiressl=yes&mh=YU&mm=31%2C26&mn=sn-f5f7kn7z%2Csn-c0q7lns7&ms=au%2Conr&mv=m&mvi=1&pl=17&pcm2=no&initcwndbps=1687500&vprv=1&mime=video%2Fmp4&ns=dQAOZAWy-VlIRClllPIEKu4F&cnr=14&ratebypass=yes&dur=851.057&lmt=1622264743482531&mt=1624112917&fvip=1&fexp=24001373%2C24007246&c=WEB&txp=5535432&n=WYGpmNk4p_mRf06Xd&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgTTTPvy-cEZnFJzJg_jKfaKTIStr2z9da8Vpdl_qUTT0CIQDBlHAVZt6j0F7UehdHPD_e9yS6TKuwvCCca6akxl1xzg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAIOZy60JzBAePO9IVmS7BwDrpMeWc7leZ6mR0XogJ0W3AiEArdfmwwg1BgKOey2j6_tc3jrHk-jNkVvHzJYswyMHynY%3D",
          :mime_type => "video/mp4; codecs=\"avc1.64001F, mp4a.40.2\"",
          :bitrate => 972431,
          :quality => "hd720",
          :approx_duration_ms => 851057,
          :width => 1280,
          :height => 720
        ),
        YoutubeStream.new(
          :url => "https://r1---sn-f5f7kn7z.googlevideo.com/videoplayback?expire=1624134801&ei=MQDOYOD5BMj4yAWRgoOoBQ&ip=87.207.103.222&id=o-AB7CTe17IwsA6Q2HIGgcSJV1mwyh8mQZ2aqT272YqcBU&itag=18&source=youtube&requiressl=yes&mh=YU&mm=31%2C26&mn=sn-f5f7kn7z%2Csn-c0q7lns7&ms=au%2Conr&mv=m&mvi=1&pl=17&pcm2=no&initcwndbps=1687500&vprv=1&mime=video%2Fmp4&ns=dQAOZAWy-VlIRClllPIEKu4F&gir=yes&clen=45277534&ratebypass=yes&dur=851.057&lmt=1621945141742123&mt=1624112917&fvip=1&fexp=24001373%2C24007246&c=WEB&txp=5530434&n=WYGpmNk4p_mRf06Xd&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAJRmuluvK5_Uhjl98ySyrkq3F74YIgv2-upvxOW7tDPiAiAPBgPHTWBqQtqKhm-RhPgDQSGFhNNIlbJBZ6IDHsAPMQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAIOZy60JzBAePO9IVmS7BwDrpMeWc7leZ6mR0XogJ0W3AiEArdfmwwg1BgKOey2j6_tc3jrHk-jNkVvHzJYswyMHynY%3D",
          :mime_type => "video/mp4; codecs=\"avc1.42001E, mp4a.40.2\"",
          :bitrate => 425657,
          :quality => "medium",
          :approx_duration_ms => 851057,
          :width => 640,
          :height => 360
        )
      ]
    end

    before do
      stub_request(:any, 'https://www.youtube.com/watch?v=Z3fr6c9Ek64').
        to_return(status: 200, body: file_fixture('youtube/Z3fr6c9Ek64.html').read, headers: {})
    end

    it { expect(streams).to eq(expected_streams) }
  end

  describe 'return error for invalid id' do
    let(:youtube_id) { 'fake' }

    before do
      stub_request(:any, 'https://www.youtube.com/watch?v=fake').
        to_return(status: 200, body: file_fixture('youtube/404.html').read, headers: {})
    end

    it { expect(streams).to eq([]) }
  end
end