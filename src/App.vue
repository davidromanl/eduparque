<template>
  <v-app id="app">
    <v-app-bar app clipped-left>
      <a href="#/">
        <v-img
            :src="require('./assets/icon.png')"
            contain
            class="mx-3"
            max-width="205"
            max-height="60"
          />
      </a>
      
      <v-spacer></v-spacer>
      <v-btn outlined class="mx-2" to="/" text>Inicio</v-btn>
      <v-btn outlined class="mx-2" to="/cursos" text>Cursos</v-btn>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="ml-2" text v-on="on">
            Usuario
            <v-icon right>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item link>
            <v-list-item>Mis cursos</v-list-item>
          </v-list-item>
          <v-list-item link>
            <v-list-item>Mi perfil</v-list-item>
          </v-list-item>
          <v-list-item link>
            <v-list-item to="/login">Salir</v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
      
    </v-app-bar>

    <v-navigation-drawer
        :class="{menu: temp}"
        app left clipped
        :temporary.sync="temp"
        :permanent.sync="perm"
        v-model="$store.state.drawer"
        :mini-variant.sync="$store.state.mini"
        v-if="$route.name == 'Actividad'"
        >

      <v-toolbar dense flat>
        <v-btn icon color="amber darken-2"
          @click.stop="$store.state.mini = !$store.state.mini">
          <v-icon>mdi-arrow-{{($store.state.mini)?'right':'left'}}</v-icon>
        </v-btn>
        <h3>Contenido</h3>
        <v-spacer></v-spacer>
        <v-btn
          @click.stop="$store.state.drawer = false"
          icon color="amber darken-2">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

       <v-sheet
        color="grey lighten-4"
        width="256px"
      >
          
      <v-list dense shaped>
        <v-list-item to="/">
          <v-list-item-icon>
              <v-icon color="success">mdi-check-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/curso/23">
          <v-list-item-icon>
              <v-icon>mdi-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cursos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group color="blue"
            v-for="n in 4"
            :key="n">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-arrow-right</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <strong>Nivel {{n}}</strong>
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link
              :to="'/curso/'+2*a"
              v-for="a in 4"
              :key="a">
            <v-list-item-icon>
              <v-icon>mdi-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Actividad {{a}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      
      </v-sheet>
      
      <v-fab-transition>
        <v-btn
          @click.stop="$store.state.drawer = false"
          icon class="ma-3"
          v-if="$store.state.mini">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-fab-transition>

    </v-navigation-drawer>

    <v-main>
      <v-progress-linear
        height="6" fixed
        :active="loading"
        :indeterminate="loading"
        ></v-progress-linear>
      <v-fade-transition>
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
    
    <v-footer
      color="grey lighten-2">
      <v-container>
        <v-row>
          <v-col class="py-1">
            Parque Educativo Valle de Las Flores
          </v-col>
          <v-col class="py-1">
            Municipio de La Ceja Antioquia.
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <small>Plataforma de Formación Virtual. 2021 Todos los derechos reservados.</small>
            <div class="float-right"><small><u>Tailors.dev</u></small></div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style lang="scss">

iframe {
  width: 100%;
}
.menu {
  margin-top: 57px;
}
</style>


<script>
  import axios from "axios"

  export default {
    name: 'HelloWorld',

    data: () => ({

    }),
    
    created() {
      axios.interceptors.request.use((config) => {
        this.$store.commit('loading', true);
        return config;
      }, (error) => {
        this.$store.commit('loading', false);
        return Promise.reject(error);
      });

      axios.interceptors.response.use((response) => {
        this.$store.commit('loading', false);
        return response;
      }, (error) => {
        this.$store.commit('loading', false);
        return Promise.reject(error);
      });
    },

    computed: {
      temp() {
        return !this.$store.state.mini
      },
      perm() {
        return ( this.$store.state.mini )
            ? this.$store.state.drawer
            : this.$store.state.mini
      },
      loading () {
        return this.$store.state.loading
      }
    },

    methods: {
      
    }
    
  }
</script>
