<script setup>
import dayjs from 'dayjs'
import { chosenDateStore } from '@/stores/chosenDate'

const dateStore = chosenDateStore()
</script>

<template>
  <div class="group home">
    <Button
      @click="$emit('workoutMode')"
    >
      Workout
    </Button>
    <Button is-link path="/program">Program</Button>
    <Button
      is-link
      :disabled="dateStore.date > dayjs()"
      path="/body-parameters"
    >
      Parameters
    </Button>
  </div>
</template>
