<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Nuestros cursos</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4"
        v-for="n in cursos" :key="n.id">
        <v-card :to="'/cursos/'+n.id">
          <v-img height="200px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            class="white--text align-center text-center"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            <v-card-title>
              <h3 class="h3 mb-0">{{n.nombre}}</h3>
            </v-card-title>
            <v-card-text>
              {{ n.descripcion }}
            </v-card-text>
          </v-img>
          <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn @click.stop="()=>{}" icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <hr class="my-3">
    <v-row>
      <v-col>
        <h2>Admin</h2>
        <v-btn @click="nuevo"
          color="primary">
          <v-icon>mdi-plus</v-icon></v-btn> | 
        <v-btn @click="listar"
          color="success">
            <v-icon>mdi-refresh</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Opción</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="curso in cursos"
                :key="curso.id">
                <td>{{ curso.nombre }}</td>
                <td>{{ curso.descripcion }}</td>
                <td>
                  <v-btn @click="editar(curso)"
                    icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  <v-btn @click="eliminar(curso.id)"
                    icon color="error">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog max-width="400" v-model="dialog">
      <CursoForm :curso="item" @cerrar="dialog=false" />
    </v-dialog>
  </v-container>
</template>

<script>
  import CursoForm from '@/components/CursoForm.vue'
  
  export default {
    name: 'Cursos',
    components: { CursoForm },
    
    data: () => ({
      dialog: false,
      item: {}
    }),

    created() {
      this.listar()
    },

    computed: {
      cursos () {
        return this.$store.state.curso.todos
      }
    },

    methods: {
      nuevo() {
        this.item = {}
        this.dialog = true
      },

      editar(curso) {
        this.item = Object.assign({}, curso)
        this.dialog = true
      },

      listar() {
        this.$store.dispatch('curso/listar')
      },
      
      eliminar(id) {
        this.$store.dispatch('curso/eliminar',id)
          .then( this.listar())
      }
    }
  }
</script>
