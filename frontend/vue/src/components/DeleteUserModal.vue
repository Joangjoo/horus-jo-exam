<!-- DeleteUserModal.vue -->
<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../store/auth';

const props = defineProps({
    show: Boolean,
    user: Object,
});

const emit = defineEmits(['close', 'deleted']);
const authStore = useAuthStore();
const loading = ref(false);

const handleDelete = async () => {
    if (!props.user) return;
    loading.value = true;
    try {
        await authStore.deleteUser(props.user.id);
        emit('deleted');
        emit('close');
    } catch (err) {
        console.error(err);
        alert('Gagal menghapus user');
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="bg-white rounded-xl shadow-lg w-96 p-6">
            <h3 class="text-lg font-bold text-slate-900 mb-4">Hapus User</h3>
            <p class="text-slate-600 mb-6">
                Apakah Anda yakin ingin menghapus user
                <span class="font-semibold">{{ user?.nama }}</span>?
            </p>
            <div class="flex justify-end gap-3">
                <button @click="$emit('close')"
                    class="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                    Batal
                </button>
                <button @click="handleDelete" :disabled="loading"
                    class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                    {{ loading ? 'Menghapus...' : 'Hapus' }}
                </button>
            </div>
        </div>
    </div>
</template>
