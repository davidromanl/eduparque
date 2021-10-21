<template>
  <v-container fill-height>
      <v-row>
          <v-col>
            <v-card>
              <v-card-title class="light-green darken-2">
                <div>
                  <h2 class="white--text mb-0">Mi perfil</h2>
                  <span>Información de usuario</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn small fab>
                  <v-icon color="amber darken-3">mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="usuario.nombre"
                  label="Nombre"
                ></v-text-field>
                <v-text-field
                  readonly
                  v-model="usuario.email"
                  label="Email"
                ></v-text-field>
                <v-text-field
                  type="number"
                  label="Teléfono"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="text-center">
              <v-img
                v-if="usuario.id"
                class="align-end"
                :src="'/api/img/avatar/'+usuario.id+'?'+rand">
                <v-avatar
                  class="mb-3"
                  elevation="6"
                  size="120"
                  :color="(saved) ? 'green' : 'grey'"
                > 
                  <v-img v-if="image" :src="image"></v-img>
                  <v-icon v-else>mdi-{{ (saved) ? 'check' : 'account'}}</v-icon>
                </v-avatar>
              </v-img>
              <v-card-text class="text-right">
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
              </v-card-text>
            </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-btn @click="salir" color="success">Salir</v-btn>
          </v-col>
      </v-row>
      <v-snackbar
        color="success"
        v-model="saved"
      >Cambios guardados</v-snackbar>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Usuario',

  data: () => ({
    file: null,
    rand: Math.random(),
    image: null,
    saved: false
  }),

  computed: {
    usuario() {
      return this.$store.getters["usuario/getUser"]
    },
    not_usuario() {
      return (Object.values(this.usuario).length === 0)
    },
  },

  watch: {
    file(v) {
      this.image = (v) ? URL.createObjectURL(v) : null
      return
    }
  },

  created() {
    if(this.not_usuario)
      this.get_usuario()
  },

  methods: {
    get_usuario() {
        this.$store.dispatch("usuario/cursos")
          .catch(() => this.salir())
    },

    uploadFile() {
      this.$store.dispatch("usuario/foto", this.file)
        .then( r => { 
          if(r) this.rand = Math.random()
          this.file = null
          this.saved = true
        })
    },

    salir() {
        this.$store.dispatch("usuario/logout")
        this.$router.push("/login")
    }
  }
}
</script>
