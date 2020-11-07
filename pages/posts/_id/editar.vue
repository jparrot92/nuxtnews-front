<template>
  <v-layout>
    <v-card width="100%">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Editar un post</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-card hover height="100%">
              <v-card-title> Formulario de Post </v-card-title>
              <v-divider />
              <v-card-text>
                <post-form
                  :post="post"
                  text-button="Editar Post"
                  @submit="editarPost"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-layout>
</template>

<script>
import PostForm from '../../../components/FormularioPosts'
export default {
  name: 'EditarPost',
  components: { PostForm },
  async asyncData({ store, params }) {
    await store.dispatch('posts/findOne', params.id)
    const post = store.state.posts.post
    return {
      post: {
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
      },
    }
  },
  data: () => {
    return {
      post: {
        title: '',
        content: '',
        status: 'publish',
      },
    }
  },
  methods: {
    async editarPost(post) {
      await this.$store.dispatch('posts/update', post)
      await this.$router.push('/posts')
    },
  },
  head() {
    return {
      title: `Edición de ${this.post.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.content,
        },
      ],
    }
  },
}
</script>
