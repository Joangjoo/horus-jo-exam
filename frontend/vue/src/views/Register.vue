<script setup>
import { ref, nextTick } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const nama = ref('');
const tempNama = ref('');
const errorMessage = ref('');
const showSuccessModal = ref(false);
const isLoading = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref(false);



const performRegister = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = '';

        if(!nama.value || !email.value || !username.value || !password.value) {
            errorMessage.value = 'Semua field harus diisi.';
            isLoading.value = false;
            return;
        }

        if (password.value.length < 6) {
            errorMessage.value = 'Password harus terdiri dari minimal 6 karakter.';
            isLoading.value = false;
            return;
        }

        tempNama.value = nama.value;

        await authStore.handleRegister({
            username: username.value,
            email: email.value,
            password: password.value,
            nama: nama.value,
        });


        username.value = '';
        email.value = '';
        password.value = '';
        nama.value = '';

        await nextTick();
        isLoading.value = false;

        showSuccessModal.value = true;

        setTimeout(() => {
            showSuccessModal.value = false;
            router.push('/login');
        }, 2000);
    } catch (error) {
        console.error('Error registrasi:', error);
        isLoading.value = false;
        errorMessage.value = 'Gagal membuat akun. Silakan coba lagi. Pastikan username atau email belum terdaftar.';
    }
};
</script>


<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-[#3C467B] mb-2">Daftar Akun</h2>
                <p class="text-slate-600">Buat akun baru untuk memulai</p>
            </div>

            <form @submit.prevent="performRegister" class="space-y-6">
                <div class="space-y-2">
                    <label for="nama" class="block text-sm font-semibold text-slate-700">Nama Lengkap</label>
                    <input type="text" id="nama" v-model="nama" required :disabled="isLoading"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 bg-slate-50 focus:bg-white outline-none placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Masukkan Nama Lengkap Anda" />
                </div>

                <div class="space-y-2">
                    <label for="email" class="block text-sm font-semibold text-slate-700">Email</label>
                    <input type="email" id="email" v-model="email" required :disabled="isLoading"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 bg-slate-50 focus:bg-white outline-none placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Masukkan Email Anda" />
                </div>

                <div class="space-y-2">
                    <label for="username" class="block text-sm font-semibold text-slate-700">Username</label>
                    <input type="text" id="username" v-model="username" required :disabled="isLoading"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 bg-slate-50 focus:bg-white outline-none placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Masukkan Username anda" />
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

                <button type="submit" :disabled="isLoading"
                    class="w-full bg-[#3C467B] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#2d3660] focus:bg-[#2d3660] focus:ring-4 focus:ring-[#3C467B]/20 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#3C467B] disabled:active:scale-100 flex items-center justify-center">
                    <template v-if="isLoading">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Mendaftar...
                    </template>
                    <template v-else>
                        Daftar Akun
                    </template>
                </button>

                <div class="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p class="mb-1">Dengan mendaftar, Anda menyetujui:</p>
                    <ul class="space-y-1 ml-4">
                        <li class="flex items-start">
                            <span class="mr-2">•</span>
                            <span>Syarat dan ketentuan yang berlaku</span>
                        </li>
                        <li class="flex items-start">
                            <span class="mr-2">•</span>
                            <span>Kebijakan privasi data</span>
                        </li>
                    </ul>
                </div>
            </form>

            <div class="mt-8 text-center">
                <p class="text-slate-600">
                    Sudah punya akun?
                    <router-link to="/login"
                        class="text-[#3C467B] font-semibold hover:text-[#2d3660] transition-colors duration-200 hover:underline">
                        Masuk di sini
                    </router-link>
                </p>
            </div>
        </div>

        <div v-if="showSuccessModal"
            class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div class="bg-white rounded-2xl p-8 mx-4 max-w-md w-full shadow-2xl transform animate-modal-appear">
                <div class="text-center">
                    <div
                        class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4 animate-bounce-once">
                        <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                    </div>

                    <h3 class="text-xl font-bold text-gray-900 mb-2">Registrasi Berhasil!</h3>
                    <p class="text-gray-600 mb-4">
                        Selamat! Akun <span class="font-semibold text-[#3C467B]">{{ tempNama }}</span> telah berhasil
                        dibuat.
                    </p>

                    <div class="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                        <div
                            class="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full animate-progress-bar shadow-sm">
                        </div>
                    </div>


                    <button @click="showSuccessModal = false; router.push('/login');"
                        class="text-[#3C467B] hover:text-[#2d3660] font-medium text-sm bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-200 border border-slate-200 hover:border-[#3C467B]">
                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6">
                            </path>
                        </svg>
                        Login Sekarang
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes bounce-once {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes modal-appear {
    0% {
        opacity: 0;
        transform: scale(0.9) translateY(-10px);
    }

    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes progress-bar {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

.animate-bounce-once {
    animation: bounce-once 0.6s ease-out;
}

.animate-modal-appear {
    animation: modal-appear 0.3s ease-out;
}

.animate-progress-bar {
    animation: progress-bar 2s linear;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.fixed {
    visibility: visible !important;
    pointer-events: auto !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>