class Service
  extend Usable

  def self.call(*args, **kwargs, &block)
    new(*args, **kwargs).call(&block)
  end

  # Small helper for executing call already in async block
  def self.async_call(*args, **kwargs, &block)
    Async do
      new(*args, **kwargs).call(&block)
    end.result
  end

  private

  def info(msg)
    Rails.logger.info "[#{self.class.name}] #{msg}"
    nil
  end

  def error(msg)
    Rails.logger.error "[#{self.class.name}] #{msg}"
    nil
  end
end