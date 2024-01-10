import { computed } from 'vue'

export const chartData = (propData, isMobile) => {
  const percentageData = computed(() => {
    const percentageData = []
    const totalTonnage = propData.tonnage

    for (const exercise of propData.exercisesParamsCollection) {
      const percentage = (exercise.setTonnage / totalTonnage) * 100
      percentageData.push(Math.round(percentage))
    }

    return percentageData
  })

  const exercises = propData.exercisesParamsCollection.map(exercise => {
    const max_length = 27
    const { exerciseName } = exercise

    if (exerciseName.length > max_length) {
      exercise.exerciseName = `${exerciseName.substring(0, max_length)}...`
    }

    return exercise.exerciseName
  })

  const workoutData = {
    labels: exercises,
    datasets: [
      {
        data: percentageData.value,
        backgroundColor: ['#99ffcc', '#ff99cc', '#ffff9b', '#ffccff', '#ccffcc', '#cc99ff', '#ccff99', '#ccccff', '#ffcc99', '#ccffff', '#ffcccc', '#99ccff']
      }
    ]
  }

  const workoutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile.value ? 'top' : 'left',
        padding: {
          bottom: 60
        },
        labels: {
          boxWidth: 15
        }
      }
    }
  }

  return { workoutData, workoutOptions }
}
