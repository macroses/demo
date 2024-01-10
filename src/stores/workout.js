import { defineStore } from 'pinia'
import { uid } from 'uid'

export const workoutStore = defineStore({
  id: 'workout',
  state: () => ({
    workoutId: localStorage.getItem('wId') || null,
    openedExerciseId: null,
    isWorkoutEdit: false,
    isSuperset: false,
    title: null,
    color: '213, 0, 0',
    weight: null,
    repeats: null,
    effort: 0,
    tonnage: 0,
    exercisesParamsCollection: [],
    previousResults: []
  }),
  actions: {
    addExerciseToWorkout(exerciseId, exerciseName) {
      if (!this.exercisesParamsCollection.some(e => e.exerciseId === exerciseId)) {
        this.exercisesParamsCollection.push({
          exerciseId,
          exerciseName
        })
      }
    },
    deleteExercise(id) {
      const index = this.exercisesParamsCollection.findIndex(item => item.exerciseId === id);

      if (index !== -1) {
        this.exercisesParamsCollection.splice(index, 1)

        this.updateTonnage()
      }
    },
    addSet(exerciseId) {
      const set = {
        setId: uid(10),
        weight: this.weight || 0,
        repeats: this.repeats || 0,
        effort: this.effort
      }

      const exerciseParams = this.exercisesParamsCollection.find(item => item.exerciseId === exerciseId)

      if (!exerciseParams.sets) {
        exerciseParams.sets = [set]
        exerciseParams.setTonnage = set.weight * set.repeats
      } else {
        exerciseParams.sets.push(set);
        exerciseParams.setTonnage += set.weight * set.repeats;
      }

      this.updateTonnage()
    },
    deleteSet(setId) {
      const exerciseParams = this.exercisesParamsCollection.find(item => item.exerciseId === this.openedExerciseId);
      if (exerciseParams) {
        exerciseParams.sets = exerciseParams.sets.filter(set => set.setId !== setId);

        const tonnage = exerciseParams.sets.reduce((acc, curSet) => acc + (curSet.weight * curSet.repeats), 0);
        exerciseParams.setTonnage = tonnage;
      }

      this.updateTonnage()
    },
    editUsersEvent(event) {
      this.isWorkoutEdit = true

      this.workoutId = event.workoutId
      this.title = event.title
      this.color = event.color
      this.tonnage = event.tonnage
      this.exercisesParamsCollection = event.exercisesParamsCollection
    },
    getSetTonnage(id) {
      const exercise = this.exercisesParamsCollection.find(item => item.exerciseId === id);
      return exercise.setTonnage ? exercise.setTonnage : 0;
    },
    updateTonnage() {
      const sumTonnage = this.exercisesParamsCollection.reduce((acc, exerciseParams) => acc + (exerciseParams.setTonnage || 0), 0);

      this.tonnage = sumTonnage
    },
    mergeToSuperset(supersetsIdArray) {
      if (supersetsIdArray.value.length < 2) return

      const uidValue = uid(7)

      this.exercisesParamsCollection.forEach(exercise => {
        if (supersetsIdArray.value.includes(exercise.exerciseId)) {
          exercise.superset = uidValue;
        }
      })

      supersetsIdArray.value = []
      this.isSuperset = false
    },
    splitToExercises(supersetId) {
      const exercisesToUpdate = this.exercisesParamsCollection.filter(exercise => exercise.superset === supersetId)

      exercisesToUpdate.forEach(exercise => {
        delete exercise.superset
      })
    },
    checkExercisesForSuperset(supersetIdCollection, exerciseId, isChecked) {
      if (isChecked) {
        if (!supersetIdCollection.value.some(ex => ex.id === exerciseId)) {
          supersetIdCollection.value.push(exerciseId)
        }
      } else {
        supersetIdCollection.value = supersetIdCollection.value.filter(exId => exId !== exerciseId)
      }
    }
  },

  getters: {
    supersetsArray() {
      const exercises = JSON.parse(JSON.stringify(this.exercisesParamsCollection))
      const cache = JSON.parse(localStorage.getItem('exercisesCache'))

      return exercises.reduce((supersetGroups, exercise) => {
        const { superset } = exercise
        if (superset) {
          const cachedExercise = cache.find(sessionExercise => sessionExercise.id === exercise.exerciseId)

          if (cachedExercise) {
            const cachedExerciseCopy = { ...cachedExercise, superset }
            const groupIndex = supersetGroups.findIndex(group => group.superset === superset)

            groupIndex !== -1
              ? supersetGroups[groupIndex].exercises.push(cachedExerciseCopy)
              : supersetGroups.push({ superset, exercises: [cachedExerciseCopy] })
          }
        }

        return supersetGroups
      }, [])
    },
    filteredCacheExercises() {
      return JSON.parse(localStorage.getItem('exercisesCache')).filter(sessionExercise => this.exercisesParamsCollection.some(exercise => (sessionExercise.id === exercise.exerciseId) && !exercise.hasOwnProperty('superset')))
    }
  }
})
