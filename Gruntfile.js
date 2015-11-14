/*
 * grunt-heroku-branch-setup
 * https://github.com/matmar10/grunt-heroku-branch-setup
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // enforce code style guideline
    jsbeautifier: {
      options: {
        config: '.jsbeautifyrc'
      },
      dev: {
        options: {
          mode: 'VERIFY_AND_WRITE'
        },
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ]
      },
      test: {
        options: {
          mode: 'VERIFY_ONLY'
        },
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ]
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    herokuBranch: {
      production: 'git@heroku.com:soma-test-grunt-prod.git',
      camelCase: {
        options: {
          changeCase: 'camelCase'
        },
        name: 'some_remote',
        url: 'git@heroku.com:soma-test-grunt-prod.git'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*-test.js']
    },

    release: {
      options: {}
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'jsbeautifier:test',
    'jshint',
    'clean',
    'herokuBranch:production',
    'herokuBranch:camelCase',
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jsbeautifier:dev', 'test']);

};
