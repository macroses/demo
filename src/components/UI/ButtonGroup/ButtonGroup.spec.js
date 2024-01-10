import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonGroup from '@/components/UI/ButtonGroup/ButtonGroup.vue'

describe('test groups', () => {
  test('render buttons bt props', () => {
    const buttons = [
      {id: 1, value: 'button 1'},
      {id: 2, value: 'button 2'},
      {id: 3, value: 'button 3'}
    ]

    const wrapper = mount(ButtonGroup, {
      props: {
        buttons: buttons
      }
    })

    expect(wrapper.findAll('.button-group__item')).toHaveLength(buttons.length)
  })

  test('button from group clicked', async () => {
    const buttons = [
      { id: 1, value: 'button 1' },
      { id: 2, value: 'button 2' },
      { id: 3, value: 'button 3' }
    ]

    const wrapper = mount(ButtonGroup, {
      props: {
        buttons: buttons
      }
    })

    const buttonClick = wrapper.findAll('.button-group__item').at(1)
    await buttonClick.trigger('click')

    expect(wrapper.find('.button-group__item').text()).toBe('button 1')
  })
})