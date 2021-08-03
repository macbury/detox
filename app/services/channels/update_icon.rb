module Channels
  class UpdateIcon < Service
    use Favicon::FromUrl, as: :get_favicon_url

    def initialize(channel)
      @channel = Channel.find(channel.id)
    end

    def call
      @favicon_url = get_favicon_url(channel.site_url)

      return unless @favicon_url

      channel.icon = IconUploader.remote_url(@favicon_url)
      channel.icon_derivatives!

      channel.save!
    rescue MiniMagick::Error, OpenSSL::SSL::SSLError, Errno::ECONNREFUSED, ActiveRecord::RecordInvalid, ServiceFailure => e
      error "Could not update icon: #{e.to_s}"
      false
    end

    private

    attr_reader :channel
  end
end