module Channels
  module Opml
    class Export < Service
      def initialize(user:)
        @user = user
      end

      def call
        OpmlHandler::Opml.new(outlines_attributes: data, title: title).to_xml
      end

      private

      attr_reader :user

      def title
        "Feeds for #{user.username}"
      end

      def data
        user.channels.for_opml.find_each.map do |channel|
          { text: channel.name, htmlUrl: channel.site_url, xmlUrl: channel.source }
        end
      end
    end
  end
end