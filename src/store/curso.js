import axios from "axios"

axios.defaults.baseURL = "/ci4/public/index.php"

const state = () => ({
    todos: [],
    actual: {},
    unidad: [],
    actividad: [],
})

const mutations = {
    listar_todos(state, { data }) {
        state.todos = data
    },
    set_unidad(state, unidad) {
        state.unidad = unidad
    },
    ver_actual(state, { data }) {
        state.actual = data['curso']
        state.unidad = data['unidad']
        state.actividad = data['actividad']
    }
}

const actions = {
    async ver({commit}, id) {
        const data = await axios.get("/curso/ver/"+id)
        commit("ver_actual", data)
    },
    async listar({commit}) {
        const data = await axios.get("/curso")
        commit("listar_todos", data)
    },
    async guardar(el, curso) {
        const { data } = await axios.post("/curso/guardar", curso)
        return data
    },
    async eliminar(el, id) {
        const { data } = await axios.get("/curso/eliminar/"+id)
        return data
    },
    async nueva_unidad({ commit }, unidad) {
        const { data } = await axios.post("/unidad/guardar", unidad)
        //console.log(data)
        commit("set_unidad", data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}