<script setup>
import { ref } from 'vue'

const selectValue = ref('')

defineProps({
  label: {
    type: String,
    default: 'Select'
  },
  options: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="select-parent">
    <div class="select__icon" />
    <input
      readonly
      v-model="selectValue"
      :placeholder="label"
      class="select-input"
    >
    <ul class="options">
      <li
        v-for="option in options"
        class="options__item"
        @click="selectValue = option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style src="./style.css"></style>
