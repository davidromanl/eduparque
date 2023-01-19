import axios from "./axios"
import router from '@/router'

const state = () => ({
    token: localStorage.getItem('token') || '',
    usuario: {},
    cursos: []
})

const mutations = {

    auth_success(state, {token,user}) {
        state.token = token
        state.usuario = user
    },

    set_cursos(state, {data}) {
        state.cursos = data
    },
    
    set_usuario(state, data) {
        state.usuario = data
    },

    logout(state) {
        state.token = null
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

    async get({ commit, dispatch }) {
        const { data } = await axios.get("/usuario") //.catch(e=>console.log(e))
        
        if(data)
            commit("set_usuario", data)
        else {
            router.push("/login").catch( () => {} )
            dispatch("logout")
        }

    },

    async guardar({commit}, usuario) {
        await axios.post("/usuario/guardar", usuario)
        commit("set_usuario", usuario)
    },

    async uploadFile({state}, file) {
        let formData = new FormData()
        formData.append('file', file)
        const config = { headers: { 'Content-Type': 'multipart/form-data' }}
        const data = await axios.post("/upload/usuario/"+state.usuario.id, formData, config)
        return data
    },

    logout({ commit }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            //router.push("/login")
            resolve()
        })
    }

}

const getters = {
    isAuthenticated: state => !!state.token,
    getUser: state => state.usuario,
    noUser: state => Object.keys(state.usuario).length == 0,
    isAdmin: state => state.usuario.tipo == 'admin'
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}