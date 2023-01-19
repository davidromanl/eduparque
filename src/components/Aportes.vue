<template>
  <div>
    <v-img
      :src="'/api/img/curso/' + $route.params.id"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200"
      class="white--text pa-2 align-end"
    >
      <h2>{{ curso.nombre }}</h2>
      <p>{{ curso.descripcion }}</p>
    </v-img>
    <v-toolbar class="fixed" dense tile>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab><v-icon left>mdi-comment-plus</v-icon> Aportes</v-tab>
        <v-tab><v-icon left>mdi-comment-question</v-icon> Preguntas</v-tab>
      </v-tabs>
      <template v-slot:extension>
        <v-spacer></v-spacer>
        <v-btn small text outlined @click="add_aporte"
          >Enviar {{ tipo[tab] }}
          <v-icon right color="success"
            >mdi-comment-{{ tab ? "question" : "plus" }}</v-icon
          ></v-btn
        >
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item class="amber lighten-4">
        <p class="text-center py-4" v-if="aportes.length == 0">
          No hay aportes
        </p>
        <v-fade-transition group leave-absolute hide-on-leave>
          <div v-for="aport in aportes" :key="aport.id" class="pa-2">
            <v-card hover class="amber lighten-2">
              <v-card-title class="py-1 amber">
                <v-avatar>
                  <v-img :src="'/api/img/usuario/' + aport.id_usuario"></v-img>
                </v-avatar>
                <div class="ml-2">
                  <h4>{{ aport.nombre }}</h4>
                  <div>{{ aport.email }}</div>
                </div>
                <v-spacer></v-spacer>
                <span class="caption">{{ aport.fecha | fecha }}</span>
              </v-card-title>
              <v-card-text class="py-1 texto">
                <div v-html="aport.texto"></div>
              </v-card-text>
            </v-card>
          </div>
        </v-fade-transition>
      </v-tab-item>
      <v-tab-item class="amber lighten-3">
        <p class="text-center py-4" v-if="preguntas.length == 0">
          No hay preguntas
        </p>
        <v-fade-transition group leave-absolute hide-on-leave>
          <div v-for="pregu in preguntas" :key="pregu.id" class="pa-3">
            <v-card hover class="amber lighten-2">
              <v-card-title class="py-1 amber">
                <v-avatar>
                  <v-img :src="'/api/img/usuario/' + pregu.id_usuario"></v-img>
                </v-avatar>
                <div class="ml-2">
                  <h4>{{ pregu.nombre }}</h4>
                  <div>{{ pregu.email }}</div>
                </div>

                <v-spacer></v-spacer>
                <span class="caption">{{ pregu.fecha | fecha }}</span>
              </v-card-title>
              <v-card-text class="py-1 texto">
                <div v-html="pregu.texto"></div>
              </v-card-text>
            </v-card>
          </div>
        </v-fade-transition>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog
      v-model="dialog"
      persistent
      origin="top right"
      max-width="400px"
      transition="dialog-transition"
    >
      <AporteForm :edit_aporte="aporte" @cerrar="dialog = false" />
    </v-dialog>
  </div>
</template>

<style scoped>
.v-dialog__content {
  position: fixed;
  justify-items: right;
  justify-content: right;
}

.v-application p {
  margin-bottom: 2px;
}

.float-end {
  z-index: 4;
}

.texto {
  max-height: 150px;
  overflow-y: auto;
}
</style>

<script>
import AporteForm from "./AporteForm";

export default {
  name: "Aportes",
  props: ["id_actividad"],
  components: { AporteForm },
  data: () => ({
    tab: null,
    dialog: false,
    aporte: {},
    tipo: ["Aporte", "Pregunta"],
  }),

  filters: {
    fecha(v) {
      const fecha = new Date(v);
      const meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      const mes = meses[fecha.getMonth()];
      const dia = fecha.getDate();
      const h = fecha.getHours();
      const m = fecha.getMinutes();
      const am = h < 12 ? "am" : "pm";
      const hora = h > 9 ? (h > 12 ? h - 12 : h) : "0" + h;
      const minu = m > 9 ? m : "0" + m;
      return mes + " " + dia + ", " + hora + ":" + minu + am;
    },
  },

  computed: {
    curso() {
      return this.$store.state.curso.curso || [];
    },
    aportes() {
      return this.$store.state.actividad.aportes || [];
    },
    preguntas() {
      return this.$store.state.actividad.preguntas;
    },
    email() {
      return this.$store.state.usuario.usuario.email;
    },
  },

  methods: {
    add_aporte() {
      this.aporte = {
        tipo: this.tab,
        id_actividad: this.id_actividad,
        email: this.email,
      };
      this.dialog = true;
    },
  },
};
</script>