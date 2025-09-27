<script setup>
import { defineProps, defineEmits,computed } from 'vue';

const props = defineProps({
    users: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['on-update', 'on-delete']);

const handleUpdate = (user) => {
    emit('on-update', user);
};

const handleDelete = (user) => {
    emit('on-delete', user);
};

const sortedUsers = computed(() => {
    return [...props.users].sort((a, b) => a.id - b.id);
});
</script>

<template>
    <div class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-slate-200">
        <table class="w-full">
            <thead>
                <tr class="bg-slate-50 border-b border-slate-200">
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                </path>
                            </svg>
                            <span>Nama</span>
                        </div>
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
                                </path>
                            </svg>
                            <span>Username</span>
                        </div>
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                </path>
                            </svg>
                            <span>Email</span>
                        </div>
                    </th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        <div class="flex items-center justify-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4">
                                </path>
                            </svg>
                            <span>Aksi</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
                <tr v-for="(user, index) in sortedUsers" :key="user.id"
                    class="hover:bg-slate-50 transition-colors duration-200">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <div
                                    class="h-10 w-10 rounded-full bg-gradient-to-r from-[#3C467B] to-[#2d3660] flex items-center justify-center">
                                    <span class="text-sm font-medium text-white">
                                        {{ user.nama ? user.nama.charAt(0).toUpperCase() : 'U' }}
                                    </span>
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-slate-900">{{ user.nama }}</div>
                                <div class="text-sm text-slate-500">ID: {{ user.id }}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <span
                                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                @{{ user.username }}
                            </span>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ user.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                        <button @click="handleUpdate(user)"
                            class="inline-flex items-center px-4 py-2 bg-[#3C467B] text-white font-medium rounded-xl hover:bg-[#2d3660] focus:ring-4 focus:ring-[#3C467B]/20 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
                            Update
                        </button>
                        <button @click="handleDelete(user)"
                            class="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 ml-2">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="users.length === 0" class="text-center py-12 text-slate-500">
            Belum ada pengguna untuk ditampilkan.
        </div>
    </div>
</template>
