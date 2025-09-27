<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../store/auth';
import UpdateUserModal from '../components/UpdateUserModal.vue';
import SearchBar from '../components/SearchBar.vue';

const authStore = useAuthStore();
const users = ref([]);

const showModal = ref(false);
const selectedUser = ref(null);
const searchQuery = ref('');

const fetchUsers = async () => {
    await authStore.fetchAllUsers();
    users.value = authStore.users;
};

const openUpdateModal = (user) => {
    selectedUser.value = user;
    showModal.value = true;
};

// Computed property untuk filtered users berdasarkan search query
const filteredUsers = computed(() => {
    if (!searchQuery.value.trim()) {
        return users.value;
    }
    
    const query = searchQuery.value.toLowerCase().trim();
    return users.value.filter(user => {
        const nama = user.nama?.toLowerCase() || '';
        const username = user.username?.toLowerCase() || '';
        const email = user.email?.toLowerCase() || '';
        
        return nama.includes(query) || 
               username.includes(query) || 
               email.includes(query);
    });
});

// Computed properties untuk stats berdasarkan filtered data
const totalUsers = computed(() => users.value.length);
const filteredUsersCount = computed(() => filteredUsers.value.length);
const activeUsers = computed(() => users.value.length); // Assuming all users are active
const isSearchActive = computed(() => searchQuery.value.trim().length > 0);

onMounted(fetchUsers);
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-6">
        <div class="max-w-6xl mx-auto">
            <!-- Header Section -->
            <div class="mb-8 text-center">
                <h1 class="text-3xl font-bold text-[#3C467B] mb-2">Manajemen User</h1>
                <p class="text-slate-600">Kelola data pengguna sistem</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-[#3C467B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-slate-600">Total User</p>
                            <p class="text-2xl font-bold text-[#3C467B]">{{ totalUsers }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-slate-600">Active Users</p>
                            <p class="text-2xl font-bold text-green-600">{{ activeUsers }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-slate-600">
                                {{ isSearchActive ? 'Hasil Pencarian' : 'Ready to Search' }}
                            </p>
                            <p class="text-2xl font-bold text-orange-600">{{ filteredUsersCount }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Table Card -->
            <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <!-- Table Header with Search -->
                <div class="bg-gradient-to-r from-[#3C467B] to-[#2d3660] px-6 py-6">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h2 class="text-xl font-bold text-white flex items-center">
                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                                Daftar Pengguna
                            </h2>
                            <p class="text-white/80 text-sm mt-1">
                                {{ isSearchActive ? 
                                    `Menampilkan ${filteredUsersCount} dari ${totalUsers} pengguna` : 
                                    `${totalUsers} pengguna terdaftar` 
                                }}
                            </p>
                        </div>
                        
                        <!-- Search Bar in Header -->
                        <div class="lg:w-96">
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <input 
                                    type="text" 
                                    v-model="searchQuery"
                                    placeholder="Cari nama, username, atau email..."
                                    class="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all duration-200"
                                />
                                <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button 
                                        @click="searchQuery = ''"
                                        class="text-white/60 hover:text-white transition-colors duration-200 p-1"
                                    >
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Search Results Info -->
                    <div v-if="isSearchActive" class="mt-4 flex items-center text-white/80 text-sm">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Pencarian untuk "{{ searchQuery }}"</span>
                        <button @click="searchQuery = ''" class="ml-3 text-white/80 hover:text-white underline">
                            Hapus filter
                        </button>
                    </div>
                </div>

                <!-- Table Content -->
                <div class="overflow-x-auto">
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
                            <tr v-for="(user, index) in filteredUsers" :key="user.id"
                                class="hover:bg-slate-50 transition-colors duration-200"
                                :class="{ 'bg-slate-25': index % 2 === 0 }">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#3C467B] to-[#2d3660] flex items-center justify-center">
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
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                            @{{ user.username }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-slate-900 flex items-center">
                                        <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                            </path>
                                        </svg>
                                        {{ user.email }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <button @click="openUpdateModal(user)"
                                        class="inline-flex items-center px-4 py-2 bg-[#3C467B] text-white font-medium rounded-xl hover:bg-[#2d3660] focus:ring-4 focus:ring-[#3C467B]/20 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                            </path>
                                        </svg>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Empty State atau No Search Results -->
                    <div v-if="filteredUsers.length === 0" class="text-center py-12">
                        <div class="mx-auto h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <svg v-if="!isSearchActive" class="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                            <svg v-else class="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-slate-900 mb-2">
                            {{ isSearchActive ? 'Tidak ada hasil pencarian' : 'Belum ada pengguna' }}
                        </h3>
                        <p class="text-slate-500 mb-4">
                            {{ isSearchActive ? 
                                `Tidak ditemukan pengguna yang cocok dengan "${searchQuery}"` : 
                                'Data pengguna akan ditampilkan di sini setelah ada yang terdaftar.' 
                            }}
                        </p>
                        <button v-if="isSearchActive" @click="searchQuery = ''" 
                            class="inline-flex items-center px-4 py-2 bg-[#3C467B] text-white rounded-lg hover:bg-[#2d3660] transition-colors duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            Hapus Pencarian
                        </button>
                    </div>
                </div>

                <!-- Table Footer -->
                <div class="bg-slate-50 px-6 py-3 border-t border-slate-200">
                    <div class="flex items-center justify-between text-sm text-slate-600">
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>
                                {{ isSearchActive ? 
                                    `Menampilkan ${filteredUsersCount} hasil dari ${totalUsers} pengguna` :
                                    `Menampilkan ${totalUsers} pengguna`
                                }}
                            </span>
                        </div>
                        <div class="text-right">
                            <span class="font-medium">Total: {{ totalUsers }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Update -->
        <UpdateUserModal :show="showModal" :user="selectedUser" @close="showModal = false" @updated="fetchUsers" />
    </div>
</template>