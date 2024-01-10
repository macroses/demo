<script setup>
import programs from '../../content/programs.json'
import { ref } from 'vue'

const emits = defineEmits(['getProgramId'])

const programsList = ref(null)
const activeProgramId = ref(null)

const toggleProgramList = (id) => {
  if (activeProgramId.value === id) {
    activeProgramId.value = null
    return
  }

  activeProgramId.value = id
}

const getProgramId = (program) => emits('getProgramId', program)
</script>

<template>
  <section
    v-for="(category) in programs"
    :key="category.id"
    class="programs"
  >
    <div class="programs__category">
      <h2 class="programs__category-title">{{ category.type }}</h2>
      <Button
        v-if="category.collection.length > 3"
        class="button button--sm programs__showall"
        :class="{ active: activeProgramId === category.id }"
        @click="toggleProgramList(category.id)"
      >
        {{ activeProgramId === category.id ? "Hide" : "Show all" }}
        <Icon width="15px" icon-name="angle-down"/>
      </Button>
    </div>

    <ul
      ref="programsList"
      class="programs-list"
      :class="{ opened: activeProgramId === category.id }"
    >
      <li
        v-for="program in category.collection"
        :key="program.id"
        class="programs-list__item"
        @click="getProgramId(program)"
      >
        <h3 class="programs-list__item-title">{{ program.title }}</h3>
        <p
          v-html="program.shortDescription"
          class="programs-list__item-description"
        />
        <div class="programs-list__item-details">
          <div
            class="programs-list__item-lvl"
            :class="[
              {'programs-list__item-lvl-beginner': program.level === 'beginner'},
              {'programs-list__item-lvl-intermediate': program.level === 'intermediate'},
              {'programs-list__item-lvl-pro': program.level === 'pro'},
            ]"
          >
            {{ program.level }}
          </div>
          <div class="programs-list__item-repeats">
            <Icon width="15px" icon-name="arrows-rotate"/>
            <span>{{ program.perWeek }}</span> per/week
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped src="./style.css" />