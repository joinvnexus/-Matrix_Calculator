<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
      <i class="fas fa-matrix"></i> {{ title }}
    </h3>
    <div class="inline-block border-2 border-blue-500 rounded-lg p-3 bg-gray-50 overflow-x-auto">
      <table class="mx-auto">
        <tr v-for="(row, i) in matrix" :key="i">
          <td v-for="(val, j) in row" :key="j" class="p-1">
            <input
              :value="matrix[i][j]"
              @input="updateValue(i, j, $event.target.value)"
              type="number"
              class="w-14 h-10 text-center text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: String,
  matrix: Array,
})

const emit = defineEmits(['update:matrix'])

const updateValue = (row, col, value) => {
  const newMatrix = props.matrix.map(r => [...r]);
  newMatrix[row][col] = value === '' ? null : Number(value);
  emit('update:matrix', newMatrix);
}
</script>
