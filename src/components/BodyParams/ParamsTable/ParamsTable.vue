<script setup>
import dayjs from 'dayjs'
import { bodyParamsStore } from '@/stores/bodyParams.js'

const paramsStore = bodyParamsStore()
</script>

<template>
  <table class="body-params__table">
    <thead>
    <tr>
      <th>Date</th>
      <th>Value</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="param in paramsStore.calculateTableCellContent"
      :key="param.date"
    >
      <td>{{ dayjs(param.date).format('DD.MM.YYYY') }}</td>
      <td>
        <div class="body-params__table-value">
          {{ param.content }}
          <Icon
            :icon-name="param.sign"
            width="11px"
          />
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>