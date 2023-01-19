import axios from "./axios"

const state = () => ({
    actividades: [],
    recursos: [],
    materiales: [],
    aportes: [],
    preguntas: [],
    actividad: {},
})

const mutations = {
    set_actividad(state, actividad) {
        state.actividad = actividad
    },
    set_actividades(state, actividades ) {
        state.actividades = actividades
    },
    set_recursos(state, data) {
        state.recursos = data.filter(({tipo}) => tipo == 0)
        state.materiales = data.filter(({tipo}) => tipo == 1)
    },
    set_aportes(state, data) {
        state.aportes = data.filter(({tipo}) => tipo == 0)
        state.preguntas = data.filter(({tipo}) => tipo == 1)
    },
}

const actions = {
    async get_actividad({commit}, id) {
        const { data } = await axios.get("/actividad/"+id)
        commit("set_actividad", data.actividad)
        commit("set_recursos", data.recursos)
        commit("set_aportes", data.aportes)
    },
    async get_actividades({commit}, curso) {
        const { data } = await axios.get("actividad?id_curso="+curso)
        commit("set_actividades", data)
    },
    async guardar({dispatch}, {actividad,curso=null}) {
        const { data } = await axios.post("/actividad/guardar", actividad)
        if(data)
            if(curso)
                dispatch("get_actividades", curso)
    },
    async eliminar(el, id) {
        const { data } = await axios.get("/eliminar/"+id)
        return data
    },

    //Recursos
    async add_recurso({commit}, recurso) {
        const { data } = await axios.post("/actividad/add_recurso", recurso)
        commit("set_recursos", data)
    },
    
    //Aportes
    async send_aporte({commit}, aporte) {
        const { data } = await axios.post("/actividad/send_aporte", aporte)
        commit("set_aportes", data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}