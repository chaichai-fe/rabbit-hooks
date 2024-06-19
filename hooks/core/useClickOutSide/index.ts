import { Ref, onUnmounted, toValue, watchEffect } from 'vue'

type Cb = () => void

function useClickOutside(elRef: Ref<Element | null>, cb: Cb) {
  const handleClickOutside = (event: Event) => {
    const el = toValue(elRef)
    if (el && !el.contains(event.target as HTMLElement)) {
      cb()
    }
  }

  watchEffect(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}

export { useClickOutside }
