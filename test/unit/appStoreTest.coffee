chai      = require 'chai'
sinon     = require 'sinon'
sinonChai = require 'sinon-chai'

chai.should()
chai.use sinonChai

AppStore   = require '../../src/stores/AppStore'

describe 'AppStore', ->
  describe '#addChangeListener()', ->
    it 'should require a callback function', ->
      AppStore.addChangeListener.should.throw 'Invariant Violation'

    it 'should proxy AppStore#on()', ->
      AppStore.on = sinon.spy AppStore, 'on'
      AppStore.addChangeListener(->)
      AppStore.on.should.have.been.calledOnce
      AppStore.on.restore()

  describe '#removeChangeListener()', ->
    it 'should require a callback function', ->
      AppStore.removeChangeListener.should.throw 'Invariant Violation'

    it 'should proxy AppStore#removeListener()', ->
      AppStore.removeListener = sinon.spy AppStore, 'removeListener'
      AppStore.removeChangeListener(->)
      AppStore.removeListener.should.have.been.calledOnce
      AppStore.removeListener.restore()

  describe '#emitChange()', ->
    it 'should proxy AppStore#emit()', ->
      AppStore.emit = sinon.spy AppStore, 'emit'
      AppStore.emitChange(->)
      AppStore.emit.should.have.been.calledOnce
      AppStore.emit.restore()
