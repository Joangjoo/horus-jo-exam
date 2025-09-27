<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const props = defineProps({
    users: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['on-delete']);

const router = useRouter();
const authStore = useAuthStore();

const goToUpdate = (user) => {
    router.push({ name: 'UpdateUser', params: { id: user.id } });
};

const handleDelete = async (userId) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
        emit('on-delete', userId);
    }
};
</script>

<template>
    <table class="w-full border border-gray-200 rounded shadow">
        <thead>
            <tr class="bg-gray-100">
                <th class="p-2 border">ID</th>
                <th class="p-2 border">Nama</th>
                <th class="p-2 border">Username</th>
                <th class="p-2 border">Email</th>
                <th class="p-2 border">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td class="p-2 border">{{ user.id }}</td>
                <td class="p-2 border">{{ user.nama }}</td>
                <td class="p-2 border">{{ user.username }}</td>
                <td class="p-2 border">{{ user.email }}</td>
                <td class="p-2 border flex gap-2">
                    <button @click="goToUpdate(user)" class="bg-yellow-500 text-white px-2 py-1 rounded">
                        Update
                    </button>
                    <button @click="handleDelete(user.id)" class="bg-red-600 text-white px-2 py-1 rounded">
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
