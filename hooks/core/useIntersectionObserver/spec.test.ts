import { ref } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useIntersectionObserver } from './index'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

const MockCom = {
  setup() {
    const target = ref(null)
    const isIntersectingRef = ref(false)
    const { stop } = useIntersectionObserver(target, (isIntersecting) => {
      isIntersectingRef.value = isIntersecting
    })

    const scrollWrapper = document.querySelector('[data-test="scrollWrapper"]')

    const scrolltoBottomHandler = () => {
      if (scrollWrapper) {
        scrollWrapper.scrollTop = 1000
      }
    }

    const scrolltoTopHandler = () => {
      if (scrollWrapper) {
        scrollWrapper.scrollTop = 0
      }
    }

    return {
      target,
      isIntersectingRef,
      stop,
      scrolltoBottomHandler,
      scrolltoTopHandler,
    }
  },
  template: `
    <div data-test="scrollWrapper">
      <div style="height: 1200px">
        {{ isIntersectingRef ? 'intersecting' : 'not intersecting' }}
      </div>
      <div ref="target">
        <button @click="stop" data-test="stopBtn">stop</button>
        <button @click="scrollToBottomHandler" data-test="scrollToBottomBtn">scrollToButtomBtn</button>
        <button @click="scrollToTopHandler" data-test="scrollToTopBtn">scrolltoToTopBtn</button>
      </div>
    </div>
  `,
}

describe('useIntersectionObserver', () => {
  it('useIntersectionObserver should work', () => {
    const wrapper = mount(MockCom)
    expect(wrapper.text()).toContain('not intersecting')
    // 模拟容器滚动
    wrapper.find('[data-test="scrollToBottomBtn"]').trigger('click')
    expect(wrapper.text()).toContain('intersecting')
    // 模拟停止观察
    wrapper.find('[data-test="stopBtn"]').trigger('click')
    // 再次模拟容器滚动
    wrapper.find('[data-test="scrollToTopBtn"]').trigger('click')
    expect(wrapper.text()).toContain('intersecting')
  })
})
