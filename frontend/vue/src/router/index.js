// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

// Import views
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (authStore.token && !authStore.user) {
        await authStore.fetchUser();
    }

    const isAuthenticated = authStore.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        if (to.name === 'Register') {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }

});

export default router;