// services/api.js

import axios from 'axios';
import { useAuthStore } from '../store/auth';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const authStore = useAuthStore();
    const token = authStore.token;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;