import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'

export const chosenDateStore = defineStore('chosenDate', () => {
  const date = ref(dayjs())
  const copyDate = ref(null)
  const rescheduleCounter = ref(0)

  const rescheduledEventDate = computed(() => date.value.add(rescheduleCounter.value, 'day'))

  watch(rescheduleCounter, val => {
    if (val > 30) rescheduleCounter.value = 30
    if (val < -30) rescheduleCounter.value = -30
  })

  return {
    date,
    copyDate,
    rescheduleCounter,
    rescheduledEventDate
  }
})
