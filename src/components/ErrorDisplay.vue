<template>
  <div v-if="message" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
    <div class="flex">
      <div class="py-1"><i class="fas fa-exclamation-triangle mr-3"></i></div>
      <div>
        <p class="font-bold">An error occurred:</p>
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>
