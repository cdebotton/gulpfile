chai      = require 'chai'
sinonChai = require 'sinon-chai'
sinon     = require 'sinon'

chai.should()
chai.use sinonChai

Dispatcher = require '../../src/dispatchers'
Dispatcher.injectTestHelpers()

describe 'Dispatcher', ->
  beforeEach -> Dispatcher.__helpers._flush()

  describe '#register()', ->
    it 'should require a callback parameter', ->
      Dispatcher::register.should.throw 'Invariant Violation'

    it 'should push callback into private _callbacks array', ->
      [1..15].forEach ->
        noop = ->
        Dispatcher::register noop
        Dispatcher.__helpers._callbacks().indexOf(noop).should.be.greaterThan -1

    it 'should return a #dispatcherIndex equal to the length of callbacks', ->
      [1..15].forEach ->
        noop = ->
        indexA = Dispatcher::register noop
        indexA.should.equal Dispatcher.__helpers._callbacks().length

  describe '#dispatch()', ->
    it 'should require a payload object', ->
      Dispatcher::dispatch.should.throw 'Invariant Violation'

    it 'should call all registered callbacks', ->
      spies = [1..15].map ->
        callback  = sinon.spy()
        index     = Dispatcher::register callback
        {index, callback}

      Dispatcher::dispatch {}
      spies.forEach (spy) -> spy.callback.should.have.been.calledOnce

  describe '#waitFor()', (done) ->
    it 'should require a promiseIndexes array', ->
      Dispatcher::waitFor.should.throw 'Invariant Violation'

    it 'should require a callback function', ->
      Dispatcher::waitFor.bind(null,[]).should.throw 'Invariant Violation'

    it 'should run the passed callback method', (done)->
      spy = sinon.spy()
      index = Dispatcher::register spy

      Dispatcher::waitFor [index], ->
        spy.should.have.been.calledOnce
        done()

      Dispatcher::dispatch {}

    it 'should wait for callbacks of promiseIndexes to run before executing callback', ->
      spies = [1..15].map ->
        callback  = sinon.spy()
        index     = Dispatcher::register callback
        {index, callback}

      promiseIndexes = spies.map (spy) -> spy.index

      Dispatcher::waitFor promiseIndexes, ->
        spies.forEach (spy) -> spy.callback.should.have.been.calledOnce
        done()

      Dispatcher::dispatch {}
