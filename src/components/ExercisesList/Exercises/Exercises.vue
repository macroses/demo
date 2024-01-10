<script setup>

import { workoutStore } from '@/stores/workout.js'

const props = defineProps({
  exercises: {
    type: Array,
    required: true
  },
  favorites: {
    type: Array,
    default: () => []
  },
  isCustomExercises: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'showChosenExercises',
  'getFavoriteId',
  'deleteExercise'
])

const workoutsStore = workoutStore()

const showExercise = exercise => emit('showChosenExercises', exercise)

const toggleToFavoriteExercise = async id => emit('getFavoriteId', id)

const isFavorite = id => props.favorites.includes(id)

const deleteExercise = id => emit('deleteExercise', id)
</script>

<template>
  <div class="exercises-wr">
    <ul class="exercises">
      <li
        v-for="exercise in exercises"
        :key="exercise.id"
        class="exercises__item"
        @click="showExercise(exercise)"
      >
        {{ exercise.name }}
        <button
          type="button"
          class="exercises__item-add"
          @click.stop="workoutsStore.addExerciseToWorkout(exercise.id, exercise.name)"
        >+</button>
        <button
          type="button"
          class="favorite-icon"
          v-if="!isCustomExercises"
          @click.stop="toggleToFavoriteExercise(exercise.id)"
        >
          <Icon
            :icon-name="isFavorite(exercise.id) ? 'star-fill' : 'star'"
            width="15px"
          />
        </button>
        <button
          type="button"
          class="favorite-icon"
          v-else
          @click.stop="deleteExercise(exercise.id)"
        >
          <Icon
            icon-name="trash"
            width="15px"
          />
        </button>
      </li>
    </ul>
  </div>
</template>
