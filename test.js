var tap = require('tape')
var wobbler = require('./')

tap.test('does the thing', function (t) {
  t.plan(1)
  t.equal(wobbler('world'), 'hello world', 'does it')
})
