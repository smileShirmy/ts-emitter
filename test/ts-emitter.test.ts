import EventEmitter from '../src'

describe('测试 EventEmitter', () => {
  it('触发 emit 并传入 data ，回调函数的参数是 data', () => {
    const emitter = new EventEmitter()
    const callback = jest.fn()

    emitter.addListener('event', callback)

    emitter.emit('event', 'data')

    expect(callback.mock.calls[0][0]).toBe('data')
  })

  it('test once', () => {
    const emitter = new EventEmitter()
    const callback = jest.fn()

    emitter.once('event', callback)

    emitter.emit('event', 'data')
    emitter.emit('event', 'data')

    expect(callback.mock.calls.length).toBe(1)
    expect(callback.mock.calls[0][0]).toBe('data')
  })
})
