import axios from 'axios';
const API =axios.create({
    baseURL: 'https://hirehub-server-2zj3.onrender.com/api'
});
export default API;