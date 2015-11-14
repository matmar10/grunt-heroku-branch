/*
 * grunt-heroku-branch
 * https://github.com/matmar10/grunt-heroku-branch
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

var changeCase = require('change-case');
var shell = require('shelljs');

module.exports = function (grunt) {

  grunt.registerMultiTask('herokuBranch',
    'Wrapper to add the appropriate branches in git via grunt config',
    function () {

      var options = this.options({
          changeCase: 'param',
        }),
        gitUrlRegex =
        '(?:git|ssh|https?|git@[\\w\\.]+):(?:\\/\\/)?[\\w\\.@:\\/~_-]+\\.git(?:\\/?|\\#[\\d\\w\\.\\-_]+?)',
        supportedCases = {
          sentence: true,
          camel: true,
          pascal: true,
          snake: true,
          param: true,
          constant: true
        },
        findOrCreate, buildExactMatches, buildRegexes, result, regexes,
        exactMatches, isGitUrl, remoteName, remoteUrl;

      if (!supportedCases[options.changeCase] && !supportedCases[options.changeCase.replace('Case', '')]) {
        grunt.fail.fatal('changeCase method `' + options.changeCase +
          '` is not supported; supported options are:', options.supportedCases);
        return;
      }

      switch (typeof this.data) {
        case 'string':
          remoteName = changeCase[options.changeCase](this.target);
          remoteUrl = this.data;
          break;
        case 'object':
          remoteName = changeCase[options.changeCase](this.data.name);
          remoteUrl = this.data.url;
          break;
        default:
          grunt.fail.fatal('Invalid data provided for target `' + this.target + '`');
          return;
      }

      grunt.verbose.writeln('Remote name is:', this.data.name);
      grunt.verbose.writeln('Remote URL is:', this.data.url);

      isGitUrl = function (url) {
        return url.match(new RegExp(gitUrlRegex));
      };

      if (!isGitUrl(remoteUrl)) {
        grunt.fail.fatal('Provided URL `' + remoteUrl + '` for target `' + remoteName + '` is not a valid git url');
        return;
      }

      buildExactMatches = function (remoteName) {
        return {
          fetch: remoteName + ' ' + remoteUrl + ' (fetch)',
          push: remoteName + ' ' + remoteUrl + ' (push)'
        };
      };

      buildRegexes = function (remoteName) {
        return {
          fetch: new RegExp('^' + remoteName + '\\x09' + gitUrlRegex + ' \\(fetch\\)$'),
          push: new RegExp('^' + remoteName + '\\x09' + gitUrlRegex + ' \\(push\\)$')
        };
      };

      findOrCreate = function (fileContent, type, exactMatches, regexes) {
        var lines = fileContent.split('\n'),
          removed = false,
          i, result;
        for (i = 0; i < lines.length; i++) {

          // exact match found; stop looping and end
          if (0 === lines[i].indexOf(exactMatches[type])) {
            grunt.verbose.writeln('Remote `' + remoteName +
              '` already exists and matches configured URL; no update needed');
            return;
          }

          // remote name already exists, but not an exact match
          if (lines[i].match(regexes[type])) {
            grunt.verbose.writeln('Remote `' + remoteName +
              '` already exists but does not match configured URL; removing existing remote');

            result = shell.exec('git remote remove ' + remoteName, {
              async: false,
              silent: true
            });

            if (result.code) {
              grunt.fail.fatal('Could not remove remote `' + remoteName + '`:', result.output);
              return;
            }

            // stop looping but fall-through to add below
            grunt.verbose.writeln('Existing remote `' + remoteName + '` removed successfully');
            grunt.verbose.writeln('Adding remote `' + remoteName + '` as `' + remoteUrl + '`');
            removed = true;
            break;
          }
        }

        if (!removed) {
          grunt.verbose.writeln('Remote ' + remoteName + '` does not exist; adding now');
        }
        result = shell.exec('git remote add ' + remoteName + ' ' + remoteUrl);
        if (result.code) {
          grunt.fail.fatal('Could not add remote `' + remoteName + '`:', result.output);
          return;
        }

        grunt.verbose.writeln('Added remote ' + remoteName);
      };

      // see existing remotes; add as needed
      result = shell.exec('git remote --verbose', {
        async: false,
        silent: true
      });

      if (result.code) {
        grunt.fail.fatal('Could not read git remote for local directory (exited with status code %s): %s', result.code,
          result.output);
        return;
      }

      grunt.verbose.writeln('Successful read git remotes:');
      grunt.verbose.writeln(result.output);

      exactMatches = buildExactMatches(remoteName);
      regexes = buildRegexes(remoteName);

      findOrCreate(result.output, 'push', exactMatches, regexes);
    });

};
