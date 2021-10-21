<template>
  <v-container class="pa-0" fluid>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-parallax height="300"
          src="https://via.placeholder.com/1200x500">
          <v-overlay absolute class="align-end justify-start"
            :opacity="(hover) ? 0.3 : 0.5">
              <div class="titulos pb-4 pl-10" :class="{hover : hover}">
                <h2>Cursos</h2>
                <p>Explorar cursos</p>
              </div>
          </v-overlay>
        </v-parallax>
      </template>
    </v-hover>
    <v-container>
      <v-row align="end">
        <v-col  v-for="n in cursos" :key="n.id" cols="12" md="4" sm="6">
          
            <v-card hover :to="'/cursos/'+n.id">
              <v-img height="200px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                class="white--text align-end text-center"
                :src="'/api/img/curso/'+n.id+'?'+rand">
                <v-card-title>
                  <h3 class="h3 mb-0 px-2 amber darken-4">{{n.nombre}}</h3>
                </v-card-title>
              </v-img>
              <v-card-text style="height:65px;">
                <p>{{ n.descripcion }}</p>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text tile class="secondary">
                    <v-icon left>mdi-bookmark</v-icon>
                    Ver curso
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
                    <v-menu>
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on"
                          icon color="error">
                          <v-icon>mdi-delete</v-icon></v-btn>
                      </template>
                      <v-card>
                        <v-card-text class="py-1">
                          ¿Eliminar todo el curso?
                          <v-btn @click="eliminar(curso.id)"
                            small color="error">SI
                            <v-icon right>mdi-alert</v-icon>
                            </v-btn>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
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
      rand: Math.random(),
      item: {}
    }),

    created() {
      this.listar()
    },

    computed: {
      cursos () {
        return this.$store.state.curso.cursos
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
        this.$store.dispatch('curso/get_cursos')
      },
      
      eliminar(id) {
        this.$store.dispatch('curso/eliminar',id)
          .then( this.listar())
      }
    }
  }
</script>
