/**
 * This is a keyKeeper implementation for tty.js
 */

var path = require('path')
, fs = require('fs')
, logger = require('../tty.js/lib/logger');

function webpair() {
}

webpair.getKey = function(cookieString) {
  key = '';
  cookieString.split(';').forEach( function(cookie) { 
    var parts = cookie.split('=');
    if(parts[0].trim() == 'webpair_key') {
      key = parts[1].trim();
    }
  });
  return key;
}

webpair.shell = function(key) {
  return 'ssh';
}

webpair.shellArgs = function(key) {
  port = find_port(key);
  user = find_user(key);
  args = [ "-p", port, "pguest@localhost"];
  return args;
}

webpair.checkKey = function(key) {
  return find_data(key) != ''
}

function find_port(key)
{
  var data = find_data(key);
  d = data.split(':');
  return d[0].trim();
}

function find_user(key)
{
  var data = find_data(key);
  d = data.split(':');
  return d[1].trim();
}

function find_data(key)
{
  data = '';
  conflines = fs.readFileSync('./webpair.keys', 'utf8').split('\n');
  for(i=0 ; i < conflines.length ; i ++) {
    conf = conflines[i].split('=');
    if(conf[0] == key) {
      data = conf[1].trim()
      break;
    } 
  }
  return data;
}

  /**
   * Expose
   */

  module.exports = webpair;
