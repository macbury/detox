module Async
  # Run each element of array in async block and wait for all of them to finish 
  class Each < Service
    def initialize(array)
      @barrier = Async::Barrier.new
      @array = array
    end

    def call(&block)
      tasks = array.map do |el|
        barrier.async do
          block.call(el)
        end
      end

      barrier.wait
      tasks.map(&:result)
    end

    private

    attr_reader :array, :barrier
  end
end