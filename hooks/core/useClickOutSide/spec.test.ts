import { useClickOutside } from './index'
import { describe, test, expect, vi } from 'vitest'

describe('useClickOutside', () => {
  test('should call the callback function when clicking outside the specified element', () => {
    const ele = document.createElement('div')
    const callback = vi.fn()
    useClickOutside(ele, callback)
    document.body.appendChild(ele)
    document.body.click()
    expect(callback).toHaveBeenCalled()
  })

  test('should not call the callback function when clicking inside the specified element', () => {
    const ele = document.createElement('div')
    const callback = vi.fn()
    useClickOutside(ele, callback)
    document.body.appendChild(ele)
    ele.click()
    expect(callback).not.toHaveBeenCalled()
  })

  test('should not call the callback function when clicking inside a child element of the specified element', () => {
    const ele = document.createElement('div')
    const child = document.createElement('div')
    const callback = vi.fn()
    useClickOutside(ele, callback)
    ele.appendChild(child)
    document.body.appendChild(ele)
    child.click()
    expect(callback).not.toHaveBeenCalled()
  })
})
