import axios from "./axios"

const state = () => ({
    curso: null,
    cursos: [],
})

const mutations = {
    set_curso(state, curso) {
        state.curso = curso
    },
    set_cursos(state, cursos) {
        state.cursos = cursos
    }
}

const actions = {
    async get_curso({commit}, id) {
        const { data } = await axios.get("/curso/"+id)
        commit("set_curso", data )
    },
    async get_cursos({commit}) {
        const { data } = await axios.get("/curso")
        commit("set_cursos", data)
    },
    async guardar({dispatch}, curso) {
        await axios.post("/curso/guardar", curso)
        dispatch("get_cursos")
    },
    async eliminar({dispatch}, id) {
        await axios.get("/curso/eliminar/"+id)
        dispatch("get_cursos")
    },
    async nueva_unidad({ commit }, unidad) {
        const { data } = await axios.post("/unidad/guardar", unidad)
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