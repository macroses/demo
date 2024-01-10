<script setup>
import { scrollSlider } from './composable'
</script>

<template>
  <div class="program-description">
    <div class="program-description__wrap">
      <h2 class="program-description__title">
        How it works?
      </h2>
      <Button
        transparent
        size="small"
        class="program-description__slider-left"
        @click="scrollSlider('left')"
      >
        <Icon icon-name="angle-left" width="18px"/>
      </Button>
      <Button
        transparent
        size="small"
        class="program-description__slider-right"
        @click="scrollSlider('right')"
      >
        <Icon icon-name="angle-right" width="18px"/>
      </Button>

      <div class="program-description__slider">
        <div class="program-description__timeline" style="--num-slides: 3"/>
        <div class="program-description__slider-item">
          <h3>Общее</h3>
          1. Добавить день в микроцикл<br>
          2. Заполнить его нужными параметрами <br>
          3. Добавить можно до 7 дней, соответственно количеству дней в неделе <br>
          4. Рекомендуемое количество дней в микроцикле - 3-4
        </div>
        <div class="program-description__slider-item">
          <h3>Рекомендации</h3>
          1. Добавить день в микроцикл <br>
          2. Заполнить его нужными параметрами <br>
          3. Добавить можно до 7 дней, соответственно количеству дней в неделе <br>
          4. Рекомендуемое количество дней в микроцикле - 3-4 <br>
        </div>
        <div class="program-description__slider-item">
          <h3>Третий слайд, для примера</h3>
          1. Добавить день в микроцикл <br>
          2. Заполнить его нужными параметрами <br>
          3. Добавить можно до 7 дней, соответственно количеству дней в неделе <br>
          4. Рекомендуемое количество дней в микроцикле - 3-4
        </div>
      </div>
      <Button @click="$emit('create')">Create program</Button>
    </div>
  </div>
</template>

<style scoped src="./style.css" />