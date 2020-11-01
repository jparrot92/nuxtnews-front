<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="primary"
      dark
    >
      <v-list>
        <!-- RUTAS PÚBLICAS -->
        <v-list-item
          v-for="nav in publicNavs"
          :key="nav.to"
          :to="nav.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="nav.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <!-- ./RUTAS PÚBLICAS -->

        <!-- LOGIN -->
        <v-list-item v-if="!isLogged" to="/acceso">
          <v-list-item-action>
            <v-icon>fas fa-key</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Acceder'" />
          </v-list-item-content>
        </v-list-item>
        <!-- ./LOGIN -->

        <!-- LOGOUT -->
        <v-list-item v-else @click="logout">
          <v-list-item-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Salir'" />
          </v-list-item-content>
        </v-list-item>
        <!-- ./LOGOUT -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="blue-grey darken-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon
          >fas fa-chevron-{{ `${miniVariant ? 'right' : 'left'}` }}</v-icon
        >
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon
          >fas fa-{{
            `${clipped ? 'hand-point-right' : 'hand-point-left'}`
          }}</v-icon
        >
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>fas fa-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>NuxtNews &copy; 2020</span>
    </v-footer>

    <!-- NO TIENE PERMISOS -->
    <v-snackbar v-model="unauthorized" :timeout="2000">
      No tienes permiso para realizar esa operación
    </v-snackbar>
    <!-- ./NO TIENE PERMISOS -->
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      publicNavs: [
        {
          icon: 'fas fa-home',
          title: 'Inicio',
          to: '/',
        },
        {
          icon: 'fas fa-list',
          title: 'Posts',
          to: '/posts',
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'NuxtNews',
    }
  },
  computed: {
    ...mapGetters('authentication', ['isLogged']),
    ...mapState(['unauthorized']),
  },
  methods: {
    async logout() {
      try {
        const Cookie = process.client ? require('js-cookie') : undefined
        Cookie.set('auth', null)
        this.$store.commit('authentication/SET_AUTH', null)
        await this.$router.push('/acceso')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
