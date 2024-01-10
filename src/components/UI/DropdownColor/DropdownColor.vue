<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Icon from '@/components/UI/Icon/Icon.vue'

const colorCollection = [
  { id: 1, rgb: '213, 0, 0' },
  { id: 2, rgb: '230, 124, 115' },
  { id: 3, rgb: '244, 81, 3' },
  { id: 4, rgb: '246, 191, 38' },
  { id: 5, rgb: '51, 182, 121' },
  { id: 6, rgb: '11, 128, 67' },
  { id: 7, rgb: '3, 155, 229' },
  { id: 8, rgb: '63, 81, 181' },
  { id: 9, rgb: '121, 134, 203' },
  { id: 10, rgb: '142, 36, 170' },
  { id: 11, rgb: '97, 97, 97' }
]

const emit = defineEmits(['dropColor'])

const container = ref(null)

const defaultColor = ref(colorCollection[0].rgb)
const isDropDownActive = ref(false)

const dropColor = color => {
  isDropDownActive.value = false
  defaultColor.value = color
  emit('dropColor', color)
}

onClickOutside(container, () => (isDropDownActive.value = false))
</script>

<template>
  <div
    ref="container"
    class="dropdown-color__container"
    @click="isDropDownActive = true"
  >
    <div class="title">
      Label
    </div>
    <div
      class="dropdown-color__result"
      :style="{ backgroundColor: 'rgb(' + defaultColor + ')' }"
    />
    <Icon
      class="dropdown-color__arrow"
      icon-name="angle-down"
      width="11px"
    />
    <ul
      v-if="isDropDownActive"
      class="dropdown-color"
    >
      <li
        v-for="colorItem in colorCollection"
        :key="colorItem.id"
        :style="{ backgroundColor: 'rgb(' + colorItem.rgb + ')' }"
        :class="{ active: colorItem.rgb === defaultColor }"
        @click.stop="dropColor(colorItem.rgb)"
      />
    </ul>
  </div>
</template>

<style src="./style.css"></style>
