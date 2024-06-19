import { Ref, ref } from 'vue'

interface Options {
  max?: number
  min?: number
}

type ReturnType = [
  Ref<number>,
  {
    inc: () => void
    dec: () => void
    reset: () => void
  }
]

function useCounter(initialCount: number, options?: Options): ReturnType {
  const cacheCount = initialCount

  const value = ref(initialCount)

  const inc = () => {
    value.value++
    if (options?.max !== undefined) {
      value.value = Math.min(value.value, options.max)
    }
  }

  const dec = () => {
    value.value--
    if (options?.min !== undefined) {
      value.value = Math.max(value.value, options.min)
    }
  }

  const reset = () => (value.value = cacheCount)

  return [
    value,
    {
      inc,
      dec,
      reset,
    },
  ]
}

export { useCounter }
