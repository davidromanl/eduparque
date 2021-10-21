import axios from "./axios"

const state = () => ({
    unidades: [],
    unidad: null,
})

const mutations = {
    set_unidad(state, unidad) {
        state.unidades = unidad
    },
    set_unidades(state, unidades ) {
        state.unidades = unidades.sort((a, b) => a.orden - b.orden)
    }
}

const actions = {
    async get_unidad({commit}, id) {
        const { data } = await axios.get("/unidad/"+id)
        commit("set_unidad", data)
    },
    async get_unidades({commit}) {
        const { data } = await axios.get("unidad")
        commit("set_unidades", data)
    },
    async guardar({commit}, unidad) {
        const { data } = await axios.post("/unidad/guardar", unidad)
        commit("set_unidades", data)
    },
    async eliminar(el, id) {
        const { data } = await axios.get("/eliminar/"+id)
        return data
    },
    async nueva_unidad({ commit }, unidad) {
        const { data } = await axios.post("/guardar", unidad)
        //console.log(data)
        commit("set_unidades", data)
    },
    async nueva_actividad({ commit }, actividad) {
        const { data } = await axios.post("/actividad/guardar", actividad)
        //console.log(data)
        commit("set_actividades", data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}