<template>
  <v-layout>
    <v-card width="100%">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Listado de posts</v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-container fluid>
        <v-row v-if="posts && posts.length" dense>
          <v-col
            v-for="post in posts"
            :key="post.id"
            cols="12"
            sm="12"
            md="6"
            xl="4"
            lg="6"
            class="text-truncate"
          >
            <post
              :key="post.id"
              :is-detail="false"
              :is-list="true"
              :post="post"
              @delete="eliminarPost(post)"
            />
          </v-col>
        </v-row>
        <v-row v-else dense>
          <v-col cols="12">
            <v-alert
              border="bottom"
              color="pink darken-1"
              class="text-center"
              dark
              >No hay posts disponibles</v-alert
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-fab-transition>
      <v-btn
        color="primary"
        dark
        absolute
        bottom
        right
        fab
        @click.native="$router.push('/posts/crear')"
      >
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import Post from '../../components/Post'
export default {
  name: 'Posts',
  components: { Post },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState('posts', ['posts']),
  },
  async asyncData({ store }) {
    try {
      await store.dispatch('posts/fetchAll')
      console.log('async')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async eliminarPost(post) {
      await this.$store.dispatch('posts/delete', post.id)
      await this.$store.dispatch('posts/fetchAll')
    },
  },
  head() {
    return {
      title: 'Posts',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Listado de posts de WordPress',
        },
      ],
    }
  },
}
</script>
