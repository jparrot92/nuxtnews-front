const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  env: {},
  unauthorized: false,
})

export const mutations = {
  SET_ENV(state, env) {
    state.env = env
  },
  SET_UNAUTHORIZED(state, value) {
    state.unauthorized = value
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server) {
      commit('SET_ENV', {
        API_URL: process.env.API_URL,
        BASE_URL: process.env.BASE_URL,
        APP_NAME: process.env.APP_NAME,
        APP_DESCRIPTION: process.env.APP_DESCRIPTION,
      })
    }
    // eslint-disable-next-line no-console
    console.log('nuxtServerInit')
    let auth = null
    if (req && req.headers) {
      if (req.headers.cookie) {
        try {
          const parsed = cookieparser.parse(req.headers.cookie)
          if (parsed.auth) {
            auth = JSON.parse(parsed.auth)
            commit('authentication/SET_AUTH', auth, { root: true })
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('error')
          // eslint-disable-next-line no-console
          console.log(err)
        }
      }
    }
  },
}
