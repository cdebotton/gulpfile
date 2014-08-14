var React = require('react');
var App = require('./components/App.jsx');

if ('undefined' !== typeof window) {
  React.renderComponent(App(), document.body);
}

module.exports = App;
