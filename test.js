var jsonpull = require('./index.js');
var pull = require('pull-stream');
var test = require('tape');

var test_json = {
    "test_string": "test_string",
    "test_intger": 1,
    "test_array": [1, "string", {"obj": "test" }],
    "nested_obj": {
      "obj": "nested"
    }
}

test('json to string streaming', function(t){
  t.plan(1);
  var jsonDataStream = pull.values([test_json])
  jsonDataStream
    .pipe(jsonpull.stringify)
    .pipe(pull.collect(function(end, data){
      t.is(data[0], JSON.stringify(test_json), 'Data is stringified');
    }))
});

test('parse streaming json', function(t){
   t.plan(1);
   var jsonStringDataStream = pull.values([JSON.stringify(test_json)])
   jsonStringDataStream
    .pipe(jsonpull.parse)
    .pipe(pull.collect(function(end, data){
      t.deepEqual(data[0], test_json, 'Data is parsed');
    }))
  t.end();
});