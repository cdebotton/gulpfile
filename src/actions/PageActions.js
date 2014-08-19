'use strict';

var invariant     = require('react/lib/invariant');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var PAGE          = require('../constants/PAGE');

var PageActions = {
  createPage: function(page) {
    AppDispatcher.handleViewAction({
      actionType: PAGE.CREATE,
      page: page
    });
  },

  destroyPage: function(uuid) {
    invariant(
      typeof uuid === 'string',
      'Expecting a uuid `string` parameter, received `%s`',
      typeof uuid
    );

    AppDispatcher.handleViewAction({
      actionType: PAGE.DESTROY,
      uuid: uuid
    })
  }
};

module.exports = PageActions;
