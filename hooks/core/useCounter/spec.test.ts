import { describe, test, expect } from 'vitest'
import { useCounter } from './index'

describe('test useCounter', () => {
  test('test initialCount', () => {
    const [value] = useCounter(10)
    expect(value.value).toBe(10)
  })

  test('test inc function', () => {
    const [value, { inc }] = useCounter(10)
    inc()
    expect(value.value).toBe(11)
    inc()
    expect(value.value).toBe(12)
  })

  test('test dec function', () => {
    const [value, { dec }] = useCounter(10)
    dec()
    expect(value.value).toBe(9)
    dec()
    expect(value.value).toBe(8)
  })

  test('test reset function', () => {
    const initialCount = 10
    const [value, { inc, dec, reset }] = useCounter(initialCount)
    inc()
    expect(value.value).toBe(11)
    reset()
    expect(value.value).toBe(initialCount)
    dec()
    expect(value.value).toBe(9)
    reset()
    expect(value.value).toBe(initialCount)
  })

  test('test max option', () => {
    const initialCount = 4
    const [value, { inc }] = useCounter(initialCount, { max: 5 })
    expect(value.value).toBe(4)
    inc()
    expect(value.value).toBe(5)
    inc()
    expect(value.value).toBe(5)
  })

  test('test min option', () => {
    const initialCount = 4
    const [value, { dec }] = useCounter(initialCount, { min: 2 })
    expect(value.value).toBe(4)
    dec()
    expect(value.value).toBe(3)
    dec()
    expect(value.value).toBe(2)
    dec()
    expect(value.value).toBe(2)
  })
})
