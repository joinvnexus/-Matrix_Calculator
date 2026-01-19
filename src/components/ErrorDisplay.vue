<template>
  <div v-if="error" class="bg-red-500 text-white p-4 rounded-lg shadow-lg">
    <p class="font-bold">Error:</p>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: null,
    },
  },
};
</script>
