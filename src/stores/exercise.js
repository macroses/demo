import { defineStore } from 'pinia'

export const exerciseStore = defineStore({
  id: 'exercise',
  state: () => ({
    exercise: null
  })
})
