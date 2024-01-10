import { computed, reactive, ref } from 'vue'
import { uid } from 'uid'
import { LOAD, MULTIPLIER } from '@/components/CustomProgram/constants/index.js'

const availableDays = reactive([
  { id: 1, value: 'Monday' },
  { id: 2, value: 'Tuesday' },
  { id: 3, value: 'Wednesday' },
  { id: 4, value: 'Thursday' },
  { id: 5, value: 'Friday' },
  { id: 6, value: 'Saturday' },
  { id: 0, value: 'Sunday' }
])

const createTableRows = () => {
  return reactive({
    id: uid(10),
    load: LOAD[0],
    exercise: '',
    multiplier: MULTIPLIER[0],
    weight: 0,
    reps: 0,
    sets: 1,
    percentOfPM: 0,
    tonnage: function() {
      if (this.multiplier.value === 'x2') {
        return this.weight * this.reps * this.sets * 2 || 0
      }

      return this.weight * this.reps * this.sets || 0
    },
    totalReps: function() {
      return this.reps * this.sets || 0
    },
    time: 0
  })
}


const tables = ref([
  {
    id: uid(10),
    day: availableDays[0].id,
    rows: [createTableRows()]
  }
])

const addRow = (tableIndex) => {
  if (tables.value[tableIndex].rows.length >= 5) return

  tables.value[tableIndex].rows.push(createTableRows())
}

const removeRow = (tableId, rowId) => {
  if (tables.value[tableId].rows.length <= 2) {
    removeDayTable(tableId)

    return
  }

  tables.value[tableId].rows.splice(rowId, 1)
}

const addTable = () => {
  if (tables.value.length >= 7) return

  tables.value.push({
    id: uid(10),
    rows: [createTableRows()],
    day: 0
  })
}

const removeDayTable = (tableId) => {
  tables.value = tables.value.filter(table => table.id !== tableId)
}

const usedDays = computed(() => {
  return tables.value.map((table) => availableDays.find(day => day.id === table.day))
})

const unusedDays = computed(() => {
  const usedDayIds = usedDays.value.map(day => day.id)
  const daysToExclude = tables.value.length === 0 ? [availableDays[0].id] : []
  return availableDays.filter((day) => !usedDayIds.includes(day.id) && !daysToExclude.includes(day.id))
})

const chosenDays = computed(() => {
  return tables.value.map((table) => {
    const selectedDay = availableDays.find(day => day.id === table.day);
    return selectedDay ? selectedDay.value : '';
  });
})

export {
  tables,
  addRow,
  removeRow,
  addTable,
  removeDayTable,
  unusedDays,
  chosenDays,
}
