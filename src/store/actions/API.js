import axios from 'axios'
import config from '../config'

const API = axios.create({
    baseURL: config.API_ROOT_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error.response)
    },
)

export default API