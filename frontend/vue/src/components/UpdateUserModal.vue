<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../store/auth';

const props = defineProps({
    show: Boolean,
    user: Object, 
});
const emit = defineEmits(['close', 'updated']);

const authStore = useAuthStore();

const nama = ref('');
const username = ref('');
const email = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

watch(() => props.user, (val) => {
    if (val) {
        nama.value = val.nama;
        username.value = val.username;
        email.value = val.email;
    }
}, { immediate: true });

const handleUpdate = async () => {
    if (!nama.value || !username.value || !email.value) {
        errorMessage.value = "Semua field wajib diisi!";
        return;
    }

    try {
        isLoading.value = true;
        errorMessage.value = ''; 
        await authStore.updateUser(props.user.id, {
            nama: nama.value,
            username: username.value,
            email: email.value,
        });
        emit('updated'); 
        emit('close');   
    } catch (error) {
        console.error("Update gagal:", error);
        errorMessage.value = "Gagal memperbarui data.";
    } finally {
        isLoading.value = false;
    }
};

watch(() => props.show, (val) => {
    if (!val) {
        errorMessage.value = '';
    }
});
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div
            class="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-slate-200 transform animate-modal-appear">
            <div class="text-center mb-8">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                    <svg class="h-8 w-8 text-[#3C467B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                        </path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-[#3C467B] mb-2">Update User</h2>
                <p class="text-slate-600 text-sm">Perbarui informasi pengguna</p>
            </div>

            <form @submit.prevent="handleUpdate" class="space-y-6">
                <div class="space-y-2">
                    <label for="update-nama" class="block text-sm font-semibold text-slate-700">Nama</label>
                    <input type="text" id="update-nama" v-model="nama" required :disabled="isLoading"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 bg-slate-50 focus:bg-white outline-none placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Masukkan nama lengkap" />
                </div>

                <div class="space-y-2">
                    <label for="update-username" class="block text-sm font-semibold text-slate-700">Username</label>
                    <input type="text" id="update-username" v-model="username" required :disabled="isLoading"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 bg-slate-50 focus:bg-white outline-none placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Username unik" />
                </div>

                <div class="space-y-2">
                    <label for="update-email" class="block text-sm font-semibold text-slate-700">Email</label>
                    <input type="email" id="update-email" v-model="email" required :disabled="isLoading"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 bg-slate-50 focus:bg-white outline-none placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="alamat@email.com" />
                </div>

                <div v-if="errorMessage"
                    class="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center">
                    <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                    {{ errorMessage }}
                </div>

                <div class="flex flex-col sm:flex-row gap-3 pt-4">
                    <button type="button" @click="$emit('close')" :disabled="isLoading"
                        class="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 focus:ring-4 focus:ring-slate-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Batal
                    </button>

                    <button type="submit" :disabled="isLoading"
                        class="flex-1 bg-[#3C467B] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#2d3660] focus:bg-[#2d3660] focus:ring-4 focus:ring-[#3C467B]/20 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#3C467B] disabled:active:scale-100 flex items-center justify-center">
                        <template v-if="isLoading">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Menyimpan...
                        </template>
                        <template v-else>
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                            Update
                        </template>
                    </button>
                </div>

                <div class="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 border border-slate-200 mt-4">
                    <div class="flex items-start">
                        <svg class="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Pastikan semua informasi telah diisi dengan benar sebelum menyimpan perubahan.</span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@keyframes modal-appear {
    0% {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
    }

    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.animate-modal-appear {
    animation: modal-appear 0.2s ease-out;
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
</style>