module Channels
  module Youtube
    # Get cookies that can be used in header
    class CookiesHeader < Service
      def call
        cookies_txt = Setting.get(:youtube_cookies)
        return {} if cookies_txt.blank?

        jar = HTTP::CookieJar.new
        jar.load(StringIO.new(cookies_txt), :cookiestxt)
        cookies_header = jar.cookies.map(&:cookie_value).join(';')

        {
          'Cookie' => cookies_header
        }
      end
    end
  end
end