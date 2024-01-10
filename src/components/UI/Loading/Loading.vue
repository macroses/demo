<script setup>
import { useParentElement } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const loader = ref(null)
const parent = useParentElement(loader)

onMounted(() => {
  parent.value.style.position = 'relative'
})

defineProps({
  large: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    ref="loader"
    class="loading"
    :class="{ large: large }"
  />
</template>

<style>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: inherit;
  z-index: 10000;
}

.loading::before {
  content: '';
  width: 17px;
  height: 17px;
  position: absolute;
  border: 2px solid hsla(0, 0%, 100%, 0);
  border-left-color: rgb(var(--accent-color));
  border-radius: 50%;
  animation: load 0.6s ease infinite;
}

.loading::after {
  content: '';
  width: 17px;
  height: 17px;
  border: 2px solid rgba(255, 255, 255, 0);
  border-left: dotted rgb(var(--accent-color));
  border-radius: 50%;
  position: absolute;
  animation: load 0.6s linear infinite;
  box-sizing: border-box;
}

.loading.large::before,
.loading.large::after {
  width: 34px;
  height: 34px;
}

@keyframes load {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}
</style>
