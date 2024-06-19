import { ref, onUnmounted, Ref } from 'vue'
import { throttle } from 'radash'

interface Options {
  isThrottle?: boolean
  interval?: number
}

interface ReturnType {
  scrollY: Ref<number>
}

function useWindowScroll(options?: Options): ReturnType {
  const { isThrottle = false, interval = 200 } = options || {}

  const scrollY = ref(0)

  const cb = () => (scrollY.value = window.scrollY)

  const throttleCb = isThrottle ? throttle({ interval }, cb) : cb

  window.addEventListener('scroll', throttleCb)

  onUnmounted(() => {
    window.removeEventListener('scroll', throttleCb)
  })

  return {
    scrollY,
  }
}

export { useWindowScroll }
