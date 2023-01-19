<template>
  <v-container fill-height>
      <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="light-green darken-2">
                  <h2 class="white--text mb-0">Mi cuenta</h2>
                <v-spacer></v-spacer>
                <v-btn @click="salir" dark color="blue-grey">Salir</v-btn>
              </v-card-title>
              <v-card-text>
                <v-row class="pt-2">
                  <v-col cols="12" md="6">
                    <h3>Información de usuario</h3>
                    <v-form lazy-validation ref="form" v-model="valid">
                      <v-text-field
                        v-model="usuario.nombre"
                        :rules="[reglas.requerido]"
                        label="Nombre"
                      ></v-text-field>
                      <v-text-field
                        readonly
                        v-model="usuario.email"
                        label="Email"
                      ></v-text-field>
                      <v-text-field
                        type="number"
                        v-model="usuario.telefono"
                        :rules="[reglas.requerido]"
                        label="Teléfono"
                      ></v-text-field>
                      <v-text-field
                        v-model="usuario.direccion"
                        :rules="[reglas.requerido]"
                        label="Dirección"
                      ></v-text-field>
                      <v-text-field
                        v-model="usuario.departamento"
                        :rules="[reglas.requerido]"
                        label="Departamento"
                      ></v-text-field>
                      <v-text-field
                        v-model="usuario.municipio"
                        :rules="[reglas.requerido]"
                        label="Municipio"
                      ></v-text-field>
                      <v-select
                        :items="tipos"
                        :rules="[reglas.requerido]"
                        v-model="usuario.tipo"
                        label="Rol"
                      ></v-select>
                      <v-btn text>
                        <v-icon color="amber darken-3">mdi-pencil</v-icon>
                        Editar
                      </v-btn>
                      
                      <v-btn text @click="guardar"
                        :disabled="!valid">
                        <v-icon color="success darken-3">mdi-content-save</v-icon>
                        Actualizar
                      </v-btn>
                    </v-form>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card max-width="400" class="text-center mx-auto">
                      <v-img width="100%"
                        v-if="usuario.id"
                        class="align-end"
                        :src="'/api/img/usuario/'+usuario.id+'?'+rand">
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
                          placeholder="Selecionar imagen"
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
              </v-card-text>
            </v-card>
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
    valid: true,
    usuario: {},
    saved: false,
    reglas: {
      requerido: value => !!value || 'Requerido.'
    },
    tipos: [
      { value: 'users', text: 'Usuario'},
      { value: 'teach', text: 'Docente'},
      { value: 'admin', text: 'Administrador'}
    ]
  }),

  created() {
    this.usuario = Object.assign({}, this.$store.state.usuario.usuario)
  },

  watch: {
    file(v) {
      this.image = (v) ? URL.createObjectURL(v) : null
      return
    }
  },

  methods: {

    guardar() {
      if(this.$refs.form.validate())
        this.$store.dispatch("usuario/guardar",this.usuario)
    },

    uploadFile() {
      const upload = { file: this.file, tipo: "usuario" }
      this.$store.dispatch("uploadImage",upload)
        .then(
          () => {
            this.rand = Math.random()
            this.file = null
            this.saved = true
          }
        )
    },

    salir() {
        this.$store.dispatch("usuario/logout")
        this.$router.push("/login")
    }
  }
}
</script>
