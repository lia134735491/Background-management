import axios from 'axios'
let request = axios.create({
    baseURL: "/api"
})
request.interceptors.request.use(function(config) {
    let user = JSON.parse(localStorage.getItem('user'))
    if(user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config   
},function(error) {
    console.log(error)
    return Promise.reject(error)
})

request.interceptors.response.use(function(response) {
    return response
},function(error) {
    return Promise.reject(error)
})
export default request
