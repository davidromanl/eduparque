import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueYoutube from 'vue-youtube'

Vue.config.productionTip = false

Vue.use(VueYoutube)

const vm = new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
})

window.onload = function() {
  vm.$mount('#app')
}
