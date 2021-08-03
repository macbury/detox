module Proxy
  # Transform path and params from rails request into final url to proxy from
  class GetUrl < Service
    def initialize(path:, params:)
      @path = path
      @params = params
    end

    def call
      "#{scheme}://#{domain}?#{query}"
    end

    private

    attr_reader :path, :params

    def scheme
      @scheme ||= params[:scheme]
    end

    def domain
      @domain ||= path.split('/')[4..-1].join('/')
    end

    def query
      @query ||= params.reject do |key|
        ['action', 'scheme', 'path', 'format', 'controller'].include?(key)
      end.to_query
    end
  end
end