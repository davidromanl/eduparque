import Vue from 'vue'
import Vuex from 'vuex'
import parque from './parque'
import curso from './curso'
import usuario from './usuario'
import unidad from './unidad'
import actividad from './actividad'
import blog from './blog'
import axios from "./axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    loading: false
  },
  mutations: {
    
    loading(state, isLoading) {
      //console.log(isLoading)
      state.loading = isLoading;
    }

  },
  actions: {
    
    start_loading({commit}) {
     
      axios.interceptors.request.use(
        (config) => {
            commit('loading', true)
            return config
          },
        (error) => {
          commit('loading', false)
          return Promise.reject(error)
          }
        )

      axios.interceptors.response.use(
        (response) => {
            commit('loading', false)
            return response
          },
        (error) => {
            commit('loading', false)
            return Promise.reject(error)
          }
        )
    
    },

    async load_curso({ commit }, id) {
      const { data } = await axios.get('curso/'+id)
      commit('curso/set_curso', data.curso)
      commit('unidad/set_unidades', data.unidad)
      commit('actividad/set_actividades', data.actividad)
    },

    async uploadImage({state}, {file,tipo}) {
      let formData = new FormData()
      formData.append('file', file)
      const id = state[tipo][tipo].id || 0
      formData.append('id', id)
      const config = { headers: { 'Content-Type': 'multipart/form-data' }}
      const data = await axios.post("/upload/"+tipo, formData, config)
      return data
    }

  },
  modules: {
    parque,
    curso,
    usuario,
    unidad,
    actividad,
    blog
  }
})
