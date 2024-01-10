import Input from '@/components/UI/Input/Input.vue'
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('Input component', () => {
  test('render correctly', () => {
    const wrapper = mount(Input)
    expect(wrapper.exists()).toBe(true)
  })

  test('emits focus when input is focused', async () => {
    const wrapper = mount(Input)
    const inputElement = wrapper.find('input')
    await inputElement.trigger('focus')

    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  test('clear input value by click button', async () => {
    const wrapper = mount(Input, {
      propsData: {
        modelValue: 'test value'
      }
    })

    const inputElement = wrapper.find('input')
    await inputElement.setValue('test value')

    const clearButton = wrapper.find('button')
    await clearButton.trigger('click')

    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.vm.modelValue).toBe('test value')
  })
})