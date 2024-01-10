import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProfileColumn, updateProfile } from '@/composables/profile.js'

export const userExercisesStore = defineStore('userExercises', () => {
  const exercises = ref([])
  const exercisesLoading = ref(false)

  const fetchExercises = async () => {
    await getProfileColumn(
      exercises,
      exercisesLoading,
      'user_exercises'
    )

    let exerciseCache = JSON.parse(localStorage.getItem('exercisesCache')) || []

    exercises.value.forEach(exercise => {
      // if exercise is not in cache, push it
      if (!exerciseCache.some(cachedExercise => cachedExercise.id === exercise.id)) {
        exerciseCache.push(exercise)
      }
    })

    localStorage.setItem('exercisesCache', JSON.stringify(exerciseCache))
  }

  const pushExerciseToBase = async (isLoading, exercise) => {
    const newExerciseData = {
      id: exercise.id,
      name: exercise.name,
      helpers: exercise.helpers.map(item => item.value),
      main_muscle: exercise.main_muscle.reduce((_, item) => item.value, ''),
      type: exercise.type,
      equip: exercise.equip,
      load_type: exercise.load_type,
      level: exercise.level,
      description: exercise.description,
      force_type: exercise.force_type
    }

    exercises.value.push(newExerciseData)

    await updateProfile(
      null,
      isLoading,
      'user_exercises',
      exercises.value
    )
  }

  const deleteExerciseFromBase = async (exerciseId, isLoading) => {
    exercises.value = exercises.value.filter(exercise => exercise.id !== exerciseId)

    let exerciseCache = JSON.parse(localStorage.getItem('exercisesCache')) || []
    exerciseCache = exerciseCache.filter(cachedExercise => cachedExercise.id !== exerciseId)
    localStorage.setItem('exercisesCache', JSON.stringify(exerciseCache))

    await updateProfile(
      null,
      isLoading,
      'user_exercises',
      exercises.value
    )
  }

  return {
    exercises,
    fetchExercises,
    pushExerciseToBase,
    deleteExerciseFromBase
  }
})