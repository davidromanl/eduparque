import Vue from 'vue'
import Vuex from 'vuex'
import curso from './curso'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    mini: false,
    loading: false
  },
  mutations: {
    
    loading(state, isLoading) {
      //console.log(isLoading)
      state.loading = isLoading;
    }

  },
  actions: {
  },
  modules: {
    curso
  }
})
