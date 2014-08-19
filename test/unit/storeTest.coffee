chai      = require 'chai'
sinon     = require 'sinon'
sinonChai = require 'sinon-chai'

chai.should()
chai.use sinonChai

Store   = require '../../src/stores'

describe 'Store', ->
  describe '#addChangeListener()', ->
    it 'should require a callback function', ->
      Store.addChangeListener.should.throw 'Invariant Violation'

    it 'should proxy Store#on()', ->
      Store.on = sinon.spy Store, 'on'
      Store.addChangeListener(->)
      Store.on.should.have.been.calledOnce
      Store.on.restore()

  describe '#removeChangeListener()', ->
    it 'should require a callback function', ->
      Store.removeChangeListener.should.throw 'Invariant Violation'

    it 'should proxy Store#removeListener()', ->
      Store.removeListener = sinon.spy Store, 'removeListener'
      Store.removeChangeListener(->)
      Store.removeListener.should.have.been.calledOnce
      Store.removeListener.restore()

  describe '#emitChange()', ->
    it 'should proxy Store#emit()', ->
      Store.emit = sinon.spy Store, 'emit'
      Store.emitChange(->)
      Store.emit.should.have.been.calledOnce
      Store.emit.restore()
