
import axios from "axios"

axios.defaults.baseURL = "/api"

const token = localStorage.getItem('token')

axios.defaults.headers.common['Authorization']
    = (token)
        ? token
        : null

export default axios