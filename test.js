

var buildRegex = function (name) {
  var gitUrlRegex = '(?:git|ssh|https?|git@[\\w\\.]+):(?:\\/\\/)?[\\w\\.@:\\/~_-]+\\.git(?:\\/?|\\#[\\d\\w\\.\\-_]+?) ';
  return {
    fetch: new RegExp(name + '\\x09' + gitUrlRegex + '\\(fetch\\)'),
    push: new RegExp(name + '\\x09' + gitUrlRegex + '\\(push\\)')
  };
};

var result = {
  output: 'heroku-production	git@heroku.com:soma-test-grunt.git (fetch)\nheroku-production	git@heroku.com:soma-test-grunt.git (push)\nheroku-production	git@heroku.com:soma-test-grunt.git (fetch)\nheroku-production	git@heroku.com:soma-test-grunt.git (push)\norigin	git@github.com:matmar10/grunt-heroku-branch.git (fetch)\norigin	git@github.com:matmar10/grunt-heroku-branch.git (push)'
};

// console.log(result.output.search('heroku-production\x09(\w+://)(.+@)*([\w\d\.]+)(:[\d]+){0,1}/*(.*)\x09\(fetch\)'));

var re = /heroku-production\x09(?:git|ssh|https?|git@[\w\.]+):(?:\/\/)?[\w\.@:\/~_-]+\.git(?:\/?|\#[\d\w\.\-_]+?) \(push\)/;
console.log(re);
console.log(result.output.search(re));

var re = buildRegex('heroku-production');

console.log(re.fetch);
console.log(result.output.search(re.fetch));
console.log(re.push);
console.log(result.output.search(re.push));

