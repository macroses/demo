<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  dropdownList: {
    type: Array
  },
  small: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 200
  },
  isTop: {
    type: Boolean,
    default: false
  },
  defaultValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['activeValue'])

const dropdownParent = ref(null)
const isDropdownOpened = ref(false)
const activeItem = ref(props.dropdownList[0])
const toggleDropdown = () => isDropdownOpened.value = !isDropdownOpened.value

const activeValue = item => {
  activeItem.value = item
  isDropdownOpened.value = false
  emit('activeValue', item)
}

onClickOutside(dropdownParent, () => isDropdownOpened.value = false)
</script>

<template>
  <div
    ref="dropdownParent"
    class="dropdown"
    :style="{ width: `${width}px` }"
    :class="{ small: small }"
  >
    <p
      class="dropdown__value"
      @click="toggleDropdown"
    >
      {{ activeItem.value || defaultValue }}
      <Icon icon-name="angle-down" width="14px" />
    </p>
    <div
      class="dropdown__parent"
      :class="{
        active: isDropdownOpened,
        'dropdown__parent-top': isTop
      }"
    >
      <ul class="dropdown__list">
        <li
          v-for="item in dropdownList"
          :key="item.id"
          class="dropdown__item"
          :class="{ activeItem: item.id === activeItem.id }"
          @click="activeValue(item)"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style src="./style.css" />