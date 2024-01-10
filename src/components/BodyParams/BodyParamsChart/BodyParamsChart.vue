<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { bodyParamsOptions } from '@/chartsconfig/bodyParamsChart.js'
import { bodyParamsStore } from '@/stores/bodyParams.js'

ChartJS.register(Legend, LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

const props = defineProps({
  filter: {
    type: Number,
    default: 0
  }
})

const paramsStore = bodyParamsStore()
const currentDate = dayjs()
const daysCounterByFilter = ref(30)
const numPoints = ref(30) // число точек на графике, для их замены при аггрегации
let datesCollection = []

const fillDateCollection = computed(() => {
  datesCollection = []

  for (let i = 0; i < daysCounterByFilter.value; i++) {
    const date = currentDate.subtract(i, 'day')
    datesCollection.unshift(date.format('DD.MM'))
  }

  return datesCollection
})

const filteredData = computed(() => {
  return paramsStore.filteredParamsByProp?.filter(el => {
    return dayjs(el.date).isAfter(currentDate.subtract(daysCounterByFilter.value, 'days'))
  })
})

const chartData = computed(() => {
  const rawData = filteredData.value.map(el => ({
    x: dayjs(el.date).format('DD.MM'),
    y: el.params[0].value
  }))

  const aggregatedData = paramsStore.aggregateData(rawData, numPoints.value)

  return {
    labels: fillDateCollection.value,
    datasets: [{
      borderColor: '#1a5cff',
      backgroundColor: '#fff',
      data: aggregatedData,
      tension: 0.4
    }]
  }
})

watch(() => props.filter, (val) => {
  const values = [
    { days: 30, points: 30 },
    { days: 90, points: 10 },
    { days: 180, points: 10 },
    { days: 365, points: 5 }
  ]

  daysCounterByFilter.value = values[val].days;
  numPoints.value = values[val].points;
})
</script>

<template>
  <div class="body-params__container">
    <div class="body-params__chart">
      <Loading large v-if="!paramsStore.filteredParamsByProp"/>
      <Line
        v-if="paramsStore.filteredParamsByProp?.length"
        :data="chartData"
        :options="bodyParamsOptions"
      />
    </div>
  </div>
</template>