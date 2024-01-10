import Checkbox from '@/components/UI/Checkbox/Checkbox.vue'
import { describe, expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'

describe('test checkbox', () => {
  test('render with label', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        value: 'checkboxValue',
        label: 'test label',
        modelValue: true
      }
    })

    expect(wrapper.find('label').text()).toBe('test label')
  })

  test('update value by emit', async () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        value: 'checkboxValue',
        modelValue: false,
        label: 'Checkbox Value'
      }
    })

    const checkbox = wrapper.find('.checkbox-component');
    await checkbox.setChecked(true);

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);
  })

  test('render is checked if modelValue is true', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        modelValue: true
      }
    })

    expect(wrapper.find('.checkbox-component').element.checked).toBe(true)
  })
})