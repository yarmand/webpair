#!/usr/bin/env bundle exec ruby

require 'net/ssh'
require 'yaml'

def log(str)
  puts str
end

def open_connection(args = {})
  server = args['server'] || 'NO SERVER'
  user = args['remote_user'] || 'NO USER'
  remote_port = args['remote_port']
  port = 8100 + Random.rand(100)
  pguest = args['local_guest_user'] || 'NO_USER'
  protocol = args['use_https'] ? 'https' : 'http'
  key = random_string
  log "port: #{port}"
  log "random_string: #{key}"
  log "server: #{server}"
  log "user: #{user}"
  puts ">>> remote webpair URL:\n\n#{protocol}://#{server}:#{remote_port}/webpair?key=#{key}\n"
  Net::SSH.start(server, user, password: 'od82prn3') do |ssh|
    ssh.forward.remote(22, "localhost", port)
    #installed = ssh.exec "test -d webpair && echo 'OK'"
    #remote_install(ssh) unless installed == 'OK'
    ssh.exec "cd webpair ; echo '#{key}=#{port}:#{pguest}' >webpair.keys"
    ssh.exec "cd webpair ; node lib/app.js"
  end
end

def remote_install(ssh)
  log '### Installing on remote host'
  ssh.exec "cd"
  repo = `git remote -v | grep fetch | cut -f 2`.sub(%r{.*@github.com:},'http://www.github.com/').sub(%r{\.git\b.*\n},'')
  log "cloning webpair repository: #{repo}"
  ssh.exec "git clone #{repo}"
  ssh.exec "git checkout webpair"
  log 'installing node modules'
  ssh.exec 'cd webpair/tty.js'
  ssh.exec 'npm install'
  log '### Done'
  ssh.exec "cd"
end

def random_string
  (0...20).map{ ('a'..'z').to_a[rand(26)] }.join
end

config = YAML.load_file('../config.yml')
open_connection(config)

