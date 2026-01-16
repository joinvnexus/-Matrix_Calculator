<template>
  <div v-if="visible" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white" :class="typeClass">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'success' // success or error
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const visible = ref(false);

    const typeClass = {
      success: 'bg-green-500',
      error: 'bg-red-500'
    }[props.type];

    watch(() => props.message, (newMessage) => {
      if (newMessage) {
        visible.value = true;
        setTimeout(() => {
          visible.value = false;
          emit('update:visible', false);
        }, props.duration);
      }
    });

    return {
      visible,
      typeClass
    };
  }
};
</script>
