/** @jsx React.DOM */

'use strict';

var React = require('react');
var Link  = require('react-router').Link;

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <h1><Link to="/"><i className="fa fa-home" /></Link> Hello, world!</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="about">About</Link>
        </nav>
        {this.props.activeRouteHandler()}
      </div>
    );
  }
});

module.exports = App;
