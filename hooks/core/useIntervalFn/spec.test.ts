import { test, vi, expect, describe, beforeEach } from 'vitest'
import { useIntervalFn } from './index'
import { withSetup } from '../share/componentCtx'

// 模拟一个promise
function promiseTimeout(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

describe('useIntervalFn test', () => {
  let cb = vi.fn()
  beforeEach(() => {
    cb = vi.fn()
  })
  test('no resume no call', () => {
    useIntervalFn(cb, 1000)
    expect(cb).toHaveBeenCalledTimes(0)
  })
  test('resume test', async () => {
    const { start } = useIntervalFn(cb, 1000)
    start()
    await promiseTimeout(2000)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('pause test', async () => {
    const { start, stop } = useIntervalFn(cb, 1000)
    start()
    await promiseTimeout(2000)
    expect(cb).toHaveBeenCalledTimes(1)
    stop()
    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('pause when app unmount', async () => {
    const { result, app } = withSetup<typeof useIntervalFn>(() =>
      useIntervalFn(cb, 1000)
    )

    const { start } = result
    start()
    app?.unmount()
    await promiseTimeout(2000)
    expect(cb).toHaveBeenCalledTimes(0)
  })
})
