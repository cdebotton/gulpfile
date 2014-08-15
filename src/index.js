'use strict';

var React = require('react');
var Routes = require('./components/Routes.jsx');

if ('undefined' !== typeof window) {
  React.renderComponent(Routes, document.body);
}

module.exports = Routes;
