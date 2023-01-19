<template>
  <v-app id="app">
    <v-app-bar height="70" app clipped-left>
      <router-link to="/">
        <v-img
          :src="require('./assets/icon.png')"
          contain
          class="mx-3"
          max-width="205"
          max-height="60"
        />
      </router-link>

      <v-spacer></v-spacer>

      <v-tooltip transition="scroll-x-reverse-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            color="lime darken-1"
            icon
            v-on="on"
            class="d-none d-sm-flex mx-2"
            to="/"
          >
            <v-icon color="grey darken-3">mdi-home</v-icon></v-btn
          >
        </template>
        <span>Inicio</span>
      </v-tooltip>

      <v-tooltip transition="scroll-x-reverse-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="d-none d-sm-flex mx-2" v-on="on" to="/parque" text tile
            >Parque</v-btn
          >
        </template>
        <span>Conóce sobre nosotros</span>
      </v-tooltip>

      <v-tooltip transition="scroll-x-reverse-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="d-none d-sm-flex mx-2" v-on="on" to="/cursos" text tile
            >Cursos</v-btn
          >
        </template>
        <span>Explora todos los cursos</span>
      </v-tooltip>

      <v-tooltip transition="scroll-x-reverse-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="d-none d-sm-flex mx-2" v-on="on" to="/blog" text tile
            >Blog</v-btn
          >
        </template>
        <span>Posts, articulos y noticias</span>
      </v-tooltip>

      <v-divider class="mx-2" inset vertical></v-divider>
      <v-tooltip
        v-if="!isAuthenticated"
        transition="scroll-x-reverse-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            to="/login"
            v-on="on"
            icon
            class="d-none d-sm-flex"
            color="secondary lighten-2"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <span>Ingreso</span>
      </v-tooltip>
      <v-menu offset-y v-else>
        <template v-slot:activator="{ on }">
          <v-btn outlined tile class="ml-2 d-none d-sm-flex" text v-on="on">
            Usuario
            <v-icon color="green darken-1" right>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item link>
            <v-list-item to="/usuario">Mi perfil</v-list-item>
          </v-list-item>
          <v-list-item link>
            <v-list-item @click="salir">Salir</v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn flat fab small @click.stop="nav = true" class="d-flex d-sm-none">
        <v-icon color="secondary">mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- menu izquierda Nav Actividades -->
    <v-navigation-drawer
      mini-variant-width="58"
      app
      left
      width="300"
      clipped
      inset
      v-model="$store.state.drawer"
      fixed
      v-if="$route.name == 'Actividad'"
      :expand-on-hover="$vuetify.breakpoint.name === 'lg'"
    >
      <v-toolbar flat class="text-center">
        <v-avatar color="amber" size="44">
          <v-icon>mdi-book-information-variant</v-icon>
        </v-avatar>
        <v-toolbar-title class="pl-2">Contenido del curso</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          @click.stop="$store.state.drawer = false"
          icon
          color="amber darken-2"
        >
          <v-icon>mdi-menu-open</v-icon>
        </v-btn>
      </v-toolbar>

      <v-sheet color="grey lighten-4">
        <v-list dense shaped>
          <v-list-item :to="'/cursos/' + $route.params.id">
            <v-list-item-icon class="mr-1">
              <v-icon color="success">mdi-book</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div class="subtitle-2">Descripción del curso</div>
            </v-list-item-content>
          </v-list-item>

          <v-list-group color="blue" v-for="u in unidades" :key="u.id">
            <template v-slot:activator>
              <v-list-item-icon class="mr-2">
                <v-icon color="success">{{
                  "mdi-numeric-" + u.orden + "-circle"
                }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <div class="subtitle-2">
                  {{ u.nombre }}
                </div>
              </v-list-item-content>
            </template>
            <v-list-item
              link
              :to="'/cursos/' + $route.params.id + '/' + a.id"
              v-for="a in actividades(u.id)"
              :key="a.id"
            >
              <v-list-item-icon class="mr-2">
                <v-avatar
                  size="25"
                  color="lime lighten-1"
                  class="caption"
                  v-text="u.orden + '.' + a.orden"
                ></v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ a.nombre }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-sheet>

      <v-fab-transition>
        <v-tooltip
          transition="scroll-x-reverse-transition"
          right
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              @click.stop="$store.state.drawer = false"
              icon
              class="ma-3"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
      </v-fab-transition>
    </v-navigation-drawer>

    <!-- menu derecha Nav para movil -->
    <v-navigation-drawer
      v-model="nav"
      mobile-breakpoint="0"
      temporary
      app
      clipped
      right
    >
      <v-system-bar dark lights-out color="secondary lighten-2">
        <v-icon>mdi-menu</v-icon>
        <v-spacer></v-spacer>
        <v-icon @click="nav = false">mdi-close</v-icon>
      </v-system-bar>
      <v-list>
        <v-list-item two-line to="/">
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
            <v-list-item-subtitle>Eduparque</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item two-line to="/parque">
          <v-list-item-content>
            <v-list-item-title>Parque</v-list-item-title>
            <v-list-item-subtitle>Conóce sobre nosotros</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-library</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item two-line to="/cursos">
          <v-list-item-content>
            <v-list-item-title>Cursos</v-list-item-title>
            <v-list-item-subtitle
              >Explora todos los cursos</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-book</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item two-line to="/blog">
          <v-list-item-content>
            <v-list-item-title>Blog</v-list-item-title>
            <v-list-item-subtitle
              >Posts, articulos y noticias</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <v-divider class="mt-2"></v-divider>
        <v-subheader class="mb-0">Usuario</v-subheader>
        <v-list-item to="/login" v-if="!isAuthenticated">
          <v-list-item-content>
            <v-list-item-title>Ingreso</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item to="/usuario" v-else>
          <v-list-item-content>
            <v-list-item-title>Mi perfil</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-comment-account</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item to="/" @click="salir" v-if="isAuthenticated">
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-progress-linear
        height="6"
        fixed
        :active="loading"
        :indeterminate="loading"
      ></v-progress-linear>
      <v-fab-transition>
        <v-btn
          class="md-5 mb-3 mr-3 elevation-21"
          dark
          fab
          small
          bottom
          right
          color="indigo darken-3"
          fixed
          @click="$vuetify.goTo('#app', options)"
          v-scroll="onScroll"
          v-show="showGoToTop"
          ><v-icon>mdi-arrow-up</v-icon></v-btn
        >
      </v-fab-transition>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>

      <!-- <v-dialog
        v-model="dialog"
        fullscreen
        v-if="isAdmin"
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Datos del Store</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false"> Salir </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel v-for="(item, i) in $store.state" :key="i">
                <v-expansion-panel-header>
                  {{ i }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-if="Object.keys(item).length > 0">
                    <p v-for="(j, k) in item" :key="k">
                      <b>{{ k }}:</b>{{ j }}
                    </p>
                  </div>
                  <p v-else>{{ item }}</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-dialog> -->

      <v-container fluid>
        <v-row class="secondary lighten-4">
          <v-col
            class="text-center body-2 d-flex justify-center align-center pb-1"
          >
            <a class="px-2 grey--text text--darken-4" href="#"
              >Preguntas Frecuentes</a
            >
            <a class="px-2 grey--text text--darken-4" href="#">Contáctanos</a>
            <a class="px-2 grey--text text--darken-4" href="#"
              >Términos y Condiciones</a
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-1 text-center subtitle-1">
            <v-btn icon class="mx-3">
              <v-icon color="blue darken-2">mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon class="mx-3">
              <v-icon color="pink darken-1">mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon class="mx-3">
              <v-icon color="red accent-4">mdi-youtube</v-icon>
            </v-btn>
            <v-divider></v-divider>
            <span>
              Parque Educativo Valle de Las Flores
              <br />
              Municipio de La Ceja Antioquia
            </span>
          </v-col>
          <v-col cols="12" md="5" class="py-1">
            <v-card tile elevation="1">
              <v-img
                contain
                aspect-ratio="6.5"
                gradient="to bottom, rgba(0,0,0,.1), rgba(100,100,100,.5)"
                src="@/assets/logos.jpg"
              >
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer clipped-left app color="grey lighten-2">
      <v-container>
        <v-row>
          <v-col class="py-1 text-center">
            <small
              >Plataforma de Formación Virtual. 2021 Todos los derechos
              reservados.</small
            >
            <span class="float-right caption mr-4"
              ><small>&lt;<u>Tailors.dev</u>/></small></span
            >
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
iframe {
  width: 100%;
  height: 100%;
}

.v-list-item__icon {
  min-width: auto;
  margin-left: 6px;
}

.menu {
  margin-top: 64px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(179, 162, 107);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(102, 84, 27);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(65, 53, 16, 0.9);
}

#app {
  background-color: #f0f0f04d;
  background: radial-gradient(circle at center, #ffffff9b, #afafaf4d);
}

.titulos {
  transition-property: all;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.5);
}
.hover {
  font-size: 1.45em;
}
</style>


<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Eduparque",

  data: () => ({
    nav: false,
    dialog: false,
    offsetTop: 0,
  }),

  created() {
    this.$store.dispatch("start_loading");
  },

  computed: {
    ...mapGetters("usuario", ["isAdmin"]),
    ...mapState({
      loading: (state) => state.loading,
      unidades: (state) => state.unidad.unidades,
      actividad_es: (state) => state.actividad.actividades,
      token: (state) => state.usuario.token,
    }),

    ...mapGetters("usuario", ["isAuthenticated"]),

    showGoToTop() {
      return this.offsetTop > 100;
    },

    options() {
      return { duration: 1000, easing: "easeInOutCubic" };
    },
  },

  methods: {
    actividades(val) {
      const actividades = this.actividad_es || [];
      return actividades.filter((act) => act.id_unidad == val);
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollingElement.scrollTop;
    },
    salir() {
      this.$store.dispatch("usuario/logout");
      this.$router.push("/login");
    },
  },
};
</script>
