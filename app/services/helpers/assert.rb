module Helpers
  # Throw service error unless condition is meet
  class Assert < Service
    def initialize(condition, message = nil)
      @condition = condition
      @message = message
    end

    def call
      raise ServiceFailure, message unless condition
    end

    private

    attr_reader :message, :condition
  end
end