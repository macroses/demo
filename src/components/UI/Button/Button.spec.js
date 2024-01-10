import { mount } from '@vue/test-utils'
import Button from '@/components/UI/Button/Button.vue'
import { expect, test } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/programs' }]
})

test('render button when its not link', () => {
  const wrapper = mount(Button, {
    global: {
      plugins: [router]
    },
    props: {
      isLink: false,
      path: '/programs'
    }
  })

  expect(wrapper.find('button').exists()).toBe(true)
})

test('testing button classes', () => {
  const wrapper = mount(Button, {
    global: {
      plugins: [router]
    },
    props: {
      full: true,
      size: 'large',
      disabled: true,
      bordered: true,
      transparent: true,
      loading: true,
      isLink: false,
      path: '/programs',
      active: true
    }
  })

  const button = wrapper.find('button')

  expect(button.classes()).toContain('button--large')
  expect(button.classes()).toContain('button--disabled')
  expect(button.classes()).toContain('button--bordered')
  expect(button.classes()).toContain('button--transparent')
  expect(button.classes()).toContain('button--loading')
  expect(button.classes()).toContain('active')
})