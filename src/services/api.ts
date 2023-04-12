import axios from "axios";

const api = axios.create({
  baseURL: 'http://10.0.0.5:3333'
});

api.interceptors.request.use((config) => {
  console.log("Dados da requisição", config.data)
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { api };