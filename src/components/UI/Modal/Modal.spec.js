import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '@/components/UI/Modal/Modal.vue'
import Button from '@/components/UI/Button/Button.vue'

describe('Modal', () => {
  test('open and close the modal', async () => {
    const wrapper = mount(Modal, {
      props: {
        width: '400px',
        confirmLabel: '',
        withoutFooter: false
      },
      slots: {
        'modal-header': `<div>Header content</div>`,
        'modal-body': `<div>Body content</div>`,
        'modal-footer': `<div>Footer content</div>`,
      }
    })

    // default close
    expect(wrapper.find('.modal__layer').exists()).toBe(false)

    await wrapper.findComponent(Button).trigger('click')
  })
})