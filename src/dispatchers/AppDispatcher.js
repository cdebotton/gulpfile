'use strict';

var merge       = require('react/lib/merge');
var invariant   = require('react/lib/invariant');
var Dispatcher  = require('./');

var AppDispatcher = merge(Dispatcher.prototype, {
  handleViewAction: function(action) {
    invariant(
      action && 'object' === typeof action,
      'Expecting an `object`, received `%s`',
      action ? 'null' : typeof action
    );

    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
