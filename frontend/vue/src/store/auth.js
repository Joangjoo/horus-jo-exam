// store/auth.js
import { defineStore } from 'pinia';
import apiClient from '../services/api';
import router from '../router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        users: [], 
    }),

    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        getIsAuthenticated: (state) => state.isAuthenticated,
    },

    actions: {
        isTokenExpired(token) {
            if (!token) return true;
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);
                return payload.exp < (currentTime + 300); 
            } catch (error) {
                console.error('Error parsing token:', error);
                return true;
            }
        },

        setToken(token) {
            if (token && !this.isTokenExpired(token)) {
                this.token = token;
                localStorage.setItem('token', token);
                this.isAuthenticated = true;
            } else {
                console.warn('Token expired atau tidak valid, menghapus token...');
                this.clearAuth();
            }
        },

        clearAuth() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        async initAuth() {
            const token = localStorage.getItem('token');
            if (!token || this.isTokenExpired(token)) {
                console.log('Token tidak ada atau expired, membersihkan auth...');
                this.clearAuth();
                return false;
            }

            try {
                this.setToken(token);
                await this.fetchUser();
                return true;
            } catch (error) {
                console.error('Error initializing auth:', error);
                this.clearAuth();
                return false;
            }
        },

        async fetchAllUsers(searchQuery = '') {
            try {
                const params = searchQuery ? { search: searchQuery } : {};
                const response = await apiClient.get('/users', { params });
                this.users = response.data;
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        },

        async handleRegister(credentials) {
            try {
                const response = await apiClient.post('/auth/register', credentials);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;
                    if (errors?.username) throw new Error(errors.username[0]);
                    throw new Error('Validasi gagal, periksa input Anda.');
                }
                console.error('Registration failed:', error);
                throw new Error('Terjadi kesalahan server, coba lagi nanti.');
            }
        },

        async handleLogin(credentials) {
            try {
                const response = await apiClient.post('/auth/login', credentials);

                if (response.data.access_token) {
                    this.setToken(response.data.access_token);
                    await this.fetchUser();
                }

                return response.data;
            } catch (error) {
                console.error('Login failed:', error);
                this.clearAuth();

                if (error.response?.status === 401) {
                    throw new Error('Username atau password salah');
                } else if (error.response?.data?.error) {
                    throw new Error(error.response.data.error);
                } else {
                    throw new Error('Login gagal, coba lagi nanti');
                }
            }
        },

        async fetchUser() {
            if (!this.token || this.isTokenExpired(this.token)) {
                this.clearAuth();
                throw new Error('Token tidak valid');
            }
            try {
                const response = await apiClient.get('/profile');
                this.user = response.data;
                this.isAuthenticated = true;
                return this.user;
            } catch (error) {
                console.error('Fetch user failed:', error);
                if (error.response?.status === 401) {
                    this.clearAuth();
                    router.push('/login');
                }
                throw error;
            }
        },

        async handleLogout() {
            try {
                if (this.token) {
                    await apiClient.post('/logout');
                }
            } finally {
                this.clearAuth();
                router.push('/login');
            }
        },

        async fetchUserById(id) {
            try {
                const res = await apiClient.get(`/users/${id}`);
                return res.data;
            } catch (error) {
                throw error;
            }
        },

        async updateUser(id, payload) {
            try {
                const res = await apiClient.put(`/users/${id}`, payload);
                const idx = this.users.findIndex(u => u.id === id);
                if (idx !== -1) this.users[idx] = res.data;
                return res.data;
            } catch (error) {
                throw error;
            }
        },

        async deleteUser(id) {
        try {
            await apiClient.delete(`/users/${id}`);
            this.users = this.users.filter(u => u.id !== id);
        } catch (error) {
            console.error('Gagal menghapus user:', error);
            throw error;
        }
    }
    },

    
});
