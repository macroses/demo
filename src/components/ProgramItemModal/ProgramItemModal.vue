<script setup>
import Icon from '@/components/UI/Icon/Icon.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  program: {
    type: Object,
    required: true
  }
})

const sessionExercises = ref(JSON.parse(localStorage.getItem('exercisesCache')))
const isExpanderActive = ref(false)

const filteredExercises = computed(() => {
  return sessionExercises.value.filter(exercise => props.program.exercises.includes(exercise.id))
})

const toggleExpander = () => isExpanderActive.value = !isExpanderActive.value
</script>

<template>
  <div class="program-item">
    <div class="program-item__top">
      <div class="program-item__duration">
        <Icon icon-name="arrows-rotate" width="16px" />
        <div class="program-item__duration-value">
          <span>{{ program.perWeek }}</span> per week
        </div>
      </div>
      <div class="program-item__goal">
        <Icon icon-name="bullseye-arrow" width="16px"/>
        {{ program.goals }}
      </div>
    </div>

    <h4 class="program-item__section-description">Used exercises</h4>
    <ol class="program-item__exercises">
      <li
        v-for="exercise in filteredExercises"
        :key="exercise.id"
        class="program-item__exercise-item"
      >
        {{ exercise.name }}
      </li>
    </ol>

    <h4 class="program-item__section-description">Description</h4>
    <div
      class="program-item__expander"
      :class="{ active: isExpanderActive }"
      @click="toggleExpander"
    >
      <div
        v-html="program.description"
        class="program-item__description"
      />
    </div>

<!--    <BodySvg />-->
  </div>
</template>

<style scoped src="./style.css" />