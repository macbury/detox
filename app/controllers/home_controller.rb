class HomeController < ApplicationController
  def index
    redirect_to data_path
  end
end