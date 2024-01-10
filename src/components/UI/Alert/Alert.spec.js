import Alert from '@/components/UI/Alert/Alert.vue'
import { shallowMount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('render alert sm', () => {
  const wrapper = shallowMount(Alert, {
    props: {
      sm: true
    },
    slots: {
      'alert-header': '<span>Test Alert Header</span>',
    }
  })

  expect(wrapper.find('.alert').classes()).toContain('alert--sm')
})