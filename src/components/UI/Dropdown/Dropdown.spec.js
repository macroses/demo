import Dropdown from '@/components/UI/Dropdown/Dropdown.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('Dropdown', () => {
  test('render is correct', () => {
    const dropdownList = [
      { id: 1, value: 'dropdown item 1' },
      { id: 2, value: 'dropdown item 2' },
      { id: 3, value: 'dropdown item 3' },
    ]

    const wrapper = mount(Dropdown, {
      props: {
        dropdownList: dropdownList
      }
    })

    expect(wrapper.findAll('.dropdown__item')).toHaveLength(dropdownList.length)
  })

  test('click by value', async () => {
    const dropdownList = [
      { id: 1, value: 'dropdown item 1' },
      { id: 2, value: 'dropdown item 2' },
      { id: 3, value: 'dropdown item 3' },
    ]

    const wrapper = mount(Dropdown, {
      props: {
        dropdownList: dropdownList
      }
    })

    const dropdownValue = wrapper.find('.dropdown__value')
    await dropdownValue.trigger('click')

    expect(wrapper.vm.isDropdownOpened).toBe(true)
  })

  test('emits active value when item is selected', async () => {
    const dropdownList = [
      { id: 1, value: 'Item 1' },
      { id: 2, value: 'Item 2' },
      { id: 3, value: 'Item 3' },
    ];

    const wrapper = mount(Dropdown, {
      props: {
        dropdownList: dropdownList,
      }
    })

    const dropdownItem = wrapper.findAll('.dropdown__item').at(1)
    await dropdownItem.trigger('click')

    expect(wrapper.emitted()['activeValue']).toBeTruthy()
    expect(wrapper.emitted()['activeValue'][0]).toEqual([dropdownList[1]])
  })
})