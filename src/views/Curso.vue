<template>
  <v-container>
    <v-row>
      <v-col class="px-0">
        <v-toolbar dense color="grey lighten-2">
          <v-icon left>mdi-book</v-icon>
          <h2>{{ curso.nombre }}</h2>
        </v-toolbar>
        <v-row>
          <v-col class="pa-8">
            <div v-if="!admin" v-html="curso.contenido"></div>
            <tiptap-vuetify v-else
              v-model="curso.contenido"
              :extensions="extensions"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined class="ma-2" elevation="0">
              <v-toolbar dense elevation="2" color="grey lighten-2">
                <v-icon left>mdi-menu</v-icon>
                <h3>Contenido del curso</h3>
              </v-toolbar>
              <v-card-text>
                <v-expansion-panels>
                  <v-expansion-panel v-for="(unidad, i) in unidad" :key="i">
                    <v-expansion-panel-header color="grey lighten-3">
                      <h3>{{ unidad.nombre }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-btn @click="editar(unidad)" icon>
                        <v-icon>mdi-pencil</v-icon></v-btn>
                      <v-list>
                        <v-list-item link
                          to="/actividad"
                          v-for="(actividad, n) in actividades(unidad.id)" :key="n">
                          <v-list-item-content>
                            <v-list-item-title> Actividad 1 </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-icon>mdi-menu-down</v-icon>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-btn small @click="nueva_unidad()">Añadir</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5" class="amber accent-3">
        <h2>Info gral Curso</h2>
        <p>{{ curso.descripcion }}</p>
        {{ $route.params }}
        <hr />
        <v-btn @click="guardar"
          v-if="admin"
          color="success">Guardar</v-btn>
        <v-btn
          @click="admin=true"
          v-else
          color="primary">Editar</v-btn>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <UnidadForm :unidad="edit_unidad" @cerrar="dialog=false" />
    </v-dialog>
  </v-container>
</template>

<script>
import UnidadForm from '@/components/UnidadForm.vue'
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

  components: { TiptapVuetify, UnidadForm },

  data: () => ({
    admin: false,
    edit_unidad: {},
    dialog: false,
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

  computed: {
    curso() {
      return this.$store.state.curso.actual;
    },
    unidad() {
      return this.$store.state.curso.unidad;
    },
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    load_curso() {
      this.$store.dispatch("curso/ver", this.id);
    },
    guardar() {
      this.$store.dispatch("curso/guardar", this.curso);
      this.admin = false
    },

    editar(unidad) {
      this.edit_unidad = Object.assign({}, unidad)
      this.dialog = true
    },

    nueva_unidad() {
      this.edit_unidad = { id_curso: this.curso.id }
      this.dialog = true
    },

    actividades(val) {
      const actividad = this.$store.state.curso.actividad
      return actividad.filter(act => act.id_unidad == val)
    },
  },
};
</script>
