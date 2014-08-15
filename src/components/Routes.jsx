/** @jsx React.DOM */

'use strict';

var Routes        = require('react-router').Routes;
var Router        = require('react-router').Router;
var Route         = require('react-router').Route;
var App           = require('./App.jsx');
var AboutHandler  = require('./AboutHandler.jsx');

module.exports = (
  <Routes location="history">
    <Route handler={App}>
      <Route name="about" handler={AboutHandler} />
    </Route>
  </Routes>
);
