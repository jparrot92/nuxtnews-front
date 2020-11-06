<template>
  <v-form ref="form" lazy-validation>
    <v-text-field v-model="post.title" label="Título" required />

    <Editor ref="editor" :content="post.content" />

    <v-btn
      color="success"
      class="mt-3"
      @click="
        $emit('submit', {
          id: post.id,
          title: post.title,
          content: $refs.editor.editor,
          status: post.status,
        })
      "
    >
      {{ textButton }}
    </v-btn>
  </v-form>
</template>

<script>
import Editor from './Editor'
export default {
  name: 'FormularioPosts',
  components: { Editor },
  props: ['post', 'textButton'],
}
</script>
