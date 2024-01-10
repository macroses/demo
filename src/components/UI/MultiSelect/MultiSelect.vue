<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  multiselectList: {
    type: Array,
    default: () => [],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  isSingleSelect: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  chosenItems: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'remove-items',
  'get-items'
])

const isDropdownVisible = ref(false)
const multiselectDropdown = ref(null)

const getItems = item => {
  if (props.isSingleSelect) {
    emit('get-items', item)
    isDropdownVisible.value = false

    return
  }

  emit('get-items', item)
}

onClickOutside(multiselectDropdown, () => isDropdownVisible.value = false)
</script>

<template>
  <div
    :class="{ 'multiselect--disabled': disabled }"
    class="multiselect"
  >
    <div
      class="multiselect__value"
      @click="isDropdownVisible = !isDropdownVisible"
      :class="{ active: isDropdownVisible }"
    >
      <div
        v-if="!chosenItems.length"
        class="multiselect__placeholder"
      >
        {{ label }}
        <Icon
          icon-name="angle-down"
          width="13px"
        />
      </div>
      <div
        v-else
        class="multiselect__item"
        v-for="item in chosenItems"
        :key="item"
      >
        {{ item.value }}
        <Icon
          v-if="!isSingleSelect"
          icon-name="xmark"
          width="13px"
          @click="$emit('remove-items', item)"
        />
      </div>
    </div>
    <div
      ref="multiselectDropdown"
      class="multiselect__list"
      :class="{ active: isDropdownVisible }"
    >
      <ul class="multiselect__dropdown">
        <li
          class="multiselect__dropdown-item"
          v-for="item in multiselectList"
          :key="item.id"
          :class="{ selected: item.selected }"
          @click.self="getItems(item)"
        >
          {{ item.value }}
          <Icon
            v-if="item.selected"
            icon-name="check"
            width="15px"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped src="./style.css" />