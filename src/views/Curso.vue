<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-responsive :aspect-ratio="16 / 9">
            <youtube
              resize
              :player-vars="playerVars"
              :video-id="curso.youtube"
              ref="youtube"
            ></youtube>
          </v-responsive>
          <v-text-field
            class="mx-3"
            v-if="admin"
            label="Youtube"
            v-model="curso.youtube"
          ></v-text-field>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="fill-height" tile>
          <v-img
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            class="white--text align-end text-center fill-height"
            :src="'/api/img/curso/' + curso.id + '?' + rand"
          >
            <UploadImage v-if="admin" tipo="curso" @upload="upload" />

            <h2>{{ curso.nombre }}</h2>
            <p>{{ curso.descripcion }}</p>
            <div class="d-flex pb-3 pl-5 salon">
              <v-avatar color="grey" size="60">
                <v-icon class="teal" x-large>mdi-projector-screen</v-icon>
              </v-avatar>
              <div class="ma-1">
                <div><strong>Salón Virtual</strong></div>
                <v-chip
                  dark
                  link
                  close
                  color="red darken-4"
                  @click="dialog_envivo = true"
                  close-icon="mdi-google-circles"
                  >envivo</v-chip
                >
              </div>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-row>
      <v-col>
        <v-toolbar
          tile
          elevation="0"
          class="fixed"
          color="grey lighten-2"
        >
          <v-icon left>mdi-book</v-icon>
          <v-text-field
            hide-details
            v-if="admin"
            label="Nombre del curso"
            v-model="curso.nombre"
          ></v-text-field>
          <h2 v-else>{{ curso.nombre }}</h2>
          <template v-slot:extension>
            <v-tabs v-model="tabs" fixed-tabs>
              <v-tab>Descripción</v-tab>
              <v-tab><v-icon left>mdi-menu</v-icon>Contenido</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <div class="pa-3">
              <h3><v-icon left>mdi-menu</v-icon> Descripción del curso</h3>
            </div>
            <div class="pa-3" v-if="!admin" v-html="curso.contenido"></div>
            <tiptap-vuetify
              v-else
              v-model="curso.contenido"
              :extensions="extensions"
            />
          </v-tab-item>
          <v-tab-item>
            <v-card outlined tile>
              <v-card-title primary-title>
                <v-icon left>mdi-menu</v-icon>
                <h3>Contenido del curso</h3>
              </v-card-title>
              <v-card-text>
                <v-expansion-panels>
                  <v-expansion-panel v-for="(unidad, i) in unidades" :key="i">
                    <v-expansion-panel-header color="grey lighten-3">
                      <h3>{{ i + 1 + ". " + unidad.nombre }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pa-0">
                      <v-list>
                        <v-list-item
                          link
                          :to="`/cursos/${$route.params.id}/${actividad.id}`"
                          v-for="(actividad, n) in actividades(unidad.id)"
                          :key="n"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{
                              i + 1 + "." + (n + 1) + " " + actividad.nombre
                            }}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item
                          v-if="Object.keys(actividades(unidad.id)).length == 0"
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              Unidad sin actividades.
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                      <v-card-actions v-if="admin">
                        <v-btn
                          small
                          @click="
                            nueva_actividad(
                              unidad.id,
                              actividades(unidad.id).length
                            )
                          "
                          >Nueva Actividad</v-btn
                        >
                        <v-spacer></v-spacer>
                        <v-btn @click="editar(unidad)" small>
                          <v-icon left>mdi-pencil</v-icon> Editar Unidad</v-btn
                        >
                      </v-card-actions>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-row v-if="Object.keys(unidades).length == 0">
                  <v-col>
                    <p>Curso sin unidades.</p>
                  </v-col>
                </v-row>
                <v-row v-if="admin">
                  <v-col class="text-center ma-2">
                    <v-btn small color="primary" @click="nueva_unidad()"
                      ><v-icon left>mdi-plus</v-icon> Añadir Unidad</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="12" md="6" class="amber accent-3">
        <h2>Info gral Curso</h2>
        <p>{{ curso.descripcion }}</p>
        <v-card tile>
          <v-card-title primary-title> Info curso </v-card-title>
        </v-card>
        <div v-if="isAdmin" class="text-center">
          <v-btn
            class="my-3 mr-2"
            @click="admin = !admin"
            :color="admin ? 'secondary' : 'primary'"
            >{{ admin ? "Cancelar" : "Editar" }}</v-btn
          >
          <v-btn @click="guardar" v-if="admin" color="success">Guardar</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <UnidadForm
        :unidad="edit_unidad"
        :cant="unidades.length"
        @cerrar="dialog = false"
      />
    </v-dialog>
    <v-dialog
      v-model="dialog_act"
      max-width="500px"
      transition="dialog-transition"
    >
      <ActividadForm
        :edit_actividad="edit_actividad"
        @cerrar="dialog_act = false"
      />
    </v-dialog>

    <Envivo v-model="dialog_envivo" :curso="curso.nombre" />
  </v-container>
</template>

<style scoped>
.fixed {
  position: -webkit-sticky;
  position: sticky;
  top: 4.1rem;
  z-index: 2;
}
.salon {
  padding: 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  background: rgb(112, 112, 112);
  background: linear-gradient(
    0deg,
    rgba(163, 163, 163, 0.7) 0%,
    rgba(200, 200, 200, 0.3) 100%
  );
}
</style>

<script>
import UploadImage from "../components/UploadImage";
import UnidadForm from "@/components/UnidadForm.vue";
import ActividadForm from "@/components/ActividadForm.vue";
import Envivo from "@/components/Envivo.vue";
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
  name: "Curso",

  components: { TiptapVuetify, UnidadForm, ActividadForm, UploadImage, Envivo },

  data: () => ({
    file: null,
    image: null,
    admin: false,
    edit_unidad: {},
    edit_actividad: {},
    tabs: null,
    dialog: false,
    dialog_act: false,
    dialog_envivo: false,
    rand: Math.random(),
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
    content: "",
  }),

  created() {
    this.load_curso();
  },

  beforeDestroy() {
    this.$store.dispatch("curso/reset_curso");
  },

  computed: {
    ...mapGetters("usuario", ["isAdmin"]),
    ...mapState({
      curso: (state) => state.curso.curso,
      unidades: (state) => state.unidad.unidades,
    }),
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    load_curso() {
      this.$store.dispatch("load_curso", this.id);
    },
    guardar() {
      this.$store.dispatch("curso/guardar", this.curso);
      this.admin = false;
    },

    upload() {
      this.rand = Math.random();
    },

    // Unidad
    editar(unidad) {
      this.edit_unidad = Object.assign({}, unidad);
      this.dialog = true;
    },

    nueva_unidad() {
      this.edit_unidad = {
        id_curso: this.curso.id,
        orden: this.unidades.length + 1,
      };
      this.dialog = true;
    },

    //actividad
    editar_actividad(actividad) {
      this.edit_actividad = Object.assign({}, actividad);
      this.dialog_act = true;
    },

    nueva_actividad(id, orden) {
      this.edit_actividad = {
        curso: this.curso.id,
        actividad: {
          id_unidad: id,
          orden: orden + 1,
        },
      };
      this.dialog_act = true;
    },

    actividades(val) {
      const actividades = this.$store.state.actividad.actividades || [];
      return actividades.filter((act) => act.id_unidad == val);
    },
  },
};
</script>
