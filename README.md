# grunt-heroku-branch

Wrapper to add the appropriate heroku remotes to git via grunt config

## Getting Started

### Prerequisite

You must install the Heroku toolbelt locally:

[https://toolbelt.heroku.com/](https://toolbelt.heroku.com/)

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-heroku-branch --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-heroku-branch');
```

## The "herokuBranch" task

### Overview

In your project's Gruntfile, add a section named `herokuBranch` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  herokuBranch: {
    options: {
      changeCase: 'camelCase'
    },
    production: 'your-production-app-name',
    development: 'your-development-app-name',
  }
});
```

### Options

#### options.changeCase
Type: `String`
Default value: `'param'`
Valid values: `'sentenceCase'|'camelCase'|'pascalCase'|'snakeCase'|'paramCase'|'constantCase'`

How to convert the build target to a remote name.
This option is directly passed to [https://www.npmjs.com/package/change-case](https://www.npmjs.com/package/change-case)

Example:

```js
grunt.initConfig({
  herokuBranch: {
    options: {
      changeCase: 'camelCase'
    },
    remote_one: 'your-production-app-name',
    remoteTwo: 'your-development-app-name',
  }
});
```

Would produce the following result for `git remote -v`:

```js
remoteOne	git@heroku.com:your-development-app-name.git (fetch)
remoteTwo	git@heroku.com:your-development-app-name.git (push)
```

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  herokuBranch: {
    production: 'your-production-app-name',
    development: 'your-development-app-name',
  }
});
```

Would produce the following result for `git remote -v`:

```js
production	https://git.heroku.com:your-development-app-name.git (fetch)
development	https://git.heroku.com:your-development-app-name.git (push)
```

#### Custom Options

Customize the case used;

```js
grunt.initConfig({
  options: {
    changeCase: 'constantCase'
  },
  target1: {
    name: 'production',
    url: 'your-production-app-name'
  },
  target2: {
    name: 'development',
    url: 'your-development-app-name'
  }
});
```

Running `grunt herokuBranch:target1` and `grunt herokuBranch:target2` will produce the following results for `git remote -v`:

```js
PRODUCTION	https://git.heroku.com:your-production-app-name.git (fetch)
PRODUCTION	https://git.heroku.com:your-production-app-name.git (push)
DEVELOPMENT	https://git.heroku.com:your-development-app-name.git (fetch)
DEVELOPMENT	https://git.heroku.com:your-development-app-name.git (push)
```

## Contributing

JSHint and JSBeautifier steps should pass.

## Release History

### 0.2.2

Stable version with test coverage and docs.

