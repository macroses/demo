<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { EFFORTS } from '@/constants/EFFORTS'
import { chartData } from '@/chartsconfig/chartconfig'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  readableEvent: {
    type: Object,
    default: () => {},
    required: true
  }
})

const emit = defineEmits(['toEditPage', 'closeReadModal'])
const mediaQuery = window.matchMedia('(max-width: 768px)')
const isMobile = ref(mediaQuery.matches)

const toEditPage = event => emit('toEditPage', event)
const closeReadModal = () => emit('closeReadModal')

const { workoutData, workoutOptions } = chartData(props.readableEvent, isMobile)

const groupedExercises = computed(() => {
  const groups = {}

  props.readableEvent.exercisesParamsCollection.forEach(exercise => {
    const superset = exercise.superset || 'null'
    if (!groups[superset]) {
      groups[superset] = []
    }

    groups[superset].push(exercise)
  })

  return groups
})

const updateIsMobile = () => {
  isMobile.value = mediaQuery.matches
}

onMounted(() => window.addEventListener('resize', updateIsMobile))
onBeforeUnmount(() => window.removeEventListener('resize', updateIsMobile))
</script>

<template>
  <Modal
    width="500px"
    without-footer
    @close="closeReadModal"
  >
    <template #modal-header>
      <div class="read-event__header">
        <div class="read-event__header-title">
          {{ readableEvent.title }}
        </div>
        <div class="read-event__header-date">
          ({{ readableEvent.date.format('DD.MM.YYYY') }})
        </div>
        <button
          class="read-event__edit"
          @click="toEditPage(readableEvent)"
        >
          <Icon
            icon-name="pen-to-square"
            width="12px"
          />
          edit
        </button>
      </div>
    </template>
    <template #modal-body>
      <div class="read-event__total">
        <Icon
          icon-name="weight-hanging"
          width="13px"
        />
        <span>Total tonnage</span>
        - {{ readableEvent.tonnage / 1000 }} T
      </div>
      <ul
        v-for="(group, superset) in groupedExercises"
        :key="superset"
        :class="{ 'superset-list': superset !== 'null' }"
      >
        <li
          v-for="exercise in group"
          :key="exercise.exerciseId"
        >
          <div class="exercise__title">
            <div class="exercise__title-value">
              {{ exercise.exerciseName }}
            </div>
            <div
              class="exercise__title-weight"
              v-if="!isNaN(exercise.setTonnage)"
            >
              -
              <Icon
                icon-name="weight-hanging"
                width="15px"
              />
            {{ (exercise.setTonnage) / 1000 }} T
            </div>
          </div>
          <div class="read-event__table-parent">
            <div
              v-if="!exercise.sets"
              class="read-event__table-empty"
            >
              <Icon width="13px" icon-name="triangle-exclamation" />
              No data
            </div>
            <table v-else class="read-event__table">
              <thead>
                <tr>
                  <th>Effort</th>
                  <th>Weight</th>
                  <th>Repeats</th>
                  <th>
                    <div class="read-event__rm">
                      1 RM
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="set in exercise.sets"
                  :key="set.setId"
                  class="read-event__list"
                >
                  <td>
                    <div
                      :style="{
                        background: EFFORTS[set.effort].color,
                        color: set.effort === 4 && '#fff',
                      }"
                      class="read-event__effort"
                    >
                      {{ EFFORTS[set.effort].text }}
                    </div>
                  </td>
                  <td>{{ set.weight }}</td>
                  <td>{{ set.repeats }}</td>
                  <td>
                    {{ Math.round(set.weight * (1 + 0.025 * set.repeats)) }} kg
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>

      <div
        class="chart"
        v-if="readableEvent.tonnage"
      >
        <h3>Percentage of total tonnage</h3>
        <div class="chart__parent">
          <Pie
            :data="workoutData"
            :options="workoutOptions"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<style src="./style.css" />
