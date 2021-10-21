<template>
  <v-card>
    <v-tabs v-model="tab" color="white"
        background-color="green lighten-1">
      <v-tab>Recursos</v-tab>
      <v-tab>Materiales</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
        <v-tab-item>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Recurso:</th>
                                <th>Enlace</th>
                                <th>Opc</th>
                            </tr>
                        </thead>
                            <tr v-for="r in recursos" :key="r.id">
                                <td>{{ r.nombre }}</td>
                                <td>{{ r.url }}</td>
                                <td>
                                    <v-btn color="success"
                                        @click="edit_recurso(r)"
                                        >Edit</v-btn>
                                </td>
                            </tr>
                        <tbody>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-btn color="success" @click="new_recurso">Añadir</v-btn>
            </v-card-text>
        </v-tab-item>
        <v-tab-item>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Material:</th>
                                <th>Enlace</th>
                                <th>Opc</th>
                            </tr>
                        </thead>
                            <tr v-for="r in materiales" :key="r.id">
                                <td>{{ r.nombre }}</td>
                                <td>{{ r.url }}</td>
                                <td>
                                    <v-btn color="success"
                                        @click="edit_recurso(r)"
                                        >Edit</v-btn>
                                </td>
                            </tr>
                        <tbody>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-btn color="success" @click="new_recurso">Añadir</v-btn>
            </v-card-text>
        </v-tab-item>
    </v-tabs-items>
    <v-dialog
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-form lazy-validation
        ref="form" v-model="valido"
        @submit.prevent="add_recurso">
            <v-card>
                <v-card-title>
                    {{ tabs[tab] }}
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        label="Nombre"
                        :rules="[reglas.requerido]"
                        v-model="recurso.nombre"
                    ></v-text-field>
                    <v-text-field
                        label="Url"
                        :rules="[reglas.requerido, reglas.esurl]"
                        v-model="recurso.url"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn text type="submit">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
    props: ['id'],
    data: () => ({
        tab: null,
        valido: true,
        reglas: {
            requerido: value => !!value || 'Requerido.',
            esurl: value => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(value) || "No es un URL valido",
        },
        tabs: ['Recursos','Materiales'],
        recurso: {},
        dialog: false
    }),
    created() {},
    computed: {
        recursos() {
            return this.$store.state.actividad.recursos
        },
        materiales() {
            return this.$store.state.actividad.materiales
        }
    },
    methods: {
        isURL(str) {
            let url
            try {
                url = new URL(str)
            } catch (_) {
                return false
            }
            return url.protocol === "http:" || url.protocol === "https:"
        },
        get_recursos() {
            this.$store.dispatch('recursos/get_recursos',this.id)
        },
        new_recurso() {
            this.recurso = {
                id_actividad: this.id,
                tipo: this.tab
            }
            this.dialog = true
        },
        edit_recurso(r) {
            this.recurso = Object.assign({}, r)
            this.dialog = true
        },
        add_recurso() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch("actividad/add_recurso", this.recurso)
                this.dialog = false
            }
        }
    }
}
</script>