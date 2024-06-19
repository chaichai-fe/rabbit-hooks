---
outline: deep
---

# Functions

## useCounter

- USAGE

```typescript
import { useCounter } from 'rabbit-hooks'

const { count, {inc, dec, reset} } = useCounter(0, {mix: 10, min: 0})

```

- TYPES

```typescript
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
declare function useCounter(initialCount: number, options?: Options): ReturnType
```

## useIntervalFn

- USAGE

```typescript
import { useIntervalFn } from 'rabbit-hooks'

const { start, stop } = useIntervalFn(() => {
  console.log('do something')
}, 1000)
```

- TYPES

```typescript
type Cb = () => void
type ReturnType = {
  start: () => void
  stop: () => void
}
declare function useIntervalFn(fn: Cb, time: number): ReturnType
```

## useWindowScroll

- USAGE

```typescript
import { useWindowScroll } from 'rabbit-hooks'

const { start, stop } = useWindowScroll(
  () => {
    console.log('do something')
  },
  {
    isThrottle: true,
    interval: 1000,
  }
)
```

- TYPES

```typescript
import { Ref } from 'vue'

interface Options {
  isThrottle?: boolean
  interval?: number
}
interface ReturnType {
  scrollY: Ref<number>
}
declare function useWindowScroll(options?: Options): ReturnType
```

## useClickOutSide

- USAGE

```typescript
import { useClickOutSide } from 'rabbit-hooks'
const elRef = ref(null)
useClickOutside(elRef, () => {
  console.log('关闭弹框')
})
```

- TYPES

```typescript
type Cb = () => void
declare function useClickOutside(el: HTMLElement, cb: Cb): void
```

## useIntersectionObserver

- USAGE

```typescript
import { useIntersectionObserver } from 'rabbit-hooks'

const elRef = ref(null)

useIntersectionObserver(elRef, (isIntersecting) => {
  // el into the View
  // inIntersection to be true
})
```

- TYPES

```typescript
import { Ref } from 'vue'

interface Options {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}
declare function useIntersectionObserver(
  el: Ref<Element | null>,
  cb: (isIntersecting: boolean) => void,
  options?: Options
): {
  stop: () => void | null
}
```
