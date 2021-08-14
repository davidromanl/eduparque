<template>
    <v-card>
      <v-form lazy-validation
        ref="form" v-model="valido"
        @submit.prevent="guardar">
        <v-card-title>
            {{(unidad.id)?'Editar':'Nueva'}} Unidad
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrar">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            {{ unidad }}
            <v-text-field
                label="Nombre"
                :rules="[reglas.requerido]"
                v-model="unidad.nombre"
            ></v-text-field>
            <v-text-field
                type="number"
                label="Orden"
                v-model="unidad.orden"
            ></v-text-field>
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
    name: 'UnidadForm',

    props: ['unidad'],

    data: () => ({
        valido: true,
        reglas: {
            requerido: value => !!value || 'Requerido.'
        }
    }),

    methods: {
        guardar() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch('curso/nueva_unidad',this.unidad)
                this.$emit("cerrar")
            }
        },
        cerrar() {
            this.$emit("cerrar")
        }
    }

  }
</script>