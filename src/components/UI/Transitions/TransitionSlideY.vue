<script setup>
import { gsap } from 'gsap'

const enter = el => {
  gsap.to(el, {
    duration: 0,
    gridTemplateRows: '1fr'
  })
}

const leave = el => {
  gsap.to(el, {
    duration: 0,
    gridTemplateRows: '0fr'
  })
}
</script>

<template>
  <Transition
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </Transition>
</template>
