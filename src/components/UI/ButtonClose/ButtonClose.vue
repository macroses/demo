<script setup>

defineProps({
  leftPosition: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :class="{ left: leftPosition }" />
</template>

<style scoped src="./style.css" />
