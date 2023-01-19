<template>
  <v-container class="pa-0" fluid>
    <UploadImage tipo="blog" @upload="upload" />
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-parallax height="300" 
          :src="'/api/img/blog/0?'+rand">
          <v-overlay absolute class="align-end justify-start"
            :opacity="(hover) ? 0.3 : 0.5">
              <div class="titulos pb-4 pl-10" :class="{hover : hover}">
                <h2>
                  <span class="text-h2">b</span>
                  <span class="text-h4">log</span>
                </h2>
                <p>Posts, articulos y noticias</p>
              </div>
          </v-overlay>
        </v-parallax>
      </template>
    </v-hover>
    <v-container>

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="fixed">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Publicaciones</h3>
                <div>para aprender en comunidad</div>
              </div>
            </v-card-title>
            <v-col class="align-center d-flex">
              <v-text-field dense
                hide-details
                @keydown.enter="search"
                ref="query"
                v-model="buscar"
                outlined clearable
                placeholder="Buscar"
              ></v-text-field>
              <v-btn fab small dark
                @click.stop="search"
                :class="{indigo: buscar!==''}"
                class="ml-2">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              Filtro por categoría: {{ (tag) ? tags[tag] : 'Todas' }}
            </v-col>
            <v-chip-group column
                color="amber" dark
                center-active
                v-model="tag">
                <v-chip v-for="t,k in tags"
                  class="ma-auto my-1" column
                  :key="k" filter>{{t}}</v-chip>
              </v-chip-group>
          <v-col>
            <v-btn v-if="noUser" to="/login" color="success">Ingresa</v-btn>
            <v-btn v-else @click="new_blog">añadir nueva entrada</v-btn>
          </v-col>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <h2>Posts: 
            <v-chip close v-if="result!==''"
              close-icon="mdi-close-outline"
              color="orange"
              @click:close="clear"
            >{{ result }}</v-chip>
          </h2> <span>Total - {{total}}</span>
          <v-divider class="mb-3"></v-divider>
          <p v-if="sinResult">No se encontraron resultados</p>
          <v-fade-transition group>
            <v-card class="mb-3" hover
              v-for="blog,i in blogsResult" :key="i"
              :to="'/blog/'+blog.id">
              <v-col class="orange lighten-1 d-flex justify-space-between">
                <strong>{{i}} - {{ blog.titulo }}</strong>
                <v-avatar>
                  <v-img :src="'/api/img/usuario/'+blog.uid"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="pa-1">
                <v-row no-gutters>
                  <v-col>
                    <v-img width="190" height="180"
                      class="float-start rounded mt-2 mr-2 d-none d-sm-flex"
                      :src="'/api/img/blog/'+blog.id"></v-img>
                    <div class="pa-1">{{ blog.descripcion }}</div>
                  </v-col>
                  <v-col md="3" cols="12">
                    <v-img width="180" height="130"
                      class="float-start mr-2 d-flex d-sm-none"
                      :src="'/api/img/blog/'+blog.id"></v-img>
                    <div class="text-center grey lighten-2 pb-1 rounded">
                      <strong>Por:</strong><br>
                      {{blog.nombre}} <br>
                      <v-icon left>mdi-clock</v-icon> <span class="caption">{{ blog.fecha | fecha }}</span>
                      <v-rating :value="4" small
                        dense hover></v-rating>
                      <v-icon>mdi-heart</v-icon> 12
                      <v-icon>mdi-message</v-icon> 2<br>
                      <v-divider class="ma-1"></v-divider>
                      <v-btn text small block>Ver más...</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
          </v-fade-transition>
        </v-col>
      </v-row>
      
      <div class="text-center">
        <v-pagination
            v-model="page"
            :length="paginas"
        ></v-pagination>
      </div>
    </v-container>
    
    <v-dialog max-width="500"
        v-model="dialog">
      <v-card >
       <v-form>
        <v-card-title primary-title>
          Nueva entrada
        </v-card-title>
        <v-card-text>
            <v-textarea
              auto-grow
              rows="2"
              :rules="[reglas.max]"
              counter
              v-model="e_blog.titulo"
              label="Título"
            ></v-textarea>
            <v-textarea
              v-model="e_blog.descripcion"
              label="Descripción"
            ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog=false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="add_blog"
            color="success">Guardar</v-btn>
        </v-card-actions>
       </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// @ is an alias to /src
import UploadImage from "../components/UploadImage"
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Blog',

  components: { UploadImage },

  data: () => ({
    file: null,
    image: null,
    tag: null,
    page: 1,
    buscar: null,
    result: '',
    dialog: false,
    rand: Math.random(),
    e_blog: {},
    reglas: {
      max: v => (v || '').length <= 150 || 'Máximo 150'
    },
    tags: ['Artes','Pintura','Matemáticas','Inglés','Emprendimiento','Tecnología']
  }),

  computed: {
    ...mapGetters("usuario",['noUser']),
    ...mapState({
      blogs: state => state.blog.blogs,
      usuario: state => state.usuario.usuario,
    }),

    selected() {
      return this.tags[this.tag] || 'Ninguno'
    },
    sinResult() {
      return (this.total==0 && this.result!='')
    },
    total() {
      return Object.keys(this.blogs).length
    },
    blogsResult() {
      let min = (this.page-1) * 4
      return this.blogs.filter((v,i) => i >= min && i < min+4 )
    },
    paginas() {
      return (this.total % 4 == 0)
        ? Math.trunc(this.total / 4)
        : Math.trunc(this.total / 4) + 1
    }
  },

  watch: {
    
  },

  filters: {
    fecha(v) {
      const fecha = new Date(v)
      const meses = [
        'Ene','Feb','Mar','Abr','May','Jun',
        'Jul','Ago','Sep','Oct','Nov','Dic',
      ]
      const mes = meses[fecha.getMonth()]
      const dia = fecha.getDate()
      const h = fecha.getHours()
      const m = fecha.getMinutes()
      const am = ( h<12 ) ? 'am' : 'pm'
      const hora = ( h>9 ) ? (h>12) ? h-12 : h : '0'+h
      const minu = ( m>9 ) ? m : '0'+m
      return mes +' '+ dia +', '+ hora +':'+minu+am
    }
  },

  created() {
    this.get_blogs()
  },

  methods: {
    get_blogs() {
      const url = (!this.buscar) ? '' : '?q='+this.buscar.trim()
      this.$store.dispatch("blog/get_blogs",url)
    },
    search() {
      if(this.buscar)
        if(this.buscar.trim().length > 3)
          this.get_blogs()
      this.result = this.buscar.trim()
      this.$refs.query.focus()
    },
    clear() {
      this.result = ''
      this.buscar = null
      this.get_blogs()
    },
    new_blog() {
      this.e_blog = { email: this.usuario.email }
      this.dialog = true  
    },
    add_blog() {
      this.$store.dispatch('blog/guardar',this.e_blog)
      this.dialog = false
      this.get_blogs()
    },
    upload() {
      this.rand = Math.random()
    }
  }
}
</script>
