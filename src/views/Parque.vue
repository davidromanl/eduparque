<template>
  <v-container class="pa-0" fluid>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-parallax height="300"
          src="https://via.placeholder.com/1200x500">
          <v-overlay absolute class="align-end justify-start"
            :opacity="(hover) ? 0.3 : 0.5">
              <div class="titulos pb-4 pl-10" :class="{hover : hover}">
                <h2>
                  <span class="text-h2">e</span>
                  <span class="text-h4">duparque</span>
                </h2>
                <p>Posts, articulos y noticias</p>
              </div>
          </v-overlay>
        </v-parallax>
      </template>
    </v-hover>
    <v-container 
      :fluid="(row.fluid==1)"
      v-for="row,r in filas" :key="r">
      <v-row>
        <v-col :md="col"
          v-for="col,c in JSON.parse(row.columnas)" :key="c">
          <div v-if="celda(row.id,c)">
            <div v-html="celda(row.id,c).contenido"></div>
            <v-icon @click="open_contenido(row.id,c)">mdi-pencil</v-icon>
          </div>
          <div v-else>
            <v-icon @click="add_contenido(row.id,c)">mdi-plus</v-icon>
          </div>
          
        </v-col>
      </v-row>
    </v-container>

<!-- Admin -->
    <v-container>
      <v-divider></v-divider>
      <v-row>
        <v-col><h2>Admin</h2></v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-radio-group row v-model="row">
            Nro. columnas:
            <v-radio v-for="n in 4" :key="n" :label="''+n"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="auto">
          <v-switch v-model="fluid" label="Completo"></v-switch>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="add_fila" color="success">guardar</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container :fluid="fluid">
      <v-row>
        <v-col :md="col"
          v-for="col,k in rowsizes[row]" :key="k">
          <v-card class="d-flex justify-space-between">
            <v-icon
              :disabled="(rowsizes[row][k-1] <= 1 || k==0)"
              @click="sizerow(k-1,k)"
              >mdi-arrow-left</v-icon>
            <v-icon
              :disabled="(rowsizes[row][k+1] <= 1 || k==row)"
              @click="sizerow(k+1,k)"
              >mdi-arrow-right</v-icon>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    {{pagina}}
    <v-dialog
      max-width="650"
      v-model="dialog"
      transition="dialog-transition"
    >
      <ContenidoForm
        @cerrar="dialog=false"
        :edit_contenido="edit_contenido" />
    </v-dialog>

  </v-container>
</template>

<script>
// @ is an alias to /src
import ContenidoForm from '@/components/ContenidoForm.vue'
import { mapState } from 'vuex'

export default {
  name: 'Parque',

  data: () => ({
    fluid: false,
    row: 0,
    edit_contenido: {},
    dialog: false,
    rowsizes: {
      0:[12],
      1:[6,6],
      2:[4,4,4],
      3:[3,3,3,3]
    }
  }),

  components: { ContenidoForm },

  computed: {
    uri() {
      return this.$route.params.uri || "info"
    },
    ...mapState({
      pagina: state => state.parque.pagina,
      filas: state => state.parque.filas,
      contenidos: state => state.parque.contenidos
    })
        
  },

  watch: {
    uri() {
      this.get_pagina()
      return
    }
  },

  created() {
    this.get_pagina()
  },

  methods: {

    get_pagina() {
      this.$store.dispatch("parque/get_pagina", this.uri)
    },

    add_fila() {
      const fila = {
        id_pagina: this.pagina.id,
        columnas: this.rowsizes[this.row],
        orden: 1,
        fluid: this.fluid
      }
      this.$store.dispatch("parque/add_fila", fila)
    },
    
    add_contenido(row,col) {
        this.edit_contenido = {
          id_fila: row,
          columna: col,
        }
        this.dialog = true
    },
    
    open_contenido(row,col) {
      //console.log(row,col)
      this.edit_contenido = Object.assign({}, this.celda(row,col))
      this.dialog = true
    },

    sizerow(id,k) {
      //this.$set(this.rowsizes[row],k,this.rowsizes[row][k-1]-1)
      let { $set, rowsizes, row } = this
      $set(rowsizes[row],id,rowsizes[row][id]-1)
      $set(rowsizes[row],k,rowsizes[row][k]+1)
    },

    celda(row,col) {
      const celda = this.contenidos.filter(
        ( { id_fila, columna } ) => id_fila == row && columna == col )
      return celda[0]
    }
  }
}
</script>
