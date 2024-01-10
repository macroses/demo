<script setup>
defineProps({
  muscleItem: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <button class="muscles__item-header">
    {{ muscleItem.muscle }}
    <span class="muscle__item-length">
      {{ muscleItem.exercises.length }}
    </span>
    <span class="collapse__icon" />
  </button>
</template>
