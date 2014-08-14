chai      = require 'chai'
sinonChai = require 'sinon-chai'
sinon     = require 'sinon'

chai.should()
chai.use sinonChai

require('node-jsx').install({
  extension: '.jsx'
})
App = require '../../src'

describe 'App', ->
  describe '#register()', ->
    it 'should be ok', ->
      App.should.be.ok
