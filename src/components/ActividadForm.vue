<template>
    <v-card>
      <v-form lazy-validation
        @keyup.native.enter="guardar"
        ref="form" v-model="valido"
        @submit.prevent="guardar">
        
        <v-card-title>
            {{(actividad.id)?'Editar':'Nueva'}} Actividad
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrar">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-text-field
                label="Nombre"
                :rules="[reglas.requerido]"
                v-model="actividad.nombre"
            ></v-text-field>
            <v-text-field
                type="number"
                label="Orden"
                min="1"
                :max="actividad.orden"
                v-model="actividad.orden"
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
    name: 'ActividadForm',

    props: ['edit_actividad'],

    data: () => ({
        valido: true,
        reglas: {
            requerido: value => !!value || 'Requerido.'
        }
    }),
    computed: {
        actividad() {
            return this.edit_actividad.actividad || {}
        }
    },
    methods: {
        guardar() {
            if(this.$refs.form.validate()) {

                this.$store.dispatch('actividad/guardar',this.edit_actividad)
                this.$emit("cerrar")
            }
        },
        cerrar() {
            this.$emit("cerrar")
        }
    }

  }
</script>