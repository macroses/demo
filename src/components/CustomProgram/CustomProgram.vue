<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { HEADERS, LOAD, MULTIPLIER } from '@/components/CustomProgram/constants'
import {
  addRow,
  addTable,
  chosenDays,
  removeDayTable,
  removeRow,
  tables,
  unusedDays
} from '@/components/CustomProgram/composable'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
import { gsap } from 'gsap'
import CustomProgramDescription from '@/components/CustomProgram/CustomProgramDescription/CustomProgramDescription.vue'

const isDescriptionVisible = ref(true)
const tableRow = ref(null)
const editingCellIndex = ref(null)

const startEditing = (event, row, columnIndex) => {
  row.editing = true
  editingCellIndex.value = columnIndex

  nextTick(() => {
    const inputElement = event.currentTarget.querySelector(`div:nth-child(${columnIndex + 1}) input`)
    if (inputElement) {
      inputElement.focus()
    }
  })
}

const stopEditing = (row) => {
  row.editing = false
  editingCellIndex.value = null
}

const onBeforeEnter = (el) => {
  el.style.opacity = 0
  el.style.height = 0
}

const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 0.2,
    opacity: 1,
    height: 'auto',
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.2,
    opacity: 0,
    height: 0,
    onComplete: done
  })
}

const hideProgramDescription = () => {
  localStorage.setItem('program-description', false)
  isDescriptionVisible.value = false
}

const showProgramDescription = () => {
  localStorage.setItem('program-description', true)
  isDescriptionVisible.value = true
}

const updateDay = (tableIndex, selectedDay) => {
  tables.value[tableIndex].day = selectedDay.id;
}

onMounted(() => {
  const descriptionValue = localStorage.getItem('program-description');
  isDescriptionVisible.value = descriptionValue !== 'false';

  if (!descriptionValue) {
    localStorage.setItem('program-description', true);
  }
})
</script>

<template>
  <section class="custom-program">
    <CustomProgramDescription
      v-if="isDescriptionVisible"
      @create="hideProgramDescription"
    />
    <div
      v-else
      class="custom-program__micro"
    >
      <div class="custom-program__micro-top">
        <h1 class="custom-program__micro-header">
          Creating a microcycle
          <Button
            transparent
            size="small"
            @click="showProgramDescription"
          >
            <Icon
              icon-name="circle-question"
              width="20px"
            />
          </Button>
        </h1>
        <div class="custom-program__micro-funcs">

          <div class="group">
            <Button
              size="small"
              @click="addTable"
              :disabled="tables.length >= 7"
            >
              Add new day of microcycle
            </Button>
            <Button
              bordered
              size="small"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div
        v-for="(table, tableIndex) in tables"
        :key="table.id"
        class="custom-program__table-wrap"
      >
        <div class="custom-program__table">
          <div class="custom-program__table-head">
            <div
              v-for="(header, headerIndex) in HEADERS"
              :key="headerIndex"
              class="custom-program__head"
              :style="{ width: header?.width }"
            >
              {{ header.value }}
            </div>
          </div>
          <TransitionGroup
            tag="div"
            :css="false"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
            class="custom-program__table-body"
          >
            <div
              v-for="(row, rowIndex) in table.rows"
              :key="row.id"
              :ref="`tableRow_${tableIndex}_${rowIndex}`"
              class="custom-program__body-row"
            >
              <div
                class="custom-program__cell"
                tabindex="1"
              >
                <Dropdown
                  :dropdown-list="LOAD"
                  :width="60"
                  small
                  @active-value="row.load = $event"
                />
              </div>
              <div
                tabindex="1"
                class="custom-program__cell"
                @click="startEditing($event, row, 1)"
              >
                <div
                  v-if="!row.editing || editingCellIndex !== 1"
                  class="custom-program__cell-value"
                >
                  {{ row.exercise }}
                </div>
                <Input
                  v-else
                  v-model="row.exercise"
                  small
                  no-clear
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </div>
              <div class="custom-program__cell">
                <Dropdown
                  :dropdown-list="MULTIPLIER"
                  :width="50"
                  small
                  @active-value="row.multiplier = $event"
                />
              </div>
              <div
                class="custom-program__cell"
                @click="startEditing($event, row, 3)"
              >
                <div
                  class="custom-program__cell-value"
                  v-if="!row.editing || editingCellIndex !== 3"
                >
                  {{ row.weight }}
                </div>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.weight"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </div>
              <div
                class="custom-program__cell"
                @click="startEditing($event, row, 4)"
              >
                <div
                  class="custom-program__cell-value"
                  v-if="!row.editing || editingCellIndex !== 4"
                >
                  {{ row.reps }}
                </div>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.reps"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </div>
              <div
                class="custom-program__cell"
                @click="startEditing($event, row, 5)"
              >
                <div
                  v-if="!row.editing || editingCellIndex !== 5"
                  class="custom-program__cell-value"
                >
                  {{ row.sets }}
                </div>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.sets"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </div>
              <div
                class="custom-program__cell"
                @click="startEditing($event, row, 6)"
              >
                <div
                  v-if="!row.editing || editingCellIndex !== 6"
                  class="custom-program__cell-value"
                >
                  {{ row.percentOfPM }}
                </div>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.percentOfPM"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </div>
              <div
                class="custom-program__cell"
                @click="startEditing($event, row, 7)"
              >
                <div
                  v-if="!row.editing || editingCellIndex !== 7"
                  class="custom-program__cell-value"
                >
                  {{ row.time }}
                </div>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.time"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </div>
              <div
                class="custom-program__cell"
                style="width: 100px"
              >
                {{  row.tonnage() }}
              </div>
              <div
                class="custom-program__cell"
                style="width: 100px"
              >
                {{  row.totalReps() }}
              </div>
              <div
                class="custom-program__cell"
                style="width: 30px"
              >
                <Button
                  @click="removeRow(tableIndex, rowIndex)"
                  transparent
                  size="small"
                >
                  <Icon
                    icon-name="trash"
                    width="13px"
                  />
                </Button>
              </div>
            </div>
          </TransitionGroup>
        </div>
        <div class="custom-program__table-footer">
          <div class="custom-program__choose-day">
            <Dropdown
              :dropdown-list="unusedDays"
              :width="120"
              small
              isTop
              default-value="Choose day"
              @activeValue="updateDay(tableIndex, $event)"
            />
            <span>Chosen day: {{ chosenDays[tableIndex] }}</span>
          </div>
          <div class="group">
            <Button
              @click="addRow(tableIndex, tableRow)"
              :disabled="table.rows.length >= 5"
              size="small"
            >
              Add exercise
            </Button>
            <Button
              bordered
              @click="removeDayTable(table.id)"
              size="small"
            >
              Delete day
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./style.css" />