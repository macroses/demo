import Avatar from '@/components/UI/Avatar/Avatar.vue'
import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '@/components/UI/Icon/Icon.vue'

test('render avatar', async () => {
  const wrapper = mount(Avatar, {
    global: {
      components: {
        Icon: Icon
      }
    }
  })

  const IconComponent = await wrapper.findComponent(Icon)

  expect(IconComponent.props().iconName).toBe('user-alien')
  expect(IconComponent.props().width).toBe('15px')
})