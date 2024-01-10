import { onMounted, ref } from 'vue'

const toggleColorTheme = () => {
  const userTheme = ref('prefer')

  const getTheme = () => localStorage.getItem('user-theme')

  const setTheme = (theme = 'prefer') => {
    localStorage.setItem('user-theme', theme)
    userTheme.value = theme
    document.documentElement.className = theme
  }

  const getMediaPreference = () => {
    const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (hasDarkPreference) {
      return 'prefer'
    }
  }

  const toggleTheme = theme => setTheme(theme)

  onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference()
    setTheme(initUserTheme)
  })

  return { toggleTheme, userTheme }
}

export { toggleColorTheme }
