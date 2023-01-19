import axios from "./axios"

const state = () => ({
    pagina: {},
    filas: [],
    contenidos: []
})

const mutations = {
    set_pagina(state, { pagina }) {
        state.pagina = pagina
    },
    set_filas(state, { filas }) {
        state.filas = filas
    },
    set_contenidos(state, { contenidos }) {
        state.contenidos = contenidos
    },
} 

const actions = {
    async get_pagina({commit}, uri) {
        const { data } = await axios.get("/parque/"+uri)
        commit("set_pagina", data)
        commit("set_filas", data)
        commit("set_contenidos", data)
    },
    async add_fila({commit}, fila) {
        const { data } = await axios.post("/parque/fila", fila)
        commit("set_filas", data)
    },
    async add_contenido({state,commit}, contenido) { 
        const { id } = state.pagina
        const { data } = await axios.post("/parque/contenido/"+id, contenido)
        commit("set_contenidos", data)
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}