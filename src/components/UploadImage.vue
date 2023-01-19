<template>
  <v-menu left offset-y bottom :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn class="mt-3" small fab absolute right v-on="on">
        <v-icon>mdi-image</v-icon></v-btn
      >
    </template>
    <v-card min-width="250" class="text-center">
      <v-expand-transition>
        <v-img
          max-width="250"
          max-height="250"
          class="align-end"
          v-if="preview"
          :src="preview"
        >
          <v-btn small @click="uploadFile" color="success">
            <v-icon left>mdi-camera</v-icon>
            Guardar Imagen</v-btn
          >
        </v-img>
      </v-expand-transition>
      <v-expand-transition>
        <v-alert v-model="saved" class="mb-0" dismissible type="info"
          >Imágen guardada</v-alert
        >
      </v-expand-transition>
      <v-card-text class="py-0">
        <v-expand-transition>
          <v-file-input
            v-if="!saved"
            placeholder="Subir imágen"
            accept="image/png, image/jpeg, image/bmp"
            v-model="file"
          ></v-file-input>
        </v-expand-transition>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "UploadImage",

  props: ["tipo"],

  data: () => ({
    saved: null,
    file: null,
    preview: null,
  }),

  watch: {
    file(v) {
      this.preview = v ? URL.createObjectURL(v) : null;
      return;
    },
  },

  methods: {
    uploadFile() {
      const upload = { file: this.file, tipo: this.tipo };
      this.$store.dispatch("uploadImage", upload).then(() => {
        this.$emit("upload");
        this.file = null;
        this.saved = true;
      });
    },
  },
};
</script>
