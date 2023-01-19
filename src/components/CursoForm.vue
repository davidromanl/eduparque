<template>
    <v-card>
      <v-form lazy-validation
        ref="form" v-model="valido"
        @submit.prevent="guardar">
        <v-card-title>
            {{(curso.id)?'Editar':'Nuevo'}} Curso
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrar">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-text-field
                label="Nombre"
                :rules="[reglas.requerido]"
                v-model="curso.nombre"
            ></v-text-field>
            <v-textarea solo
                label="Descripción"
                v-model="curso.descripcion"
            ></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="guardar" small
                color="success">Guardar
                <v-icon right>mdi-content-save</v-icon>
            </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
</template>

<script>
  export default {
    name: 'CursoForm',

    props: ['curso'],

    data: () => ({
        valido: true,
        reglas: {
            requerido: value => !!value || 'Requerido.'
        }
    }),

    methods: {
        guardar() {
            if(this.$refs.form.validate()) {
                if(!this.curso.contenido) this.curso.contenido = ''
                this.$store.dispatch('curso/guardar',this.curso)
                this.$emit("cerrar")
            }
        },
        cerrar() {
            this.$emit("cerrar")
        }
    }

  }
</script>