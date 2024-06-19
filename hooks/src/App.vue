<script setup lang="ts">
import { ref } from 'vue'
import { useClickOutside } from '../core'
const elRef = ref(null)
useClickOutside(elRef, () => {
  console.log('关闭弹框')
})
</script>

<template>
  <div style="width: 500px; height: 500px; background-color: bisque">
    <button ref="elRef">click</button>
  </div>
</template>
