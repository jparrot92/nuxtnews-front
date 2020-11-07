<template>
  <v-layout>
    <v-card width="100%">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Detalle de un Post</v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-container v-if="post" fluid>
        <v-row dense>
          <v-col cols="12">
            <post :is-detail="true" :is-list="false" :post="post" />
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
import Post from '../../../components/Post'
export default {
  name: 'DetallePost',
  components: { Post },
  computed: {
    ...mapState('posts', ['post']),
  },
  async asyncData({ store, params }) {
    try {
      await store.dispatch('posts/findOne', params.id)
    } catch (e) {}
  },
  head() {
    return {
      title: `Detalle de ${this.post.title.rendered}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.content.rendered,
        },
      ],
    }
  },
}
</script>
