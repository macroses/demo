<script setup>
import { computed, onMounted, readonly, ref } from 'vue'
import { exerciseStore } from '@/stores/exercise'
import SearchExercises from '@/components/SearchExercises/SearchExercises.vue'
import Exercises from '@/components/ExercisesList/Exercises/Exercises.vue'
import MuscleItemHeader from '@/components/ExercisesList/MuscleItemHeader/MuscleItemHeader.vue'
import { updateProfile } from '@/composables/profile'
import { useEventsStore } from '@/stores/userEvents'
import CreateExercise from '@/components/CreateExercise/CreateExercise.vue'
import { userExercisesStore } from '@/stores/userExercises.js'

const exercisesStore = exerciseStore()
const userEvents = useEventsStore()
const userExercises = userExercisesStore()

const activeMuscle = ref(null)
const sessionExercises = ref(JSON.parse(localStorage.getItem('exercisesCache')))
const muscles = ref(null)
const isFavoriteLoading = ref(false)
const activeTabId = ref(0)
let scrollTimeout = null
const isUserExerciseLoading = ref(false)

const uniqueMainMuscles = computed(() => {
  const mainMuscles = new Set(sessionExercises.value.map(exercise => exercise.main_muscle))
  return Array.from(mainMuscles)
})

const filteredExercisesByMuscle = computed(() => uniqueMainMuscles.value.map(muscle => ({
  muscle,
  exercises: sessionExercises.value.filter(exercise => exercise.main_muscle === muscle)
})))

const filteredExercisesByFavorite = computed(() => sessionExercises.value.filter(exercise => userEvents.favoritesFromBase.includes(exercise.id)))

const selectMuscle = async index => {
  activeMuscle.value = activeMuscle.value === index ? null : index

  if (activeMuscle.value !== null) {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      const targetElement = muscles.value.children[index];
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      scrollTimeout = null;
    }, 250)
  }
}

const showExercise = exercise => exercisesStore.exercise = exercise

const getFavoriteId = async id => {
  userEvents.favoritesFromBase.includes(id)
    ? userEvents.favoritesFromBase = userEvents.favoritesFromBase.filter(favoriteId => favoriteId !== id)
    : userEvents.favoritesFromBase.push(id)

  await updateProfile(
    null,
    isFavoriteLoading,
    'favorite_exercises',
    userEvents.favoritesFromBase
  )
}

const tabs = readonly([
  { id: 0, tabTitle: 'All', icon: 'lottie/folder.json', size: 18 },
  { id: 1, tabTitle: 'Favorites', icon: 'lottie/star.json', size: 18 },
  { id: 2, tabTitle: 'Recent', icon: 'lottie/clock.json', size: 18 },
  { id: 3, tabTitle: 'Custom', icon: 'lottie/edit.json', size: 18 }
])

const getActiveTab = id => activeTabId.value = id

const deleteExerciseHandler = async id => {
  await userExercises.deleteExerciseFromBase(id, isUserExerciseLoading)
}

onMounted(async () => {
  await userExercises.fetchExercises()
})
</script>

<template>
  <div class="exercises-list">
    <SearchExercises />
    <Tabs
      :tabs="tabs"
      @activeTab="getActiveTab"
    />
    <Transition mode="out-in">
      <keep-alive>
        <ul
          v-if="activeTabId === 0"
          ref="muscles"
          class="muscles"
        >
          <li
            v-for="(item, index) in filteredExercisesByMuscle"
            :key="item.muscle"
            class="muscles__item"
            :class="{ active: activeMuscle === index }"
          >
            <MuscleItemHeader
              :muscle-item="item"
              @click="selectMuscle(index)"
            />
            <Exercises
              :exercises="item.exercises"
              :favorites="userEvents.favoritesFromBase"
              @showChosenExercises="showExercise"
              @getFavoriteId="getFavoriteId"
            />
          </li>
        </ul>
        <div v-else-if="activeTabId === 1">
          <Exercises
            v-if="filteredExercisesByFavorite.length"
            :exercises="filteredExercisesByFavorite"
            :favorites="userEvents.favoritesFromBase"
            class="active"
            @showChosenExercises="showExercise"
            @getFavoriteId="getFavoriteId"
          />
          <div
            v-else
            class="empty__favorites"
          >
            <img
              src="/Star.webp"
              alt="empty favorites"
              width="170"
              height="93"
            >
            <p>Add a few exercises to favorites</p>
          </div>
        </div>
        <div v-else-if="activeTabId === 3">
          <CreateExercise />

          <Exercises
            v-if="userExercises.exercises.length"
            :exercises="userExercises.exercises"
            class="active"
            isCustomExercises
            @deleteExercise="deleteExerciseHandler"
            @showChosenExercises="showExercise"
          />
        </div>
      </keep-alive>
    </Transition>
  </div>
</template>

<style src="./style.css"></style>
