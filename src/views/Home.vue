<script setup>
import { computed, ref } from 'vue'
import { uid } from 'uid'
import { workoutStore } from '@/stores/workout'
import router from '@/router'
import Loading from '@/components/UI/Loading/Loading.vue'
import { chosenDateStore } from '@/stores/chosenDate'
import { useEventsStore } from '@/stores/userEvents'
import EventsList from '@/components/EventsList/EventsList.vue'
import EventsMode from '@/components/EventsMode/EventsMode.vue'
import Button from '@/components/UI/Button/Button.vue'

const workoutsStore = workoutStore()
const dateStore = chosenDateStore()
const userEvents = useEventsStore()

const workoutId = ref(uid(50))

const getDate = date => {
  if (userEvents.isCopyMode) {
    dateStore.copyDate = date
    return
  }

  dateStore.date = date
}

const filteredEvents = computed(() => userEvents.events.filter(event => {
  const eventDate = event.date.format('YYYY-MM-DD')
  return eventDate === dateStore.date.format('YYYY-MM-DD')
}))

const toWorkoutMode = () => {
  workoutsStore.workoutId = workoutId.value
  router.push('/workout')
  localStorage.setItem('wId', workoutId.value)
}

const deleteHandler = workoutId => {
  userEvents.deleteEventHandler(
    'workouts',
    'workoutId',
    workoutId
  )
}
</script>

<template>
  <main>
    <div class="container">
      <Loading
        v-if="userEvents.eventsLoading"
        large
      />
      <div class="main__layout">
        <div class="main__layout-left">
          <Calendar
            @get-date="getDate"
            :events="userEvents.events"
          />
          <EventsMode
            v-if="!userEvents.isCopyMode"
            @workoutMode="toWorkoutMode"
          />
          <div
            v-else
            class="group"
          >
            <Button @click="userEvents.isCopyMode = false">
              Cancel copying
            </Button>
          </div>
          <p
            v-if="userEvents.isCopyMode"
            class="copy-message"
          >
            Please select a date for copying
          </p>
          <EventsList
            v-if="!userEvents.isCopyMode"
            :events="filteredEvents"
            @deleteEvent="deleteHandler"
          />
        </div>
      </div>
    </div>
  </main>
</template>
