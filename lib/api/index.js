// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var cache$, createAlertApi, createAssertApi, createCookieApi, createDebugApi, createElementApi, createInputApi, createNavigationApi, createPageApi, createWindowApi, extend, hasType, inferCapabilities, log, truthy, WebDriver;
  WebDriver = require('webdriver-http-sync');
  log = require('../log');
  cache$ = require('assertive');
  truthy = cache$.truthy;
  hasType = cache$.hasType;
  extend = require('underscore').extend;
  inferCapabilities = require('./capabilities');
  createAlertApi = require('./alert');
  createAssertApi = require('./assert');
  createElementApi = require('./element');
  createNavigationApi = require('./navigation');
  createPageApi = require('./page');
  createInputApi = require('./input');
  createCookieApi = require('./cookie');
  createDebugApi = require('./debug');
  createWindowApi = require('./window');
  module.exports = function () {
    function class$(targetPort, proxyCommandPort, webdriverServerUrl, desiredCapabilities, options) {
      var invocation;
      if (null == options)
        options = {};
      invocation = 'new Driver(targetPort, proxyCommandPort, webdriverServerUrl, desiredCapabilities)';
      hasType('' + invocation + ' - requires (Number) targetPort', Number, targetPort);
      hasType('' + invocation + ' - requires (Number) proxyCommandPort', Number, proxyCommandPort);
      hasType('' + invocation + ' - requires (String) webdriverServerUrl', String, webdriverServerUrl);
      hasType('' + invocation + ' - requires (Object) desiredCapabilities', Object, desiredCapabilities);
      this.proxyCommandRoot = 'http://127.0.0.1:' + proxyCommandPort;
      this.urlRoot = 'http://127.0.0.1:' + targetPort;
      this.log = log(options.logDirectory);
      this.driver = new WebDriver(webdriverServerUrl, desiredCapabilities, options.http);
      this.driver.on('request', this.log);
      this.driver.on('response', this.log.response);
      this.capabilities = inferCapabilities(this.driver.capabilities);
      this.alert = createAlertApi(this.driver);
      extend(this, createNavigationApi(this.driver));
      extend(this, createPageApi(this.driver));
      extend(this, createElementApi(this.driver));
      extend(this, createInputApi(this.driver));
      extend(this, createCookieApi(this.driver));
      extend(this, createDebugApi(this.driver));
      extend(this, createWindowApi(this.driver));
      this.assert = createAssertApi(this);
    }
    class$.prototype.close = function (callback) {
      hasType('close(callback) - requires (Function) callback', Function, callback);
      this.driver.close();
      return this.log.flush(callback);
    };
    class$.prototype.evaluate = function (clientFunction) {
      var args, cache$1, invocation, size$;
      if (arguments.length > 1) {
        cache$1 = arguments;
        size$ = cache$1.length;
        args = size$ > 1 ? [].slice.call(cache$1, 0, size$ - 1) : [];
        clientFunction = cache$1[size$ - 1];
        cache$1;
      }
      invocation = 'evaluate(clientFunction) - requires (Function|String) clientFunction';
      truthy(invocation, clientFunction);
      if (typeof clientFunction === 'function') {
        args = JSON.stringify(null != args ? args : []);
        clientFunction = 'return (' + clientFunction + ').apply(this, ' + args + ');';
      } else if (typeof clientFunction !== 'string') {
        throw new Error(invocation);
      }
      return this.driver.evaluate(clientFunction);
    };
    return class$;
  }();
}.call(this);
