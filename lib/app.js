var tty = require('../tty.js/lib/tty.js');

var path = require('path')
  , fs = require('fs')
  , logger = require('../tty.js/lib/logger');

var webpair = require('./webpair')

var app = tty.createServer({
  shell: "ssh"
  , shellArgs: [""]
  , port: 8000
  , term: {
      termName: "xterm-256color"
    , geometry: [150, 50]
    , scrollback: 1000
    , visualBell: true
    , popOnBell: false
    , cursorBlink: false
    , screenKeys: false
  }
  , keyKeeper: webpair
});

app.get('/webpair', function(req, res, next) {
  var key = require('querystring').parse(require('url').parse(req.url).query).key;
  var port = 0;
  logger.log('Opening connection with key:'+key);
  if(webpair.checkKey(key)) {
    res.setHeader('Set-Cookie', 'webpair_key='+key);
    res.send('<script>document.location="/";</script>');
  } else {
    logger.log('!!! Sunbmited unauthorized key:'+key);
    res.send('Unauthorized Key');
  }
});

app.listen();

