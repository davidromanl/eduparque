<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Bienvenido</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, voluptate. Laudantium asperiores incidunt temporibus facilis suscipit quia aliquid qui tempora tenetur, animi, a eos dignissimos labore, eum dicta id eveniet?</p>
      </v-col>
      <v-col cols="12" md="5">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          max-height="120"
        />
      </v-col>
    </v-row>

    <v-parallax
      class="rounded"
      height="300"
      contain
      src="@/assets/baner.jpg"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <v-overlay absolute>
            <h1 class="text-h4 info--text mb-4">
              Parque Educativo Virtual
            </h1>
            <h4 class="subheading">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit!
            </h4>
          </v-overlay>
        </v-col>
      </v-row>
    </v-parallax>
    <v-divider class="my-3"></v-divider>
    <v-row>
      <v-col>
        <h1 class="text-h3">Titulos h3</h1>
        <p class="text-body-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, voluptate. Laudantium asperiores incidunt temporibus facilis suscipit quia aliquid qui tempora tenetur, animi, a eos dignissimos labore, eum dicta id eveniet?</p>
      </v-col>
      <v-col>
        <h2 class="text-h4">Subtitulo h4</h2>
        <p class="text-body-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, voluptate. Laudantium asperiores incidunt temporibus facilis suscipit quia aliquid qui tempora tenetur, animi, a eos dignissimos labore, eum dicta id eveniet?</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h4 class="text-h5">Titulos H5</h4>
        <p class="text-body-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, voluptate. Laudantium asperiores incidunt temporibus facilis suscipit quia aliquid qui tempora tenetur, animi, a eos dignissimos labore, eum dicta id eveniet?</p>
      </v-col>
      <v-col>
        <h3 class="text-h6">Sub titulo h6</h3>
        <p class="text-body-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, voluptate. Laudantium asperiores incidunt temporibus facilis suscipit quia aliquid qui tempora tenetur, animi, a eos dignissimos labore, eum dicta id eveniet?</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
    }),
  }
</script>
