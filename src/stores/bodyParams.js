import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getProfileColumn, updateProfile } from '@/composables/profile.js'
import dayjs from 'dayjs'
import { uid } from 'uid'
import { chosenDateStore } from '@/stores/chosenDate.js'

export const bodyParamsStore = defineStore('bodyParams', () => {
  const dateStore = chosenDateStore()

  const bodyParams = ref([])
  const activeBodyField = ref(JSON.parse(localStorage.getItem('bodyParams'))?.[0].id)
  const eventsLoading = ref(false)

  const fetchEventHandler = async () => {
    await getProfileColumn(
      bodyParams,
      eventsLoading,
      'body_params'
    )
  }

  const pushBodyParamsToBase = async (inputValue, activeParam, isLoading) => {
    const existingData = bodyParams.value.find(item => dayjs(item.date).isSame(dateStore.date, 'day'))

    if (existingData) {
      // Дата уже существует в массиве
      const hasExistingParam = existingData.params.some(param => param.label === activeParam.label)

      if (hasExistingParam) {
        // Параметр с таким label уже существует, обновим его значение
        existingData.params.find(param => param.label === activeParam.label).value = inputValue.value
      } else {
        // Параметр с таким label не существует, добавим новый объект параметра
        existingData.params.push({
          label: activeParam.label,
          value: inputValue.value
        })
      }
    } else {
      // Дата не существует в массиве, добавим новый объект данных
      const collectedData = {
        id: uid(15),
        date: dateStore.date,
        params: [{
          label: activeParam.label,
          value: inputValue.value
        }]
      }

      bodyParams.value.push(collectedData)
    }

    await updateProfile(
      null,
      isLoading,
      'body_params',
      bodyParams.value
    )
  }

  const activeParam = computed(() => {
    return JSON.parse(localStorage.getItem('bodyParams')).find(param => param.id === activeBodyField.value)
  })

  const filteredParamsByProp = computed(() => {
    // отфильтровали по типу (вес, рост итд)
    const resultArray = bodyParams.value?.filter(item => {
      return item.params.some(param => param.label === activeParam.value?.label)
    })

    return resultArray?.map(item => ({
      date: item.date,
      params: item.params.filter(param => param.label === activeParam.value?.label)
    }))
      .sort((a, b) => dayjs(b.date) - dayjs(a.date))
  })

  const aggregateData = (data, numPoints) => {
    const aggregatedData = []
    const interval = Math.ceil(data.length / numPoints)

    for (let i = 0; i < numPoints; i++) {
      const startIndex = i * interval
      const endIndex = Math.min((i + 1) * interval, data.length)

      if (startIndex < endIndex) {
        const intervalData = data.slice(startIndex, endIndex);
        const average = intervalData.reduce((sum, item) => sum + item.y, 0) / intervalData.length
        aggregatedData.push({
          x: intervalData[Math.floor(intervalData.length / 2)].x, // серединная дата интервала
          y: average
        })
      }
    }

    return aggregatedData;
  }

  const calculateTableCellContent = computed(() => {
    return filteredParamsByProp.value.map((param, index) => {
      const currentValue = param.params[0].value
      const nextValue = filteredParamsByProp.value[index + 1]?.params[0].value
      const isPositive = currentValue !== undefined && currentValue > (nextValue || 0)
      const isNegative = index !== 0 && currentValue !== undefined && currentValue < (nextValue || 0)
      const sign = isPositive ? 'arrow-up-right' : (isNegative ? 'arrow-down-right' : '')

      return {
        content: currentValue !== undefined ? currentValue : '',
        date: param.date,
        sign: sign
      }
    })
  })

  return {
    bodyParams,
    fetchEventHandler,
    pushBodyParamsToBase,
    activeBodyField,
    activeParam,
    filteredParamsByProp,
    calculateTableCellContent,
    aggregateData
  }
})