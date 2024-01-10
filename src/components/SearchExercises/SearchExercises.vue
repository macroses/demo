<script setup>
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import Input from '@/components/UI/Input/Input.vue'
import { exerciseStore } from '@/stores/exercise'

const exercisesStore = exerciseStore()

const isSearchInFocus = ref(false)
const search = ref(null)
const sessionExercises = ref(JSON.parse(localStorage.getItem('exercisesCache')))

const searchResults = ref(null)
const resultList = ref(null)
const debouncedSearch = useDebounceFn(() => {
  if (!search.value) {
    searchResults.value = null
    return
  }

  const query = search.value.toLowerCase()
  searchResults.value = sessionExercises.value.filter(exercise => exercise.name.toLowerCase().includes(query))
}, 100)

const highlightText = text => {
  if (!search.value) return text

  const query = search.value.toLowerCase()
  const regex = new RegExp(query, 'gi')
  return text.replace(regex, '<mark>$&</mark>')
}

const clearSearch = () => {
  search.value = null
  searchResults.value = null
}

watch(search, debouncedSearch)

const showExercise = exercise => {
  exercisesStore.exercise = exercise
  search.value = null
}
</script>

<template>
  <div class="exercises-search">
    <Input
      v-model.trim="search"
      :value="search"
      label-placeholder="Find exercise"
      @clear="clearSearch"
      @focus="isSearchInFocus = true"
    />
    <ul
      ref="resultList"
      v-if="searchResults && isSearchInFocus"
      class="exercises-search__results-list"
    >
      <li
        v-for="exercise in searchResults"
        :key="exercise.id"
        class="exercises-search__results-item"
        @click="showExercise(exercise)"
      >
        <span v-html="highlightText(exercise.name)" />
      </li>
      <li
        v-if="searchResults.length === 0"
        class="exercises-search__empty"
      >
        <img
          src="/glass.svg"
          alt=""
          width="50"
          height="50"
        >
        <span>No results</span>
      </li>
    </ul>
  </div>
</template>

<style src="./style.css" />
