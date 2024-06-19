import { describe, test, expect } from 'vitest'
import { useWindowScroll } from './index'

describe('useWindowScroll', () => {
  test('should return correct window scroll position', () => {
    const { scrollY } = useWindowScroll()
    expect(scrollY.value).toEqual(0)
  })
})
