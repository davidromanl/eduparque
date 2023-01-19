<template>
  <v-card min-width="320px">
    <v-form
      lazy-validation
      ref="form"
      v-model="valido"
      @submit.prevent="guardar"
    >
      <v-card-title class="amber lighten-1">
        <v-icon left
          >mdi-comment-{{ aporte.tipo ? "question" : "plus" }}</v-icon
        >
        {{ aporte.id ? "Editar" : "Enviar" }}
        {{ aporte.tipo ? "Pregunta" : "Aporte" }}
        <v-spacer></v-spacer>
        <v-btn dark small class="secondary" icon @click="cerrar">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Email"
          readonly
          :rules="[reglas.requerido]"
          v-model="aporte.email"
        ></v-text-field>
        <tiptap-vuetify
          placeholder="Escribe algo…"
          v-model="aporte.texto"
          :extensions="extensions"
        >
        </tiptap-vuetify>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" small @click="cerrar">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="disable" @click="send_aporte" small color="success"
          >Enviar
          <v-icon right>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import {
  TiptapVuetify,
  Bold,
  Italic,
  BulletList,
  ListItem,
  Link,
  HardBreak,
  HorizontalRule,
  Underline,
  History,
  Strike,
  Code,
} from "tiptap-vuetify";
export default {
  name: "AportesForm",

  props: ["edit_aporte"],

  components: { TiptapVuetify },

  data: () => ({
    valido: true,
    reglas: {
      requerido: (value) => !!value || "Requerido.",
    },
    extensions: [
      History,
      Bold,
      Italic,
      Strike,
      Underline,
      BulletList,
      ListItem,
      Link,
      HardBreak,
      HorizontalRule,
      Code,
    ],
  }),

  computed: {
    aporte() {
      return this.edit_aporte || {};
    },
    disable() {
      const t = this.aporte.texto;
      return t == undefined || t.replace(/ /g, "") == "<p></p>";
    },
  },

  methods: {
    get_recursos() {
      this.$store.dispatch("actividad/get_recursos", this.id);
    },
    send_aporte() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("actividad/send_aporte", this.edit_aporte);
        this.$emit("cerrar");
      }
    },
    cerrar() {
      this.$emit("cerrar");
    },
  },
};
</script>