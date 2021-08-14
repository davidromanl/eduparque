<template>
  <v-container fluid>
    <v-row>
      <v-col class="pa-0">
      
        <v-fab-transition>
          <v-btn class="ma-3" fab small
            v-if="!$store.state.drawer"
            @click="toogleDrawer()" dark
            absolute fixed color="amber darken-2">
            <v-icon class="mt-3 mb-3" dark>mdi-menu</v-icon>
          </v-btn>
        </v-fab-transition>
      
        <iframe height="440" src="https://www.youtube.com/embed/1qvDPi9ZyJA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <v-toolbar dense color="grey lighten-2">
          <v-icon left large>mdi-book</v-icon>
          <h2>Fotografía básica</h2>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="grey mr-2"
                @click="toogleDrawer()"
                outlined v-on="on">
                <v-icon>mdi-menu</v-icon></v-btn>
            </template>
            <span>Contenido</span>
          </v-tooltip>
          <v-btn-toggle dense>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <v-icon>mdi-arrow-left</v-icon></v-btn>
              </template>
              <span>Anterior</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn color="grey" v-on="on">
                  <v-icon>mdi-arrow-right</v-icon></v-btn>
              </template>
              <span>Siguiente</span>
            </v-tooltip>
          </v-btn-toggle>
        </v-toolbar>
        <v-row>
          <v-col class="pa-8">
            <h2>Titulo de la Unidad numero 1</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore deleniti ipsa optio reprehenderit corrupti iste unde saepe beatae quaerat dicta facilis, nisi alias, assumenda autem aspernatur molestiae. Necessitatibus, facilis iste.</p>
            <p>Comentarios</p>
            <p>Comentarios</p>
            <p>Comentarios</p>
            <v-tabs color="white" background-color="green lighten-1">
              <v-tab>Recursos</v-tab>
              <v-tab>Materiales</v-tab>
            </v-tabs>
            <v-list-item
              v-for="n in 5"
              :key="n"
            >
              left item {{ n }}
            </v-list-item>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="amber accent-3">
        <v-textarea
          filled
          append-icon="mdi-send"
          class="mx-2"
          rows="3" outlined
          label="Aporte o pregunta"
          placeholder="Escribe tu aporte o pregunta."
        ></v-textarea>
        <v-card color="grey lighten-3">
          <v-tabs v-model="tab" grow>
            <v-tab>Aportes</v-tab>
            <v-tab>Preguntas</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card-text>{{tab}} 
                  <p>Aportes</p>
                  <p>Aportes</p>
                  <p>Aportes</p>
                  <p>Aportes</p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>{{tab}}
                  <p>Preguntas</p>
                  <p>Preguntas</p>
                  <p>Preguntas</p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Cursos',
    data: () => ({
      tab: null,
    }),
    methods: {
      toogleDrawer() {
        this.$store.commit('toogleDrawer')
      }
    }
  }
</script>
