<template>
  <v-layout>
    <v-card width="100%">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Crear un post</v-toolbar-title>
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
                  text-button="Crear Post"
                  @submit="crearPost"
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
import PostForm from '../../components/FormularioPosts'
export default {
  name: 'CrearPost',
  components: { PostForm },
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
    async crearPost(post) {
      await this.$store.dispatch('posts/create', post)
      await this.$router.push('/posts')
    },
  },
}
</script>
