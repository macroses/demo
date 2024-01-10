<script setup>

</script>

<template>
  <div
    ref="dropdownList"
    class="user-dropdown__content"
    :class="{ 'user-menu__funcs--visible': activeIndex === index }"
    style="width: 100px"
  >
    <ul
      class="user-dropdown"
      style="width: 100px"
    >
      <li class="user-dropdown__item">
        Edit
      </li>
      <li
        class="user-dropdown__item"
        @click="deleteEvent(event.workoutId)"
      >
        Delete
      </li>
    </ul>
  </div>
</template>
