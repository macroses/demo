<script setup>
import { EFFORTS } from '@/constants/EFFORTS'
import { workoutStore } from '@/stores/workout'
import { useEventsStore } from '@/stores/userEvents'

const store = workoutStore()
const eventsStore = useEventsStore()

const getEffortColor = effort => EFFORTS.filter(el => el.id === effort).map(item => item.color)

const deleteSetHandler = setId => store.deleteSet(setId)

const isPositive = num => ({
  color: num > 0 ? 'green' : num < 0 ? 'red' : 'rgb(191 196 203)',
  sign: num > 0 ? '+' : ''
})
</script>

<template>
  <div>
    <div
      v-if="eventsStore.combinedResults.length"
      class="table-parent"
    >
      <table>
        <thead v-once>
          <tr>
            <td />
            <td />
            <td>Weight</td>
            <td>Repeats</td>
            <td />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="result in eventsStore.combinedResults"
            :key="result.setId"
          >
            <td
              style="width: 15px"
              :style="[
                getEffortColor(result.effort).length
                  ? `background: ${getEffortColor(result.effort)}`
                  : `background: ${getEffortColor(result.prevEffort)}; opacity: 0.5`,
              ]"
            />
            <td
              style="width: 8px"
              :style="{
                background: getEffortColor(result.prevEffort),
                opacity: 0.5,
                borderLeft: '1px solid rgb(var(--text-color) / 0.2)',
              }"
            />

            <td>
              {{ result.weight }}
              <span
                v-if="!result.weight"
                class="prev-result"
              >{{ result.prevWeight }}</span>
              <span
                v-if="result.prevWeight && result.weight"
                class="prev-result__grow"
                :style="{ color: isPositive(result.weight - result.prevWeight).color }"
              >
                <span
                  v-if="result.weight - result.prevWeight !== 0"
                  class="sign"
                >
                  {{ isPositive(result.weight - result.prevWeight).sign }}
                </span>
                {{ result.weight - result.prevWeight }}
              </span>
            </td>

            <td>
              {{ result.repeats }}
              <span
                v-if="!result.repeats"
                class="prev-result"
              >{{ result.prevRepeats }}</span>
              <span
                v-if="result.prevRepeats && result.repeats"
                class="prev-result__grow"
                :style="{ color: isPositive(result.repeats - result.prevRepeats).color }"
              >
                <span
                  v-if="result.repeats - result.prevRepeats !== 0"
                  class="sign"
                >
                  {{ isPositive(result.repeats - result.prevRepeats).sign }}
                </span>
                {{ result.repeats - result.prevRepeats }}
              </span>
            </td>

            <td v-if="result.setId !== null">
              <button
                class="chosen-exercises__delete"
                @click="deleteSetHandler(result.setId)"
              >
                <Icon
                  icon-name="xmark"
                  width="14px"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
