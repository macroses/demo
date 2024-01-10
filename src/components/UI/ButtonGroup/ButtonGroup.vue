<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  buttons: {
    type: Array,
    default: () => []
  }
})

const activeButton = ref(0)

const shadowBtn = ref(null)
const buttonItem = ref(null)

const activateButton = index => activeButton.value = index

const tabStyle = computed(() => {
  if (buttonItem.value) {
    const activeButtonRect = buttonItem.value[activeButton.value].getBoundingClientRect()
    const parentRect = shadowBtn.value.parentNode.getBoundingClientRect()
    const width = `${activeButtonRect.width - 4}px`
    const left = `${activeButtonRect.left - parentRect.left + 1}px`

    return `width: ${width}; left: ${left};`
  }
})

</script>

<template>
  <div class="button-group">
    <button
      ref="buttonItem"
      v-for="(item, index) in buttons"
      :key="item.id"
      class="button-group__item"
      :class="{ active: item.id === activeButton }"
      @click="$emit('getButton', item.id); activateButton(index)"
    >
      {{ item.value }}
    </button>
    <div ref="shadowBtn" class="shadow-btn" :style="tabStyle"/>
  </div>
</template>

<style scoped src="./style.css" />