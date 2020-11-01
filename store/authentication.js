export const state = () => ({
  auth: null,
})

export const mutations = {
  SET_AUTH(state, auth) {
    state.auth = auth
  },
}

export const actions = {
  async signIn({ commit }, credentials) {
    const auth = await this.$axios.$post('jwt-auth/v1/token', credentials)
    commit('SET_AUTH', auth)
  },
}

export const getters = {
  isLogged(state) {
    return state.auth && !!state.auth.token
  },
}
