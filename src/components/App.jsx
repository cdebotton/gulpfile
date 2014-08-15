/** @jsx React.DOM */

'use strict';

var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <h1><i className="fa fa-home" /> Hello, world!</h1>
      </div>
    );
  }
});

module.exports = App;
