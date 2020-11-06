<template>
  <tiptap-vuetify
    v-model="editor"
    :extensions="extensions"
    :toolbar-attributes="{ color: 'blue' }"
  />
</template>

<script>
import { TiptapVuetify, Bold, Italic, Strike, Underline } from 'tiptap-vuetify'
export default {
  components: { TiptapVuetify },
  props: ['content'],
  data: () => ({
    editor: '',
    extensions: [Underline, Strike, Italic, Bold],
  }),
  mounted() {
    this.editor = this.$props.content
  },
}
</script>
