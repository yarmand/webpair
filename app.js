var tty = require('./tty.js/lib/tty.js');

var path = require('path')
  , fs = require('fs')
  , logger = require('./tty.js/lib/logger');


var app = tty.createServer({
  shell: "ssh"
  , shellArgs: ["pguest@localhost"]
  , port: 8000
  , term: {
      termName: "xterm-256color"
    , geometry: [180, 50]
    , scrollback: 1000
    , visualBell: true
    , popOnBell: false
    , cursorBlink: false
    , screenKeys: false
  }
});

app.get('/webpair', function(req, res, next) {
  var key = require('querystring').parse(require('url').parse(req.url).query).key;
  logger.log('Opening connection with key:'+key);
  conf = fs.readFileSync('./webpair.keys', 'utf8').split(':');
  ckey = conf[0]
  if( ckey == key) {
    port = conf[1]
    app.conf['shellArgs'] = '[ "-p", "'+port+'", "pguest@localhost"]'
    res.send('<script>document.location="/";</script>');
  } else {
    res.send('Unauthorized Key')
  }
});

app.listen();

