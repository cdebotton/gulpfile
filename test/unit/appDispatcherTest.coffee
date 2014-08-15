chai      = require 'chai'
sinonChai = require 'sinon-chai'
sinon     = require 'sinon'

chai.should()
chai.use sinonChai

Dispatcher    = require '../../src/dispatchers'
AppDispatcher = require '../../src/dispatchers/AppDispatcher'

describe 'AppDispatcher', ->
  describe '#handleViewAction()', ->
    it 'should take an action object', ->
      AppDispatcher.handleViewAction.should.throw 'Invariant Violation'

    it 'should proxy AppDispatcher', ->
      AppDispatcher.dispatch = sinon.spy AppDispatcher, 'dispatch'
      AppDispatcher.handleViewAction {}
      AppDispatcher.dispatch.should.have.been.calledOnce
      AppDispatcher.dispatch.restore()
