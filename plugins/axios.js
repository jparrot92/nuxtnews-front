export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (
      store.state.authentication.auth &&
      store.state.authentication.auth.token
    ) {
      config.headers.common.Authorization = `Bearer ${store.state.authentication.auth.token}`
    }
  })

  $axios.onError((error) => {
    if (error.response.data.data.status === 401) {
      store.commit('SET_UNAUTHORIZED', true, { root: true })
      setTimeout(() => {
        store.commit('SET_UNAUTHORIZED', false, { root: true })
      }, 2000)
    }
  })
}
