<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import router from '../router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();
const showPassword = ref(false);
const showSuccessModal = ref(false);

const performLogin = async () => {
    try {
        errorMessage.value = '';
        await authStore.handleLogin({
            username: username.value,
            password: password.value,
        });

        showSuccessModal.value = true;
        setTimeout(() => {
            showSuccessModal.value = false;
            router.push('/dashboard');
        }, 2000);
    } catch (error) {
        errorMessage.value = 'Username atau password salah.';
        console.error(error);
    }
};
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-[#3C467B] mb-2">Login</h2>
                <p class="text-slate-600">Masuk ke akun Anda</p>
            </div>

            <form @submit.prevent="performLogin" class="space-y-6">
                <div class="space-y-2">
                    <label for="username" class="block text-sm font-semibold text-slate-700">Username</label>
                    <input type="text" id="username" v-model="username" required
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 bg-slate-50 focus:bg-white outline-none placeholder-slate-400"
                        placeholder="Masukkan username" />
                </div>

                <div class="space-y-2 relative">
                    <label for="password" class="block text-sm font-semibold text-slate-700">Password</label>
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
                            :disabled="isLoading"
                            class="w-full pr-12 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 bg-slate-50 focus:bg-white outline-none placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Minimal 6 karakter" />

                        <button type="button" @click="showPassword = !showPassword" :aria-pressed="showPassword"
                            :title="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
                            class="absolute inset-y-0 right-2 flex items-center px-2 text-slate-600 hover:text-slate-900 focus:outline-none"
                            :disabled="isLoading">
                            <template v-if="showPassword">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.04-5.845M6.88 6.88A9.962 9.962 0 0112 5c5.523 0 10 4.477 10 10 0 1.133-.18 2.225-.512 3.246M3 3l18 18" />
                                </svg>
                            </template>
                            <template v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </template>
                        </button>
                    </div>
                </div>

                <p v-if="errorMessage"
                    class="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center">
                    <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                    {{ errorMessage }}
                </p>

                <button type="submit"
                    class="w-full bg-[#3C467B] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#2d3660] focus:bg-[#2d3660] focus:ring-4 focus:ring-[#3C467B]/20 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]">
                    Masuk
                </button>
            </form>

            <div class="mt-8 text-center">
                <p class="text-slate-600">
                    Belum punya akun?
                    <router-link to="/register"
                        class="text-[#3C467B] font-semibold hover:text-[#2d3660] transition-colors duration-200 hover:underline">
                        Daftar di sini
                    </router-link>
                </p>
            </div>
        </div>
    </div>

    <!-- Modal sukses -->
    <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center border border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500 mx-auto mb-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-semibold text-slate-800">Login Berhasil</h3>
            <p class="text-slate-600 mt-1">Selamat datang kembali, {{ username }} 🎉</p>
            <button @click="showSuccessModal = false"
                class="mt-6 w-full bg-[#3C467B] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#2d3660] transition-all duration-200 shadow-lg">
                Lanjutkan
            </button>
        </div>
    </div>

</template>