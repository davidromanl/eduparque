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
                  <span class="text-h2">f</span>
                  <span class="text-h4">oro</span>
                </h2>
                <p>Comparte tus aprendizajes, resuelve<br> tus dudas y aprende en comunidad.</p>
              </div>
          </v-overlay>
        </v-parallax>
      </template>
    </v-hover>
    <v-container>
      <v-row>
          <v-col>
              <p>Foro</p>
          </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Foro',

  data: () => ({
    
  }),

  computed: {
    
  },

  watch: {
    
  },

  created() {
    
  },

  methods: {
    
  }
}
</script>
