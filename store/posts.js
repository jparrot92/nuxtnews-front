export const state = () => ({
  posts: null,
  post: null,
})

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_POST(state, post) {
    state.post = post
  },
}

export const actions = {
  async fetchAll({ commit }) {
    const posts = await this.$axios.$get(
      'wp/v2/posts?_fields=author,id,excerpt,title,slug'
    )
    commit('SET_POSTS', posts)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne({ state, commit }, id) {
    const post = await this.$axios.$get(
      `wp/v2/posts/${id}?_fields=author,id,content,title,slug`
    )
    commit('SET_POST', post)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create({ state }, post) {
    try {
      await this.$axios.$post('wp/v2/posts', post)
    } catch (e) {}
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update({ state }, post) {
    try {
      await this.$axios.$put(`wp/v2/posts/${post.id}`, post)
    } catch (e) {}
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete({ state }, id) {
    try {
      await this.$axios.$delete(`wp/v2/posts/${id}`)
    } catch (e) {}
  },
}
