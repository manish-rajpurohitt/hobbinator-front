import axios from 'axios';

 const api = axios.create({
    baseURL : 'http://hobbinator-bakend.herokuapp.com'
})

export default api;