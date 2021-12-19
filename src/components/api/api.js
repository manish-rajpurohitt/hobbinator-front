import axios from 'axios';

 const api = axios.create({
    baseURL : 'https://hobbinator-bakend.herokuapp.com'
})

export default api;