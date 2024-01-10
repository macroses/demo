const userIdFromStorage = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    const regex = /.*-(auth-token)/;
    const result = key.replace(regex, '$1');

    if (result === 'auth-token') {
      const { user } = JSON.parse(localStorage.getItem(key))

      return user.id
    }
  }
}

export { userIdFromStorage }
