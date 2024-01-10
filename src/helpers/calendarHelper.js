import dayjs from 'dayjs'

export const updateCalendar = (currentDate, today, calendarCells) => {
  const todayValue = dayjs()
  const firstDayOfMonth = currentDate.value.startOf('month')
  const firstDayOfWeek = firstDayOfMonth.startOf('week').add(1, 'day')

  calendarCells.value = Array.from({ length: 35 }, (_, index) => {
    const cellDate = firstDayOfWeek.add(index, 'day')
    const formattedDate = dayjs(cellDate)
    const isOtherMonth = !cellDate.isSame(firstDayOfMonth, 'month')
    const isCurrentDay = cellDate.isSame(todayValue, 'day')

    return {
      date: formattedDate,
      isOtherMonth,
      isCurrentDay
    }
  })
}
