    import axios from 'axios';

// Recupera o token armazenado
const token = localStorage.getItem('authToken');

const api = axios.create({
    baseURL: 'http://localhost:8083/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adiciona o token no cabeçalho Authorization para todas as requisições
api.interceptors.request.use((config) => {
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
