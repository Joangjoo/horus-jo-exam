<!-- src/components/SearchBar.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: String,       
    placeholder: {
        type: String,
        default: 'Cari nama, username, atau email...'
    }
});

const emit = defineEmits(['update:modelValue']);

const clear = () => emit('update:modelValue', '');
const updateValue = (event) => emit('update:modelValue', event.target.value);
</script>

<template>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>
        <input type="text" :placeholder="placeholder" :value="modelValue" @input="updateValue"
            class="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all duration-200" />
        <div v-if="modelValue" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button @click="clear" class="text-white/60 hover:text-white transition-colors duration-200 p-1">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
        </div>
    </div>
</template>
