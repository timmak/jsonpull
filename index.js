var pull = require('pull-stream');

var parse = pull.asyncMap(function(data, cb){
  cb(null, JSON.parse(data));
});

var stringify = pull.asyncMap(function(data, cb){
   cb(null, JSON.stringify(data));
});

module.exports = {
  parse: parse,
  stringify: stringify
}