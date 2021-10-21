<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar dense tile
              class="fixed"
              color="grey lighten-2">
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
                  <v-expansion-panel v-for="(unidad, i) in unidades" :key="i">
                    <v-expansion-panel-header color="grey lighten-3">
                      <h3>{{(i+1)+'. '+unidad.nombre }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-btn @click="editar(unidad)" icon>
                        <v-icon>mdi-pencil</v-icon></v-btn>
                        {{ unidad.orden }}
                      <v-list>
                        <v-list-item link
                          :to="`/cursos/${$route.params.id}/${actividad.id}`"
                          v-for="(actividad, n) in actividades(unidad.id)" :key="n">
                          <v-list-item-content>
                            <v-list-item-title>{{(i+1)+'.'+(n+1)+ ' ' + actividad.nombre }}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                      
                      <v-btn small @click="nueva_actividad(unidad.id,actividades(unidad.id).length)">Añadir</v-btn>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-btn small @click="nueva_unidad()">Añadir</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5" app
        class="pa-0 amber accent-3">
        <v-card tile>
          <v-img v-if="image" :src="image">
          </v-img>
          <v-img v-else height="250"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            :src="'/api/img/curso/'+curso.id+'?'+rand"
            class="white--text pa-2 align-end">
              <h2>{{curso.nombre}}</h2>
              <p>{{curso.descripcion}}</p>
            </v-img>
          <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              v-model="file"
            ></v-file-input>
            <v-btn small
                  :disabled="!image"
                  @click="uploadFile"
                  color="success">
                  <v-icon left>mdi-camera</v-icon>
                  Guardar Imagen</v-btn>
        </v-card>
        <h2>Info gral Curso</h2>
        <p>{{ curso.descripcion }}</p>
        {{ $route.params }}
        
        <v-card tile>
          <v-toolbar dense prominent extended>
            <h3 class="headline mb-0">headline</h3>
          </v-toolbar>
          <v-card-title primary-title class="green lighten-2">
            <div>
              
              <div>description</div>
            </div>
          </v-card-title>
          <v-card-text>
            <p>dfsdfh</p>
          </v-card-text>
        </v-card>
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
      <UnidadForm
        :unidad="edit_unidad"
        :cant="unidades.length"
        @cerrar="dialog=false" />
    </v-dialog>
    <v-dialog
      v-model="dialog_act"
      max-width="500px"
      transition="dialog-transition"
    >
      <ActividadForm
        :edit_actividad="edit_actividad"
        @cerrar="dialog_act=false" />
    </v-dialog>
  </v-container>
</template>

<style scoped>


.fixed {
  position: -webkit-sticky;
  position: sticky;
  top: 4.1rem;
  z-index: 2;
}

</style>

<script>
import UnidadForm from '@/components/UnidadForm.vue'
import ActividadForm from '@/components/ActividadForm.vue'
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

  components: { TiptapVuetify, UnidadForm, ActividadForm },

  data: () => ({
    file: null,
    image: null,
    admin: false,
    edit_unidad: {},
    edit_actividad: {},
    dialog: false,
    dialog_act: false,
    rand: Math.random(),
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
      return this.$store.state.curso.curso || {}
    },
    unidades() {
      return this.$store.state.unidad.unidades || {}
    },
    id() {
      return this.$route.params.id;
    },
  },

  watch: {
    file(v) {
      this.image = (v) ? URL.createObjectURL(v) : null
      return
    }
  },

  methods: {
    load_curso() {
      this.$store.dispatch("load_curso", this.id);
    },
    guardar() {
      this.$store.dispatch("curso/guardar", this.curso);
      this.admin = false
    },

    uploadFile() {
      const upload = { file: this.file, tipo: "curso" }
      this.$store.dispatch("uploadImage",upload)
    },

  // Unidad
    editar(unidad) {
      this.edit_unidad = Object.assign({}, unidad)
      this.dialog = true
    },

    nueva_unidad() {
      this.edit_unidad = {
        id_curso: this.curso.id,
        orden: this.unidades.length + 1
      }
      this.dialog = true
    },

  //actividad
    editar_actividad(actividad) {
      this.edit_actividad = Object.assign({}, actividad)
      this.dialog_act = true
    },

    nueva_actividad(id, orden) {
      this.edit_actividad = {
        curso: this.curso.id,
        actividad: {
          id_unidad: id,
          orden: orden+1
        }
      }
      this.dialog_act = true
    },


    actividades(val) {
      const actividades = this.$store.state.actividad.actividades || []
      return actividades.filter(act => act.id_unidad == val)
    },
  },
};
</script>
