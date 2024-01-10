<script setup>
import { onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { exerciseStore } from '@/stores/exercise'
import BodySvg from '@/components/BodySvg/BodySvg.vue'
import ButtonClose from '@/components/UI/ButtonClose/ButtonClose.vue'
import Button from '@/components/UI/Button/Button.vue'
import { workoutStore } from '@/stores/workout'

gsap.registerPlugin(CSSPlugin)

const store = exerciseStore()
const workoutsStore = workoutStore()
const asideExercise = ref(null)
const asideLayout = ref(null)

const touchStartX = ref(0)
const touchEndX = ref(0)

const addExerciseToWorkout = (exerciseId, exerciseName) => {
  workoutsStore.addExerciseToWorkout(exerciseId, exerciseName)
  closeAside()
}

const handleTouchMove = event => {
  const swipeDistance = event.touches[0].clientX - touchStartX.value;

  if (swipeDistance < 0) {
    gsap.to(asideExercise.value, { x: 0, duration: 0.1, ease: 'none' });
  } else {
    gsap.to(asideExercise.value, { x: swipeDistance, duration: 0.1, ease: 'none' });
  }
}

const handleTouchStart = event => touchStartX.value = event.touches[0].clientX

const handleTouchEnd = event => {
  touchEndX.value = event.changedTouches[0].clientX
  const swipeDistance = touchEndX.value - touchStartX.value

  if (swipeDistance >= 100) {
    closeAside()
  } else {
    gsap.to(asideExercise.value, { x: 0, duration: 0.1, ease: 'none' });
  }
}

const closeAside = () => {
  const t1 = gsap.timeline();
  t1.to(asideExercise.value, { autoAlpha: 0, x: '+350', duration: 0.25, ease: 'sine' });
  t1.to(asideLayout.value, { autoAlpha: 0, duration: 0.25 });
  t1.call(() => (store.exercise = null));
}

onMounted(() => {
  const t1 = gsap.timeline()
  t1.from(asideLayout.value, { autoAlpha: 0, duration: 0.25 })
  t1.from(asideExercise.value, { autoAlpha: 0, x: '+100', duration: 0.25, ease: 'sine' })
  t1.play()
})

onClickOutside(asideExercise, () => closeAside())
</script>

<template>
  <div class="aside-container">
    <div
      ref="asideLayout"
      class="aside-layout"
    />
    <div
      ref="asideExercise"
      class="aside"
      @touchstart.passive="handleTouchStart"
      @touchmove.passive="handleTouchMove"
      @touchend.passive="handleTouchEnd"
    >
      <ButtonClose
        left-position
        @click="closeAside"
      >
        close
      </ButtonClose>
      <Button
        class="button_to-workout"
        @click="addExerciseToWorkout(store.exercise?.id, store.exercise?.name)"
      >
        Add to workout
      </Button>
      <div class="aside__content">
        <div class="exercise-description">
          <div class="title">
            Name
          </div>
          <div class="value">
            {{ store.exercise.name }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Muscle targeted
          </div>
          <div class="value">
            {{ store.exercise.main_muscle }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Other muscles
          </div>
          <div class="value">
            {{ store.exercise.helpers ? store.exercise.helpers.join(', ') : 'Not set' }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            The muscles involved
          </div>
          <div class="body-svg">
            <BodySvg
              :body-part="store.exercise?.main_muscle"
              :secondary-part="store.exercise?.helpers"
            />
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Mechanic type
          </div>
          <div class="value">
            {{ store.exercise.type }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Type
          </div>
          <div class="value">
            {{ store.exercise.load }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Equipment
          </div>
          <div class="value">
            {{ store.exercise.equip }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Force
          </div>
          <div class="value">
            {{ store.exercise.force }}
          </div>
        </div>
        <div class="exercise-description">
          <div class="title">
            Level of proficiency
          </div>
          <div class="value">
            {{ store.exercise.level }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./style.css" />
