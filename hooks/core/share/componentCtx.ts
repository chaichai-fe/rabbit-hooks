import { createApp } from 'vue'

export function withSetup<T extends (...args: any) => any>(composable: T) {
  let result: ReturnType<T> = {} as any
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    },
  })
  app.mount(document.createElement('div'))
  return {
    result,
    app,
  }
}
