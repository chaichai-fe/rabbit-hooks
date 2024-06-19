import { onUnmounted } from 'vue'

type Cb = () => void

type ReturnType = {
  start: () => void
  stop: () => void
}

function useIntervalFn(fn: Cb, time: number): ReturnType {
  let timerId: number
  const start = () => {
    clearInterval(timerId)
    timerId = window.setInterval(() => {
      fn?.()
    }, time)
  }

  const stop = () => window.clearInterval(timerId)

  onUnmounted(() => stop())

  return {
    start,
    stop,
  }
}

export { useIntervalFn }
