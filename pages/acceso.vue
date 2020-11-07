<template>
  <v-layout>
    <v-card width="100%">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Inicio de sesión</v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-container fluid>
        <v-row align="center">
          <v-col cols="12" lg="7" sm="12" offset-xl="1" xl="5">
            <v-row v-if="!processing" justify="space-around">
              <h2 class="display-3 text-center">Accede ahora a tu cuenta</h2>
            </v-row>
            <v-row v-else justify="space-around">
              <v-progress-circular
                :width="6"
                :size="80"
                color="red"
                indeterminate
              />
            </v-row>
          </v-col>
          <v-col cols="12" lg="4" sm="12" xl="4">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-text-field
                v-model="username"
                :disabled="processing"
                :rules="usernameRules"
                label="Nombre de usuario"
                required
              />

              <v-text-field
                v-model="password"
                :disabled="processing"
                :rules="passwordRules"
                :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                required
                @click:append="showPassword = !showPassword"
              />

              <v-btn
                :disabled="!valid || processing"
                color="primary"
                class="mr-4 mt-4"
                @click="validate"
              >
                Acceder
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'Acceso',
  middleware: 'notAuthenticated',
  data: () => ({
    valid: true,
    processing: false,
    showPassword: false,
    username: 'wordpress',
    usernameRules: [(v) => !!v || 'El nombre de usuario es requerido'],
    password: 'password',
    passwordRules: [
      (v) => !!v || 'La contraseña es requerida',
      (v) =>
        (v && v.length >= 6) ||
        'La contraseña no puede ser menor de 6 caracteres',
    ],
    lazy: false,
  }),
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          this.processing = true
          await this.$store.dispatch('authentication/signIn', {
            username: this.username,
            password: this.password,
          })
          const auth = this.$store.state.authentication.auth
          const Cookie = process.client ? require('js-cookie') : undefined
          Cookie.set('auth', auth)
          await this.$router.push('/posts')
        } catch (e) {
        } finally {
          this.processing = false
        }
      }
    },
  },
  head() {
    return {
      title: 'Iniciar sesión',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Puedes iniciar sesión desde este formulario',
        },
      ],
    }
  },
}
</script>
