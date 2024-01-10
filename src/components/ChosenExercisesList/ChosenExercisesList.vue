<script setup>
import { ref, watch } from 'vue'
import { workoutStore } from '@/stores/workout'
import Icon from '@/components/UI/Icon/Icon.vue'

const store = workoutStore()
const activeExerciseId = ref(null)
const supersetExercises = ref([])

const toggleParameters = id => {
  activeExerciseId.value === id
    ? activeExerciseId.value = null
    : activeExerciseId.value = id

  store.effort = 0
  store.weight = null
  store.repeats = null

  store.openedExerciseId = activeExerciseId.value
}

const handleCheckbox = (exerciseId, isChecked) => {
  store.checkExercisesForSuperset(supersetExercises, exerciseId, isChecked)
}

const handleMerge = () => store.mergeToSuperset(supersetExercises)

const handleSplit = supersetId => store.splitToExercises(supersetId)

watch(() => store.isSuperset, () => activeExerciseId.value = null)
</script>

<template>
  <div
    v-if="store.supersetsArray.length || store.exercisesParamsCollection.length"
    class="chosen-exercises__wrap"
  >
    <div
      v-for="group in store.supersetsArray"
      :key="group.superset"
      class="chosen-exercises__supersets"
      :class="{ 'superset-mode': store.isSuperset }"
    >
      <span class="superset-legend">Superset</span>
      <Button
        v-if="!activeExerciseId"
        transparent
        @click="handleSplit(group.superset)"
        class="btn-split"
      >
        <Icon
          icon-name="split"
          width="20px"
        />
      </Button>
      <ul>
        <li
          v-for="element in group.exercises"
          :key="element.id"
          class="chosen-exercises__item"
        >
          <div
            class="chosen-exercises__item-top"
            :class="{
              active: activeExerciseId === element.id,
              superset: store.isSuperset,
            }"
          >
            <div
              class="chosen-exercises__item-header"
              :class="{ disabledExercise: store.isSuperset }"
              @click="toggleParameters(element.id)"
            >
              <div
                class="collapse__icon"
                v-if="!store.isSuperset"
              />
              <div class="chosen-exercises__item-name">
                <div class="chosen-exercises__item-value">
                  {{ element.name }}
                </div>
              </div>
            </div>
          </div>
          <TransitionSlideY>
            <SetExerciseForm
              v-if="activeExerciseId === element.id"
              :exercise-id="element.id"
            />
          </TransitionSlideY>
        </li>
      </ul>
    </div>

    <div
      v-if="store.filteredCacheExercises.length"
      class="chosen-exercises__filtered"
    >
      <Button
        v-if="store.isSuperset"
        :disabled="supersetExercises.length < 2"
        @click="handleMerge"
        class="btn-merge"
      >
        <Icon
          icon-name="merge"
          width="18px"
        />
      </Button>
      <TransitionGroup
        tag="ul"
        name="fade"
        class="chosen-exercises"
        :class="{ 'superset-mode': store.isSuperset }"
      >
        <li
          v-for="element in store.filteredCacheExercises"
          :key="element.id"
          class="chosen-exercises__item"
          tabindex="0"
        >
          <div
            class="chosen-exercises__item-top"
            :class="{
              active: activeExerciseId === element.id,
              superset: store.isSuperset,
            }"
          >
            <Checkbox
              v-if="store.isSuperset"
              :model-value="supersetExercises.includes(element.id)"
              @update:modelValue="value => handleCheckbox(element.id, value)"
            />
            <div
              class="chosen-exercises__item-header"
              :class="{ disabledExercise: store.isSuperset }"
              @click="toggleParameters(element.id)"
            >
              <div
                class="collapse__icon"
                v-if="!store.isSuperset"
              />
              <div class="chosen-exercises__item-name">
                <div class="chosen-exercises__item-value">
                  {{ element.name }}
                </div>
              </div>
              <div
                v-if="!store.isSuperset"
                class="chosen-exercises__item-tonnage"
              >
                {{ (store.getSetTonnage(element.id) / 1000).toFixed(2) }} T
              </div>
              <button
                v-if="!store.isSuperset"
                @click="store.deleteExercise(element.id)"
                class="chosen-exercises__delete"
              >
                <Icon
                  icon-name="xmark"
                  width="14px"
                />
              </button>
            </div>
          </div>
          <TransitionSlideY>
            <SetExerciseForm
              v-if="activeExerciseId === element.id"
              :exercise-id="element.id"
            />
          </TransitionSlideY>
        </li>
      </TransitionGroup>
    </div>
  </div>

  <div
    v-if="!store.exercisesParamsCollection.length"
    class="chosen-exercises__empty"
  >
    <div class="chosen-exercises__img-wr">
      <img
        src="/Folder.svg"
        alt="add exercises"
        width="80"
        height="100"
      >
    </div>
    <span>To save the workout, add at least one exercise</span>
  </div>
</template>

<style src="./style.css" />
