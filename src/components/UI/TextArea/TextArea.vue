<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: 100
  },
  placeholder: {
    type: String,
    default: ''
  },
  labelFade: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <div class="textarea">
    <div class="textarea__counter">
      {{ modelValue.length }} / {{ maxlength }}
    </div>
    <textarea
      class="textarea__input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :maxlength="maxlength"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped src="./style.css" />