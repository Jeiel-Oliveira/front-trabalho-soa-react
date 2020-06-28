import axios from 'axios'

const baseUrl = 'http://localhost:49743/ServiceRestFul.svc'
const timeout = 3000

const api  = axios.create({
    baseURL: baseUrl,
    timeout: timeout
})

export default api