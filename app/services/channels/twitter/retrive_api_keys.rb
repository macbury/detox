module Channels
  module Twitter
    # Fetch and cache api keys
    class RetriveApiKeys < Service
      use Download::Get, as: :download

      JsMainRegexes = [
        /(https:\/\/abs\.twimg\.com\/responsive-web\/web\/main\.[^\.]+\.js)/m,
        /(https:\/\/abs\.twimg\.com\/responsive-web\/web_legacy\/main\.[^\.]+\.js)/m,
				/(https:\/\/abs\.twimg\.com\/responsive-web\/client-web\/main\.[^\.]+\.js)/m,
				/(https:\/\/abs\.twimg\.com\/responsive-web\/client-web-legacy\/main\.[^\.]+\.js)/m,
      ].freeze

      API_KEY = /([a-zA-Z0-9]{59}%[a-zA-Z0-9]{44})/m
      GUEST_KEY = /gt=([0-9]*)/m

      def call
        raise ServiceFailure, 'Could not locate main.js link' unless js_link
        raise ServiceFailure, 'Could not find api key' unless api_match = js_content.match(API_KEY)

        guest_token = page.match(GUEST_KEY)
        raise ServiceFailure, 'Could not find guest token' unless guest_token

        [guest_token[1], api_match[1]]
      end

      private
      
      def page
        @page ||= download(url: 'https://twitter.com', cache: 5.minutes)
      end

      def js_link
        @js_link ||= JsMainRegexes.find do |js_main_regexp|
          if match = js_main_regexp.match(page)
            return match[0]
          end
        end
      end

      def js_content
        @js_content ||= download(url: js_link)
      end
      
    end
  end
end