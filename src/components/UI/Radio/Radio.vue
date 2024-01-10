<script setup>
import { uid } from 'uid'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  defaultChecked: {
    type: Boolean,
    default: false
  }
})

const defaultChecked = ref(props.defaultChecked)

const uniqueId = uid(10)
const isChecked = computed(() => {
  if (defaultChecked.value) {
    return true
  }

  if (props.value === props.modelValue) {
    return true
  }
})

defineEmits(['update:modelValue'])

watch(() => props.modelValue, () => {
  if (isChecked.value) {
    defaultChecked.value = false
  }
})
</script>

<template>
  <div class="radio-parent">
    <div class="radio-content">
      <div class="radio">
        <input
          class="radio-component"
          type="radio"
          :id="uniqueId"
          :value="value"
          @change="$emit('update:modelValue', $event.target.value)"
          :checked="defaultChecked || isChecked"
        >
        <span
          class="radio-effect"
          :class="{ active: defaultChecked || isChecked }"
        />
      </div>

      <label
        :for="uniqueId"
        class="radio-label"
      >{{ label }}</label>
    </div>
  </div>
</template>

<style src="./style.css"></style>
