<template>
  <v-container class="pa-0" fluid>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-parallax height="300" 
          src="https://via.placeholder.com/1200x500">
          <v-overlay absolute class="align-end justify-start"
            :opacity="(hover) ? 0.3 : 0.5">
              <div class="titulos pb-4 pl-10" :class="{hover : hover}">
                <h2>Blog</h2>
                <p>Posts, articulos y noticias</p>
              </div>
          </v-overlay>
        </v-parallax>
      </template>
    </v-hover>
    <v-container>
      <v-row>
        <v-col>
          <v-chip-group
            color="amber"
            center-active
            v-model="tag">
            <v-chip v-for="t,k in tags"
              class="ma-auto" column
              :key="k" filter>{{t}}</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="i in 3" :key="i">
          <v-card hover>
            <v-col class="orange lighten-1">
              <v-avatar class="float-end">
                <v-img :src="'/api/img/avatar/'+1"></v-img>
              </v-avatar>
              <strong>Como hacer un buen documental y por que es importante?</strong>
            </v-col>
            <v-col>
              Un documental nos permite compartir historias reales y construir memoria colectiva. Su proceso de construcción tiene sus particularidades
              <v-rating :value="4"
                dense hover></v-rating>
            </v-col>
            <v-card-actions>
              <v-btn><v-icon>mdi-heart</v-icon> 12</v-btn>
              <v-btn><v-icon>mdi-message</v-icon> 2</v-btn>
              <v-spacer></v-spacer>
              <v-icon left>mdi-clock</v-icon> <span class="caption">Hace 2 días</span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Blog',

  data: () => ({
    tag: null,
    tags: ['Artes','Pintura','Matemáticas','Inglés','Emprendimiento','Tecnología']
  }),

  computed: {
    selected() {
      return this.tags[this.tag] || 'Ninguno'
    }
  },

  watch: {
    
  },

  created() {
    
  },

  methods: {
    
  }
}
</script>
