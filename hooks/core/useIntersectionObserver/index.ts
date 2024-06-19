import { onUnmounted, Ref, toValue, watchEffect } from 'vue'

interface Options {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

function useIntersectionObserver(
  el: Ref<Element | null>,
  cb: (isIntersecting: boolean) => void,
  options?: Options
) {
  const { threshold = 1, root = null, rootMargin = '0px' } = options || {}
  let observer: IntersectionObserver | null = null
  const createObserver = () => {
    let _options = {
      root,
      rootMargin,
      threshold,
    }
    observer = new IntersectionObserver(([{ isIntersecting }]) => {
      cb(isIntersecting)
    }, _options)

    const element = toValue(el)

    if (element) observer.observe(element)
  }

  watchEffect(() => {
    createObserver()
  })

  const stop = () => observer && observer.disconnect()
  onUnmounted(() => stop())

  return {
    stop,
  }
}

export { useIntersectionObserver }
