<template>
  <v-container fluid>
    <v-row >
      <v-col class="pa-0">
      
        <v-fab-transition>
          <v-btn class="ma-3" fab small
            v-if="!$store.state.drawer"
            @click="toogleDrawer()" dark
            absolute fixed color="amber darken-2">
            <v-icon class="mt-3 mb-3" dark>mdi-menu-open</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-responsive :aspect-ratio="16/9">
          <iframe class="fill-height" :src="'https://www.youtube.com/embed/'+actividad.youtube+'?autoplay='+autoplay"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
          </v-responsive>
        <v-text-field
          label="Youtube"
          v-model="actividad.youtube"
        ></v-text-field>
        
        <v-toolbar dense color="grey lighten-2">
          <v-icon left large>mdi-book</v-icon>
          <div>
            <h3>{{ curso.nombre }}</h3>
          </div>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="grey mr-2"
                @click="toogleDrawer()"
                fab small v-on="on">
                <v-icon>mdi-menu-open</v-icon></v-btn>
            </template>
            <span>Contenido</span>
          </v-tooltip>
          <v-btn-toggle dense>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on"
                  :to="'/cursos/'+$route.params.id+'/'+actividades[index-1]"
                  :disabled="prev_disabled">
                  <v-icon>mdi-arrow-left</v-icon></v-btn>
              </template>
              <span>Anterior</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  :to="'/cursos/'+$route.params.id+'/'+actividades[index+1]"
                  :disabled="next_disabled"
                  color="grey" v-on="on">
                  <v-icon>mdi-arrow-right</v-icon></v-btn>
              </template>
              <span>Siguiente</span>
            </v-tooltip>
          </v-btn-toggle>
        </v-toolbar>

        
            <v-layout column class="ma-4 pa-2">
              <v-row>
                <v-col class="contenido"
                  :class="{'hide':loading}">
                  <h2 key="0">{{ actividad.nombre }}</h2>
                  <div v-if="!admin"
                    v-html="actividad.descripcion">
                  </div>
                  <tiptap-vuetify v-else
                    v-model="actividad.descripcion"
                    :extensions="extensions"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <Recursos :id="$route.params.act" />
                </v-col>
              </v-row>
          </v-layout>
        

      </v-col>
      
      <v-col cols="12" md="4" class="pa-0 amber">
        <Aportes :id_actividad="act" />
          <v-btn color="success"
            @click="guardar()"
            v-if="admin"
          >Guardar</v-btn>
          <v-btn
            @click="admin=true"
            v-else
            color="primary">Editar</v-btn>
      </v-col>
    </v-row>
    <v-overlay app absolute
      z-index="2"
      :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<style>
.contenido img {
  max-width: 100%;
}

.contenido {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  opacity: 1;
  transform: scaleY(1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
}
.hide {
  min-height: 400px;
  opacity: 0;
}
</style>

<script>
import Recursos from '../components/Recursos.vue'
import Aportes from '../components/Aportes.vue'

import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  Image,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";


  export default {
    name: 'Actividad',
    data: () => ({
      tipoAporte: 'Aporte',
      loading: false,
      admin: false,
      overlay: false,
      dialog: false,
      aporte: {},
      autoplay: 0,
      options: { duration: 1000, easing: 'easeInOutCubic' },
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Image,
          {
            options: {},
          },
        ],
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],

    }),

    components: { TiptapVuetify, Recursos, Aportes },

    computed: {
      curso: function() {
        return this.$store.state.curso.curso
      },
      actividad: function() {
        return this.$store.state.actividad.actividad || {}
      },
      actividades: function() {
        const actividades = this.$store.state.actividad.actividades || []
        return actividades.map( ({ id }) => id )
      },
      act: function() {
        return Number(this.$route.params.act) || 0
      },
      index: function() {
        return this.actividades.indexOf(this.act)
      },
      prev_disabled() {
        return this.index === 0
      },
      next_disabled() {
        return this.index === this.actividades.length - 1
      },
    },

    watch: {
      act(v) {
        this.get_actividad() 
        return v
      },
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
          setTimeout(()=>{
            this.$vuetify.goTo('#app',
              { duration: 700, easing: 'easeInOutCubic' })
            }, 500)
        }, 1500)
      }
    },

    created() {
      const { id } = this.$route.params
      this.get_actividad()
      if(this.curso == null)
        this.$store.dispatch("load_curso", id)
        //this.$store.dispatch("curso/ver", this.id)
    },

    methods: {
      async get_actividad() {
        this.overlay = true
        this.loading = true
        await this.delay(300)
        this.$store.dispatch("actividad/get_actividad", this.act)
          .then( async () => {
            await this.delay(300)
            this.loading = false
          })
          
        //this.autoplay = true
      },
      toogleDrawer() {
        this.$store.state.drawer = !this.$store.state.drawer
      },

      blur(e) {
        console.log(e.type)
      },


    //admin

      guardar() {
        const data = { actividad: this.actividad }
        this.$store.dispatch("actividad/guardar", data)
        this.admin = false
      },


      isLoading() {
        this.loading = !this.loading
      },
      async enviarAporte() {
        this.loading = true
        this.aportes.push(this.aporte)
        this.aporte = ''
        await this.delay(1000)
        this.loading = false
      },
      delay(milisec) {
        return new Promise(resolve => {
          setTimeout(() => { resolve('') }, milisec);
        })
      }
    }
  }
</script>
