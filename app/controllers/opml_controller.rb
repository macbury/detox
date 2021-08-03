class OpmlController < ApplicationController
  before_action :authenticate!

  def export
    send_data StringIO.new(Channels::Opml::Export.call(user: current_user)), filename: 'channels.opml'
  end
end
