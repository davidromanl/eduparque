import axios from "./axios"

const state = () => ({
    blogs: [],
    blog: {},
})

const mutations = {
    set_blog(state, blog) {
        state.blog = blog
    },
    set_blogs(state, blogs) {
        state.blogs = blogs
    }
}

const actions = {
    async get_blog({commit}, id) {
        const { data } = await axios.get("/blog/"+id)
        commit("set_blog", data)
    },
    reset_blog({commit}) {
        commit("set_blog", {})
    },
    async get_blogs({commit},url) {
        const { data } = await axios.get("/blog"+url)
        commit("set_blogs", data)
    },
    async guardar({commit}, blog) {
        await axios.post("/blog/guardar", blog)
        commit("set_blog", blog)
    },
} 

export default {
    namespaced: true,
    state,
    actions,
    mutations
}