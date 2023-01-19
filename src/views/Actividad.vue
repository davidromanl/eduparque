<template>
  <v-container fluid>
    <v-row>
      <v-col class="pa-0">
        <v-tooltip nudge-bottom="88" fixed offset-overflow nudge-right="105" transition="scroll-x-reverse-transition">
          <template v-slot:activator="{ on }">
            <v-fab-transition>
              <v-btn
                class="ma-3"
                fab
                v-on="on"
                small
                v-if="!$store.state.drawer"
                @click="toogleDrawer()"
                dark
                absolute
                fixed
                color="amber darken-2"
              >
                <v-icon class="mt-3 mb-3" dark>mdi-menu-open</v-icon>
              </v-btn>
            </v-fab-transition>
          </template>
          <span>Contenido</span>
        </v-tooltip>
        <v-responsive :class="{ fixed: fixed }" :aspect-ratio="16 / 9">
          <youtube
            resize
            :player-vars="playerVars"
            :video-id="actividad.youtube"
            ref="youtube"
          ></youtube>
        </v-responsive>

        <v-text-field
          v-if="admin"
          class="mx-3"
          label="Youtube"
          v-model="actividad.youtube"
        ></v-text-field>

        <v-toolbar
          dense
          class="fixed"
          :class="{ fixed_sm: fixed }"
          color="grey lighten-2"
        >
          <v-icon left large>mdi-book</v-icon>
          <div>
            <h3>{{ curso.nombre }}</h3>
          </div>
          <v-spacer></v-spacer>

          <v-btn-toggle dense>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  :to="
                    '/cursos/' + $route.params.id + '/' + actividades[index - 1]
                  "
                  :disabled="prev_disabled"
                >
                  <v-icon>mdi-arrow-left</v-icon></v-btn
                >
              </template>
              <span>Anterior</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  :to="
                    '/cursos/' + $route.params.id + '/' + actividades[index + 1]
                  "
                  :disabled="next_disabled"
                  color="grey"
                  v-on="on"
                >
                  <v-icon>mdi-arrow-right</v-icon></v-btn
                >
              </template>
              <span>Siguiente</span>
            </v-tooltip>
          </v-btn-toggle>
        </v-toolbar>

        <v-layout column class="ma-4 pa-2">
          <v-row>
            <v-col class="contenido" :class="{ hide: loading }">
              <h2 v-if="!admin">{{ actividad.nombre }}</h2>
              <v-text-field
                v-else
                label="Nombre Actividad"
                v-model="actividad.nombre"
              ></v-text-field>
              <div v-if="!admin" v-html="actividad.descripcion"></div>
              <tiptap-vuetify
                v-else
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
        <div class="text-center" v-if="isAdmin">
          <v-btn
            class="my-3 mr-2"
            @click="admin = !admin"
            :color="admin ? 'secondary' : 'primary'"
            >{{ admin ? "Cancelar" : "Editar" }}</v-btn
          >
          <v-btn color="success" @click="guardar()" v-if="admin">Guardar</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-overlay app absolute z-index="2" :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<style>
.contenido img {
  max-width: 100%;
}

.fixed_sm {
  top: 18em !important;
}
.fixed {
  position: -webkit-sticky;
  position: sticky;
  top: 4.3em;
  z-index: 2;
  height: auto;
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
import Recursos from "../components/Recursos.vue";
import Aportes from "../components/Aportes.vue";
import { mapState, mapGetters } from "vuex";

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
  name: "Actividad",
  data: () => ({
    tipoAporte: "Aporte",
    loading: false,
    admin: false,
    overlay: false,
    dialog: false,
    aporte: {},
    autoplay: 0,
    playerVars: {
      loop: 1,
      showinfo: 0,
      modestbranding: 1,
      controls: 2,
      origin: "localhost",
      enablejsapi: 1,
      autoplay: 1,
      rel: 0,
    },
    options: { duration: 1000, easing: "easeInOutCubic" },
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
    ...mapGetters("usuario", ["noUser", "isAdmin"]),
    ...mapState({
      curso: (state) => state.curso.curso,
      actividad: (state) => state.actividad.actividad,
      actividad_es: (state) => state.actividad.actividades,
    }),

    actividades: function () {
      const actividades = this.actividad_es;
      return actividades.map(({ id }) => id);
    },
    act: function () {
      return Number(this.$route.params.act) || 0;
    },
    index: function () {
      return this.actividades.indexOf(this.act);
    },
    prev_disabled() {
      return this.index === 0;
    },
    next_disabled() {
      return this.index === this.actividades.length - 1;
    },
    fixed() {
      return this.$vuetify.breakpoint.name === "xs";
    },
  },

  watch: {
    act(v) {
      this.get_actividad();
      return v;
    },
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
          // setTimeout(()=>{
          //   this.$vuetify.goTo('#app',
          //     { duration: 700, easing: 'easeInOutCubic' })
          //   }, 500)
        }, 1500);
    },
  },

  created() {
    this.get_actividad();
    const { id } = this.$route.params;
    if (this.curso == null) this.$store.dispatch("load_curso", id);
    //this.$store.dispatch("curso/ver", this.id)
  },

  methods: {
    async get_actividad() {
      this.overlay = true;
      this.loading = true;
      await this.delay(300);
      this.$store
        .dispatch("actividad/get_actividad", this.act)
        .then(async () => {
          await this.delay(300);
          this.loading = false;
        });

      //this.autoplay = true
    },
    toogleDrawer() {
      this.$store.state.drawer = !this.$store.state.drawer;
    },

    blur(e) {
      console.log(e.type);
    },

    //admin

    guardar() {
      const data = { actividad: this.actividad };
      this.$store.dispatch("actividad/guardar", data);
      this.admin = false;
    },

    isLoading() {
      this.loading = !this.loading;
    },
    async enviarAporte() {
      this.loading = true;
      this.aportes.push(this.aporte);
      this.aporte = "";
      await this.delay(1000);
      this.loading = false;
    },
    delay(milisec) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("");
        }, milisec);
      });
    },
  },
};
</script>
