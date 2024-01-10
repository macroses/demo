export const bodyParamsOptions = {
  responsive: true,
  maintainAspectRatio: false,
  circular: true,
  scales: {
    x: {
      grid: {
        color: 'rgba(0,0,0, 0.05)'
      },
      ticks: {
        maxTicksLimit: 10,
        beginAtZero: true
      },
      border: {
        dash: [5, 5],
      }
    },
    y: {
      grid: {
        color: 'rgba(0,0,0, 0.05)',
      },
      ticks: {
        stepSize: 10,
        beginAtZero: true,
      },
      border: {
        dash: [5, 5]
      }
    }
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 3
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}