// src/api/index.js
import axios from 'axios';

// 1. Создаем экземпляр axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Интерцепторы для обработки ошибок и авторизации
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.dispatchEvent(new Event('unauthorized'));
    }
    return Promise.reject(error);
  }
);

// 3. Основные API методы
export const productAPI = {
  fetchAll: async () => {
    const { data } = await apiClient.get('/products');
    return data;
  },
  fetchById: async (id) => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },
  fetchByCategory: async (category) => {
    const { data } = await apiClient.get(`/products/category/${category}`);
    return data;
  },
  create: async (productData) => {
    const { data } = await apiClient.post('/products', productData);
    return data;
  },
};

export const authAPI = {
  login: async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },
  register: async (userData) => {
    const { data } = await apiClient.post('/auth/register', userData);
    return data;
  },
};

// 4. Вспомогательные функции
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
  delete apiClient.defaults.headers.common['Authorization'];
};