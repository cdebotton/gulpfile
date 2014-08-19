'use strict';

var merge         = require('react/lib/merge');
var slug          = require('slug')
var Store         = require('./');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var PAGE          = require('../constants/PAGE');
var UUID          = require('../lib/UUID');

var _pages = [];

function createPage(page) {
  page.uuid = UUID();
  page.slug = slug(page.title).toLowerCase();
  _pages.push(page);
}

function destroyPage(uuid) {
  var index = _pages.map(function(page) {
    return page.uuid;
  }).indexOf(uuid);

  delete _pages[index];
}

var PageStore = merge(Store, {
  getPages: function() {
    return _pages;
  },

  getPageById: function(uuid) {
    var index = _pages.map(function(page) {
      return page.uuid;
    }).indexOf(uuid);

    return _pages[index];
  },

  getLastPage: function() {
    return _pages[_pages.length - 1];
  },

  getFirstPage: function() {
    return _pages[0];
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
      case PAGE.CREATE:
        createPage(action.page);
        break;
      case PAGE.DESTROY:
        destroyPage(action.uuid);
        break;
    }

    PageStore.emitChange();
    return true;
  })
});

module.exports = PageStore;
