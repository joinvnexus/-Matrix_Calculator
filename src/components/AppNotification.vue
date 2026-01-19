<template>
  <div v-if="show" class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300" :class="{ 'opacity-0': !show }">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
