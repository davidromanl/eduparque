import axios from "./axios"

const state = () => ({
    token: localStorage.getItem('token') || '',
    usuario: {},
    cursos: []
})

const mutations = {
    
    auth_request(state) {
        state.status = 'loading'
    },

    auth_success(state, {token,user}) {
        state.token = token
        state.usuario = user
    },

    set_cursos(state, {data}) {
        state.cursos = data
    },
    
    set_usuario(state, {data}) {
        state.usuario = data
    },

    logout(state) {
        state.token = ''
        state.usuario = {}
        delete axios.defaults.headers.common["Authorization"]
    },

}

const actions = {

    async registro(el, usuario) {
        const { data } = await axios.post("/usuario/registro", usuario)
        return data
    },

    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post("/usuario/login", user)
                .then( ({data}) => {
                    localStorage.setItem('token', data.token)
                    axios.defaults.headers.common['Authorization'] = data.token
                    commit('auth_success', data)
                    resolve({data})
                })
                .catch((err) => {
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },

    async cursos({ commit }) {
        const data = await axios.get("/usuario")
        commit("set_usuario", data)
    },

    async uploadFile({state}, file) {
        let formData = new FormData()
        formData.append('file', file)
        const config = { headers: { 'Content-Type': 'multipart/form-data' }}
        const data = await axios.post("/upload/avatar/"+state.usuario.id, formData, config)
        return data
    },

    logout({ commit }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            resolve()
        })
    }

}

const getters = {
    isAuthenticated: state => !!state.token,
    getUser: state => state.usuario,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}