<template>
    <v-card min-width="320px">
      <v-form lazy-validation
        ref="form" v-model="valido"
        @submit.prevent="guardar">
        <v-card-title class="amber lighten-1">
            <v-icon left>mdi-comment-plus</v-icon>
            Editar
            <v-spacer></v-spacer>
            <v-btn dark small class="secondary" icon @click="cerrar">
                <v-icon small>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <tiptap-vuetify
                v-model="item.contenido"
                :extensions="extensions"
                >
            </tiptap-vuetify>
        </v-card-text>
        <v-card-actions>
            <v-btn color="secondary"
                small
                @click="cerrar">Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="disable" @click="send_contenido" small
                color="success">Enviar
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
    name: 'ContenidoForm',

    props: ['edit_contenido'],

    components: { TiptapVuetify },

    data: () => ({
        valido: true,
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
        ]
    }),

    computed: {
        item() {
            return this.edit_contenido || {}
        },
        disable() {
            const t = this.item.contenido
            return (t == undefined || t.replace(/ /g, "") == '<p></p>')
        }
    },

    methods: {
        send_contenido() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch('parque/add_contenido',this.item)
                this.cerrar()
            }
        },
        cerrar() {
            this.$emit("cerrar")
        }
    }

  }
</script>