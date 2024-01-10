<script setup>
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { onMounted, ref } from 'vue'
import ButtonClose from '@/components/UI/ButtonClose/ButtonClose.vue'
import Button from '@/components/UI/Button/Button.vue'

defineProps({
  width: {
    type: String,
    required: true
  },
  confirmLabel: {
    type: String,
    default: ''
  },
  withoutFooter: {
    type: Boolean,
    default: false
  },
  isConfirmActive: {
    type: Boolean,
    default: true
  }
})

const modalLayer = ref(null)
const modalContent = ref(null)

gsap.registerPlugin(CSSPlugin)

const unmountTimer = () => setTimeout(() => {
  close()
}, 500)

onMounted(() => {
  const t1 = gsap.timeline()
  t1.from(modalLayer.value, { autoAlpha: 0, duration: 0.25 })
  t1.from(modalContent.value, { autoAlpha: 0, scale: 0.8, y: '-100', duration: 0.25, ease: 'power2' })
  t1.play()

  document.body.style.overflow = 'hidden'
})

const animateBeforeClose = () => {
  const t2 = gsap.timeline()
  t2.to(modalContent.value, { autoAlpha: 0, y: '+100', duration: 0.5, ease: 'power2' })
  t2.to(modalLayer.value, { autoAlpha: 0, duration: 0.5 }, 0)
  t2.play()

  unmountTimer()
  clearTimeout(unmountTimer)
}

const emit = defineEmits(['close', 'confirm'])

const close = () => {
  emit('close')
  document.body.style.overflow = 'visible'
}
const confirm = () => {
  animateBeforeClose()
  emit('confirm')
  document.body.style.overflow = 'visible'
}
</script>

<template>
  <Teleport to="body">
    <div class="modal">
      <div
        ref="modalLayer"
        class="modal__layer"
        @click.self="animateBeforeClose"
      />
      <div
        ref="modalContent"
        class="modal__content"
        :style="{ maxWidth: width }"
      >
        <div class="modal__header">
          <ButtonClose @click="animateBeforeClose" />
          <slot name="modal-header" />
        </div>
        <div class="modal__body">
          <slot name="modal-body" />
        </div>
        <div
          v-if="!withoutFooter"
          class="modal__footer"
        >
          <div class="group">
            <slot name="modal-footer" />
            <Button
              v-if="confirmLabel"
              :disabled="!isConfirmActive"
              @click="confirm"
            >
              {{ confirmLabel }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped src="./style.css" />
