<script setup>
defineProps({
  sm: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    class="alert"
    :class="{ 'alert--sm': sm }"
  >
    <div class="alert__header">
      <slot name="alert-header" />
    </div>
    <slot />
  </div>
</template>

<style src="./style.css"></style>
