'use strict';

var grunt = require('grunt');
var shell = require('shelljs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.herokuBranchSetup = {
  setUp: function (done) {
    done();
  },
  defaultOptions: function (test) {
    var expected = grunt.file.read('test/expected/default-options'),
      result = shell.exec('git remote --verbose', {
        async: false,
        silent: true
      });

    test.notEqual(result.output.indexOf(expected), -1,
      'Should add specified remotes using default case conversion');

    test.done();
  },
  camelCase: function (test) {
    var expected = grunt.file.read('test/expected/camel-case'),
      result = shell.exec('git remote --verbose', {
        async: false,
        silent: true
      });

    test.notEqual(result.output.indexOf(expected), -1,
      'Should add specified remotes using default case conversion');

    test.done();
  }
};
