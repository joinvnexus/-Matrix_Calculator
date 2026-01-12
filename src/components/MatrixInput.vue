<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="bg-gray-800 text-white px-6 py-4 flex items-center">
      <i class="fas fa-sliders-h mr-3"></i>
      <h2 class="text-lg font-semibold">Matrix Configuration</h2>
    </div>
    <div class="p-6">
      <!-- Size Controls -->
      <div class="flex flex-wrap items-center gap-4 mb-6">
        <div class="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center">
          <label for="matrix-size" class="mr-3 font-medium flex items-center">
            <i class="fas fa-ruler mr-2"></i> Matrix Size:
          </label>
          <input
            id="matrix-size"
            type="number"
            :value="matrixSize"
            @input="$emit('update:matrixSize', parseInt($event.target.value))"
            min="1"
            max="10"
            class="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
      </div>

      <!-- Matrices Container -->
      <div class="flex flex-col md:flex-row gap-6 mb-4">
        <!-- Matrix A -->
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
            <i class="fas fa-square-root-alt"></i> Matrix A
          </h3>
          <div class="inline-block border-2 border-blue-500 rounded-lg p-3 bg-gray-50 overflow-x-auto">
            <table class="mx-auto">
              <tbody>
                <tr v-for="(row, i) in matrixA" :key="i">
                  <td v-for="(val, j) in row" :key="j" class="p-1">
                    <input
                      :value="matrixA[i][j]"
                      @input="updateMatrixA(i, j, $event.target.value)"
                      type="number"
                      class="w-14 h-10 text-center text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Matrix B -->
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
            <i class="fas fa-square-root-alt"></i> Matrix B
          </h3>
          <div class="inline-block border-2 border-purple-500 rounded-lg p-3 bg-gray-50 overflow-x-auto">
            <table class="mx-auto">
              <tbody>
                <tr v-for="(row, i) in matrixB" :key="i">
                  <td v-for="(val, j) in row" :key="j" class="p-1">
                    <input
                      :value="matrixB[i][j]"
                      @input="updateMatrixB(i, j, $event.target.value)"
                      type="number"
                      class="w-14 h-10 text-center text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Vector B -->
        <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                <i class="fas fa-arrows-alt-v"></i> Vector B
            </h3>
            <div class="inline-block border-2 border-green-500 rounded-lg p-3 bg-gray-50 overflow-x-auto">
                <table class="mx-auto">
                    <tbody>
                        <tr v-for="(val, i) in vectorB" :key="i">
                            <td class="p-1">
                                <input
                                  :value="vectorB[i]"
                                  @input="updateVectorB(i, $event.target.value)"
                                  type="number"
                                  class="w-14 h-10 text-center text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  matrixSize: Number,
  matrixA: Array,
  matrixB: Array,
  vectorB: Array
});

const emit = defineEmits(['update:matrixSize', 'update:matrixA', 'update:matrixB', 'update:vectorB']);

const updateMatrixA = (i, j, value) => {
  const newMatrix = props.matrixA.map(row => [...row]);
  newMatrix[i][j] = parseFloat(value) || 0;
  emit('update:matrixA', newMatrix);
};

const updateMatrixB = (i, j, value) => {
  const newMatrix = props.matrixB.map(row => [...row]);
  newMatrix[i][j] = parseFloat(value) || 0;
  emit('update:matrixB', newMatrix);
};

const updateVectorB = (i, value) => {
  const newVector = [...props.vectorB];
  newVector[i] = parseFloat(value) || 0;
  emit('update:vectorB', newVector);
};
</script>
