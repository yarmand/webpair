#!/usr/bin/env bundle exec ruby

require 'net/ssh'
 require 'yaml'


def open_connection(args = {})
  server = args['server'] || 'NO SERVER'
  user = args['remote_user'] || 'NO USER'
  remote_port = args['remote_port']
  port = 8100 + Random.rand(100)
  pguest = args['local_guest_user'] || 'NO_USER'
  key = random_string
  puts "port: #{port}"
  puts "random_string: #{key}"
  puts "server: #{server}"
  puts "user: #{user}"
  puts "URL:\nhttp://#{server}:#{remote_port}/webpair?key=#{key}"
  Net::SSH.start(server, user, password: 'od82prn3') do |ssh|
    ssh.forward.remote(22, "localhost", port)
    ssh.exec "cd webpair ; echo '#{key}=#{port}:#{pguest}' >webpair.keys"
    ssh.exec "cd webpair ; node lib/app.js"
  end

end

def random_string
  (0...20).map{ ('a'..'z').to_a[rand(26)] }.join
end

config = YAML.load_file('config.yml')
open_connection(config)

