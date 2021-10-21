import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Cursos from '../views/Cursos.vue'
import Curso from '../views/Curso.vue'
import Login from '../views/Login.vue'
import Actividad from '../views/Actividad.vue'
import Usuario from '../views/Usuario.vue'
import Blog from '../views/Blog.vue'
import Parque from '../views/Parque.vue'
import Foro from '../views/Foro.vue'


const ifNotAuthenticated = (to, from, next) => {
  (!store.getters["usuario/isAuthenticated"])
    ? next()
    : next('/')
}

const ifAuthenticated = (to, from, next) => {
  (store.getters["usuario/isAuthenticated"])
    ? next()
    : next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/parque',
    name: 'Parque',
    component: Parque
  },
  {
    path: '/foro',
    name: 'Foro',
    component: Foro
  },
  {
    path: '/cursos',
    name: 'Cursos',
    component: Cursos
  },
  {
    path: '/cursos/:id',
    name: 'Curso',
    component: Curso
  },
  {
    path: '/cursos/:id/:act',
    name: 'Actividad',
    component: Actividad,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: Usuario,
    beforeEnter: ifAuthenticated,
  }
]

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)

export default router
