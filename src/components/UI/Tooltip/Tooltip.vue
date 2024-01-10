<script setup>
defineProps({
  position: {
    type: String,
    default: 'top'
  }
})
</script>

<template>
  <div
    class="project-tooltip"
    :class="{
      top: position === 'top',
      right: position === 'right',
      bottom: position === 'bottom',
      left: position === 'left',
    }"
  >
    <slot />
  </div>
</template>

<style scoped src="./style.css" />
