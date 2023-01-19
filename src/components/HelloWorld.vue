<template>
  <v-container class="pa-0" fluid>
    
    <v-parallax
      height="340"
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
            <video poster="@/assets/logo.png" autoplay muted loop tabindex="0">
              <source src="@/assets/logo.webm" type="video/webm">
            </video>
            <h1 class="text-h3 warning--text mb-4">
              Parque Educativo Virtual
            </h1>
            <h4 class="subheading">
              Compartir Conocimiento, Crear Comunidad y Construir el Futuro
            </h4>
          </v-overlay>
        </v-col>
      </v-row>
    </v-parallax>
    
    <v-container>
      <v-row class="text-center">
        <v-col>
          <h1>¡Bienvenidos!</h1>
          <h3>Transformamos los procesos de formación y aprendizaje, haciendo  uso y aprovechamiento de las nuevas tecnologías para el entrenamiento a la próxima generación de profesionales.</h3>
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
    </v-container>

    
    <v-divider class="my-3"></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h1 class="text-h3">Aprende en comunidad</h1>
          <p class="text-body-1">Conéctate con otros estudiantes, comparte tus proyectos y construye conexiones de interacción y aprendizaje comparte tus aprendizajes, soluciona tus dudas y aprende en comunidad</p>
          <v-divider class="my-3"></v-divider>
        </v-col>
        <v-col>
          <h2 class="text-h4">Clases en vivo</h2>
          <p class="text-body-1">Sesiones periódicas en vivo sobre temas especializados con profesores, clases, Salon Virtual
            Ingresa a la sala de reuniones virtual para clases en vivo e interacción videoconferencia entre estudiantes y tutor.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <h4 class="text-h4">Accede a tus cursos 24/7</h4>
          <p class="text-body-1">Decide estudiar a tu ritmo y cuando tú puedas.</p>
        </v-col>
        <v-col>
          <h3 class="text-h4">Somos una comunidad que nunca para de aprender</h3>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
    }),
  }
</script>
