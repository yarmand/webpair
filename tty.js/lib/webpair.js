
var path = require('path')
  , fs = require('fs')
  , logger = require('./logger');

function webpair() {
}


webpair.init = function() {
  logger.log('Hello');
};

webpair.openConnection = function (req,res,next) {
  var key = require('querystring').parse(require('url').parse(req.url).query).key;
  logger.log('Opening connection with key:'+key);
  next();
}

/**
 * Expose
 */

module.exports = webpair;
