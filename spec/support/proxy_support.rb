
module ProxySupport
  def spawn_server(path)
    port = 7777
    config = "spec/warp_pipe/servers/#{path}.ru"
    host = "localhost:#{port}"
    pid = fork do
      STDOUT.reopen "/dev/null"
      STDERR.reopen "/dev/null"
      exec "rackup", "--port", port.to_s, config
    end
    sleep 2
    begin
      yield host
    ensure
      Process.kill(:TERM, pid)
      Process.wait(pid)
    end
  end

  def spawn_proxy(port = 7777)
    pid = fork do
      ENV['FRONTEND_PORT'] = port.to_s
      ENV['NODE_ENV'] = "production"
      STDOUT.reopen "/dev/null"
      #STDERR.reopen "/dev/null"
      Dir.chdir Rails.root.join('app/javascript/client')
      exec "node", "server.js"
    end
    sleep 5
    begin
      yield port
    ensure
      Process.kill(:TERM, pid)
      Process.wait(pid)
    end
  end
  
  def request(resource_url)
    request_uri = Security::GenerateProxyUrl.call(resource_url)
    RestClient.get(request_uri) # TODO replace with http?
  end
end