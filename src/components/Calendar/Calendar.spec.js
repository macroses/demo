import { ref } from 'vue'
import { beforeEach, describe, it } from 'vitest'

describe('Calendar.vue', () => {
  let wrapper
  let mockEvent

  beforeEach(() => {
    mockEvent = {
      touches: [{ clientX: 100 }],
      changedTouches: [{ clientX: 200 }]
    }
    ref.mockImplementation((initValue) => {
      return {
        value: initValue
      }
    })
    wrapper = factory({ events: [{ date: new Date(), color: 'red' }] })
  })

  it('goes to next month', () => {
    wrapper.vm.goToNextMonth()
    expect(wrapper.vm.currentDate.value).toBeCalledWith(1, 'month')
    expect(wrapper.vm.transitionName.value).toBe('slideMonthRight')
  })

  it('goes to current month', () => {
    wrapper.vm.goToCurrentMonth()
    expect(wrapper.vm.currentDate.value).toBe(wrapper.vm.today.value)
    expect(wrapper.vm.transitionName.value).toBe('slideMonth')
  })

  it('checks if date has marker', () => {
    const result = wrapper.vm.isMarker(new Date())
    expect(result).toBe(true)
  })

  it('gets cell color', () => {
    const color = wrapper.vm.getCellColor(new Date())
    expect(color).toBe('red')
  })

  it('handles touch start', () => {
    wrapper.vm.handleTouchStart(mockEvent)
    expect(wrapper.vm.touchStartX.value).toBe(100)
  })

  it('handles touch end and goes to previous month', () => {
    wrapper.vm.handleTouchEnd(mockEvent)
    expect(wrapper.vm.touchEndX.value).toBe(200)
    expect(wrapper.vm.goToPreviousMonth).toBeCalled()
    expect(wrapper.vm.transitionName.value).toBe('slideMonthRight')
  })

  it('handles touch end and goes to next month', () => {
    mockEvent.changedTouches[0].clientX = 50
    wrapper.vm.handleTouchEnd(mockEvent)
    expect(wrapper.vm.touchEndX.value).toBe(50)
    expect(wrapper.vm.goToNextMonth).toBeCalled()
    expect(wrapper.vm.transitionName.value).toBe('slideMonth')
  })
})