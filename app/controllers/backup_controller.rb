class BackupController < ApplicationController
  def show
    send_file Backup::Create.call
  end
end