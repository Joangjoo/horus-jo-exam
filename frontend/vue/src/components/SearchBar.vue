<template>
    <div class="search-bar">
        <div class="relative">
            <!-- Search Icon -->
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            
            <!-- Search Input -->
            <input 
                type="text" 
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                placeholder="Cari berdasarkan nama atau username..."
                class="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#3C467B] focus:border-[#3C467B] transition-all duration-200 outline-none placeholder-slate-400 text-slate-700 shadow-sm hover:shadow-md focus:shadow-md"
            />
            
            <!-- Clear Button (shows when there's text) -->
            <div v-if="modelValue" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button 
                    @click="$emit('update:modelValue', '')"
                    class="text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1 rounded-lg hover:bg-slate-100"
                    type="button"
                >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Search Suggestions/Tips (Optional) -->
        <div class="mt-2 text-xs text-slate-500 flex items-center space-x-4">
            <div class="flex items-center space-x-1">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Tips: Ketik minimal 2 karakter untuk pencarian yang lebih baik</span>
            </div>
        </div>
    </div>
</template>

<script setup>
// Komponen ini dirancang untuk bekerja dengan v-model dari parent.
// 'modelValue' adalah nama prop default untuk v-model.
defineProps(['modelValue']);

// 'update:modelValue' adalah nama event default untuk v-model.
defineEmits(['update:modelValue']);
</script>

<style scoped>
/* Additional custom styles if needed */
.search-bar {
    margin-bottom: 1.5rem;
}

/* Custom focus ring animation */
.search-bar input:focus {
    animation: focus-pulse 0.3s ease-out;
}

@keyframes focus-pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(60, 70, 123, 0.4);
    }
    70% {
        box-shadow: 0 0 0 4px rgba(60, 70, 123, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(60, 70, 123, 0);
    }
}

/* Hover effect enhancement */
.search-bar input:hover:not(:focus) {
    border-color: #94a3b8;
}
</style>