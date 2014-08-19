'use strict';

var merge         = require('react/lib/merge');
var invariant     = require('react/lib/invariant');
var EventEmitter  = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');

var CHANGE_EVENT = 'change';

var Store = merge(EventEmitter.prototype, {
  addChangeListener: function(callback) {
    invariant(
      'function' === typeof callback,
      'Expecting a `function` received a `%s`',
      typeof callback
    );

    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    invariant(
      'function' === typeof callback,
      'Expecting a `function` received a `%s`',
      typeof callback
    );

    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
});

module.exports = Store;
