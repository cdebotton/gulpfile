/** @jsx React.DOM */

'use strict';

var React = require('react');
var Link  = require('react-router').Link;

var AboutHandler = React.createClass({
  render: function() {
    return (
      <div className="AboutHandler">
        <h1>Not Found, 404</h1>
        <p>Go <Link to="/">home</Link>.</p>
      </div>
    );
  }
});

module.exports = AboutHandler;
