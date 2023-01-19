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
import Post from '../views/Post.vue'
import Parque from '../views/Parque.vue'


let url = '/'

const ifNotAuthenticated = async (to, from, next) => {
  
  if(store.getters["usuario/isAuthenticated"])
    if(store.getters["usuario/noUser"])
      await store.dispatch("usuario/get")
  
  url = (from.path == "/login") ? "/usuario" : from.path
  
  return (!store.getters["usuario/isAuthenticated"])
    ? next()
    : next(url)
  }

const ruta = () => { 
  return { url }
}

const ifAuthenticated = async (to, from, next) => {
  url = (from.path == "/login") ? "/usuario" : from.path
  
  if(store.getters["usuario/isAuthenticated"])
    if(store.getters["usuario/noUser"])
      await store.dispatch("usuario/get")

  return (store.getters["usuario/isAuthenticated"])
    ? next()
    : next("/login")
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
    path: '/blog/:id',
    name: 'Entrada Blog',
    component: Post
  },
  {
    path: '/parque',
    name: 'Parque',
    component: Parque
  },
  {
    path: '/parque/:uri',
    name: 'Eduparque',
    component: Parque
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
    props: ruta,
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
