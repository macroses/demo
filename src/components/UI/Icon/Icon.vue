<script setup>
const props = defineProps({
  width: String,
  iconName: String,
  fill: String
})
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    :width="width"
    style="fill: currentColor"
  >
    <use :xlink:href="`/light.svg#${iconName}`" />
  </svg>
</template>

<style>
svg {
  height: auto;
}
</style>
