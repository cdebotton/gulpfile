'use strict';

var merge     = require('react/lib/merge');
var invariant = require('react/lib/invariant');
var Promise   = require('es6-promise').Promise;

var _callbacks  = [];
var _promises   = [];

function Dispatcher() {};

Dispatcher.prototype = merge(Dispatcher.prototype, {
  /**
   * Register a callback method to handle payloads
   * that are disaptched by the Dispatcher.
   *
   * @param  {Function} callback Callback to run when
   *                             payload is dispatched.
   *
   * @return {Number}            dispatcherIndex to be
   *                             used by waitFor method.
   */
  register: function(callback) {
    invariant(
      'function' === typeof callback,
      'Expecting a `function`, received `%s`',
      typeof callback
    );

    _callbacks.push(callback);

    return _callbacks.length;
  },

  /**
   * Dispatch a payload, triggering all registered
   * callback methods to be run.
   *
   * @param  {Object} payload Payload object containing
   *                          dispatched action information.
   */
  dispatch: function(payload) {
    invariant(
      payload !== null && 'object' === typeof payload,
      'Expecting an `object`, received `%s`',
      typeof object === 'object' ? 'null' : typeof object
    );

    var resolves  = [];
    var rejects   = [];

    _promises = _callbacks.map(function(_, i) {
      return new Promise(function(resolve, reject) {
        resolves[i] = resolve;
        rejects[i] = reject;
      });
    });

    _callbacks.forEach(function(callback, i) {
      Promise.resolve(callback(payload)).then(function () {
        resolves[i](payload);
      }, function() {
        rejects[i](new Error('Dispatcher callback was unsuccessful'));
      });
    });

    _promises = [];
  },

  /**
   * Wait for a series of registered callbacks to complete
   * before executing callback
   *
   * @param  {Array}    promiseIndexes Callback dispatcherIndexes
   *                                   to wait for.
   *
   * @param  {Function} callback       Callback to run when promises
   *                                   are resolved.
   */
  waitFor: function(promiseIndexes, callback) {
    invariant(
      promiseIndexes && Object.prototype.hasOwnProperty.call(promiseIndexes, 'length'),
      'Expecting an `array`, received `%s`',
      typeof promiseIndexes
    );

    invariant(
      'function' === typeof callback,
      'Expecting a `function`, received `%s`',
      typeof callback
    );

    var selectedPromises = promiseIndexes.map(function(index) {
      return _promises[index];
    });

    Promise.all(selectedPromises).then(callback);
  }
});

/**
 * Inject helpers for test suite.
 */
Dispatcher.injectTestHelpers = function() {
  Dispatcher.__helpers = {
    callbacks: function() { return _callbacks; }
  };
};

module.exports = Dispatcher;
