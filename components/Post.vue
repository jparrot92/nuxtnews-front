<template>
  <v-card hover height="100%">
    <v-card-title>
      {{ post.title.rendered }}
    </v-card-title>
    <v-divider />
    <v-card-text
      v-html="isList ? post.excerpt.rendered : post.content.rendered"
    />
    <v-card-actions class="card-actions">
      <v-btn
        color="secondary"
        text
        @click="$router.push(`/posts/${post.id}/editar`)"
        >Editar Post</v-btn
      >
      <v-btn
        v-if="!isDetail"
        color="warning"
        text
        @click="$router.push(`/posts/${post.id}/detalle`)"
        >Detalle Post</v-btn
      >
      <v-btn v-if="!isList" color="primary" text @click="$router.push('/posts')"
        >Volver al listado</v-btn
      >
      <v-btn v-if="!isDetail" color="red" text @click="$emit('delete')"
        >Eliminar Post</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Post',
  props: ['post', 'isList', 'isDetail'],
}
</script>
