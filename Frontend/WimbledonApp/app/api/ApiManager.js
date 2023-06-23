import axios from 'axios';

const ApiManager = axios.create({
    baseURL: "https://localhost:7186/api",
    responseType: "json",
    withCredentials: true
});

export default ApiManager;