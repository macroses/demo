<script setup>
import { onMounted, ref } from 'vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
import BodyParamsChart from '@/components/BodyParams/BodyParamsChart/BodyParamsChart.vue'
import { chosenDateStore } from '../stores/chosenDate.js'
import { FILTER_LIST } from '@/constants/FILTER_LIST.js'
import { bodyParamsStore } from '@/stores/bodyParams.js'
import draggable from 'vuedraggable'
import ParamsTable from '@/components/BodyParams/ParamsTable/ParamsTable.vue'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import { onClickOutside } from '@vueuse/core'
import ButtonGroup from '@/components/UI/ButtonGroup/ButtonGroup.vue'

const paramsStore = bodyParamsStore()
const dateStore = chosenDateStore()

const activeListItem = ref(null)
const isLoading = ref(false)
const inputValue = ref(null)
const filterType = ref(0)
const isCalendarVisible = ref(false)
const draggableList = ref(null)
const paramsLocalStorage = ref(JSON.parse(localStorage.getItem('bodyParams')))
const isAsideVisible = ref(false)
const aside = ref(null)

const blankCanvas = document.createElement('canvas');
blankCanvas.classList.add('pseudo')
blankCanvas.style.opacity = '0';

const setActiveField = id => {
  paramsStore.activeBodyField = id
  isAsideVisible.value = false
  document.body.classList.remove('blured')
}

const submitBodyParams = async () => {
  if (!inputValue.value) {
    toast.error('Field is empty', { position: toast.POSITION.TOP_RIGHT })
    return
  }

  await paramsStore.pushBodyParamsToBase(inputValue, paramsStore.activeParam, isLoading)
  inputValue.value = null

  toast.success('Saved', { position: toast.POSITION.TOP_RIGHT })
}

const getDate = date => {
  dateStore.date = date
  isCalendarVisible.value = false
  toast.info(
    `Selected date is ${dayjs(date).format('DD.MM.YYYY')}`,
    { position: toast.POSITION.TOP_RIGHT }
  )
}

const getFilter = filterId => filterType.value = filterId

onMounted(async () => await paramsStore.fetchEventHandler())

const handleDragEnd = () => {
  localStorage.setItem('bodyParams', JSON.stringify(paramsLocalStorage.value))
  document.querySelector('.pseudo').remove()
}

const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost"
}

const handleDragStart = event => {
  event.dataTransfer.setDragImage(blankCanvas, 0, 0);
  document.body.appendChild(blankCanvas)
}

const toggleAside = () => {
  isAsideVisible.value = true
  document.body.classList.add('blured')
}

onClickOutside(aside, () => {
  isAsideVisible.value = false
  document.body.classList.remove('blured')
})
</script>

<template>
  <div class="container">
    <div
      class="body-params"
      :class="{ blured: isAsideVisible }"
    >
      <div
        ref="aside"
        class="body-params__aside"
        :class="{ active: isAsideVisible }"
      >
        <div class="body-params__aside-wrap">
          <draggable
            v-model="paramsLocalStorage"
            tag="ul"
            ref="draggableList"
            class="body-params__aside-list"
            handle=".handle-move"
            :item-key="item => item.id"
            v-bind="dragOptions"
            @end="handleDragEnd"
          >
            <template #item="{ element }">
              <li
                ref="activeListItem"
                class="body-params__aside-item"
                :class="{ active: element.id === paramsStore.activeParam.id }"
                @click="setActiveField(element.id)"
                draggable="true"
                @dragstart="handleDragStart"
              >
                <button class="body-params__aside-button">
                  {{ element.label }}
                </button>
                <div class="handle-move">
                  <Icon
                    icon-name="grip-dots-vertical"
                    width="15px"
                  />
                </div>
              </li>
            </template>
          </draggable>
        </div>
      </div>
      <div class="body-params__content">
        <div class="body-params__calendar">
          <div
            class="calendar-wr"
            :class="{ hidden: !isCalendarVisible }"
          >
            <Calendar
              @get-date="getDate"
              is-after-days-off
            />
            <div
              v-if="!isCalendarVisible"
              class="calendar-chosen-date"
            >
              {{ dateStore.date.format('DD MMMM YYYY') }}
            </div>
            <Button
              class="hide-calendar__button"
              :class="{ active: isCalendarVisible }"
              @click="isCalendarVisible = !isCalendarVisible"
            >
              <Icon
                width="20px"
                :icon-name="isCalendarVisible ? 'calendar-arrow-up' : 'calendar-arrow-down'"
              />
            </Button>
          </div>
        </div>
        <div class="body-params__top">
          <Button @click="toggleAside">
            <Icon icon-name="bars" width="15px"/>
          </Button>
          <h1 class="body-params__header">
            {{ paramsStore.activeParam.label }}
          </h1>
        </div>
        <form
          class="body-params__form"
          @submit.prevent="submitBodyParams"
        >
          <Input
            :model-value="inputValue"
            mode="decimal"
            :label-placeholder="paramsStore.activeParam.unit"
            @clear="inputValue = null"
            @keydown="useOnlyNumbers($event)"
          />
          <Button>Submit</Button>
        </form>

        <div
          v-if="paramsStore.filteredParamsByProp.length"
          class="body-params__content-wrap">
          <div class="button-group body-params__content-group">
            <ButtonGroup
              :buttons="FILTER_LIST"
              @getButton="getFilter"
            />
          </div>
          <div class="body-params__last-data">
            <div class="body-params__last-content">
              {{ paramsStore.calculateTableCellContent[0].content }}
              <span class="body-params__last-unit">{{ paramsStore.activeParam.unit }}</span>
            </div>
            <div class="body-params__last-date">
              {{ dayjs(paramsStore.calculateTableCellContent[0].date).format('dddd DD.MM.YYYY') }}
            </div>
          </div>
          <div class="body-params__data">
            <div class="body-params__table-parent">
              <ParamsTable />
            </div>
          </div>
          <BodyParamsChart
            :filter="filterType"
          />
        </div>
        <div v-else class="body-params__empty">
          <Vue3Lottie
            animation-link="lottie/box.json"
            :height="300"
          />
          No data, add something to start
        </div>
      </div>
    </div>
  </div>
</template>
