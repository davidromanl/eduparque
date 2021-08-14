<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form ref="form">
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Inicio Sesión</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="usuario"
                prepend-icon="person"
                label="Usuario"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="clave"
                prepend-icon="lock"
                label="Contraseña"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary">Ingresar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
      usuario: '',
      clave: '',
  }),
};
</script>