<template>
  <div v-if="hasResults" class="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
    <div class="bg-gray-800 text-white px-6 py-4 flex items-center">
      <i class="fas fa-list-alt mr-3"></i>
      <h2 class="text-lg font-semibold">Results</h2>
    </div>
    <div class="p-6 overflow-x-auto">
      <div v-if="determinant !== null" class="mb-4">
        <p class="font-semibold text-gray-800">Determinant of A:</p>
        <p class="text-lg font-mono text-blue-600">{{ determinant }}</p>
      </div>
      <div v-if="operationResult.length" class="mb-4">
        <p class="font-semibold text-gray-800">Operation Result:</p>
        <div class="inline-block border border-gray-200 rounded p-2">
          <table class="mx-auto">
            <tr v-for="(row, i) in operationResult" :key="i">
              <td v-for="(val, j) in row" :key="j" class="px-3 py-2 text-gray-800 border border-gray-200">
                {{ val.toFixed(2) }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="solution" class="mb-4">
        <p class="font-semibold text-gray-800">Solution:</p>
         <div class="inline-block border border-gray-200 rounded p-2">
          <table class="mx-auto">
            <tr v-for="(val, i) in solution" :key="i">
              <td class="px-3 py-2 border border-gray-200">{{ val.toFixed(2) }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="eigenvalues" class="mb-4">
        <p class="font-semibold text-gray-800">Eigenvalues:</p>
        <p class="text-lg font-mono text-green-600">{{ eigenvalues }}</p>
      </div>
      <div v-if="lu">
        <p class="font-semibold text-gray-800">LU Decomposition:</p>
        <pre class="text-sm bg-gray-100 p-2 rounded overflow-x-auto">{{ formatDecomposition(lu) }}</pre>
      </div>
      <div v-if="qr" class="mt-3">
        <p class="font-semibold text-gray-800">QR Decomposition:</p>
        <pre class="text-sm bg-gray-100 p-2 rounded overflow-x-auto">{{ formatDecomposition(qr) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import * as math from 'mathjs';

const props = defineProps({
  operationResult: Array,
  determinant: Number,
  solution: Array,
  eigenvalues: String,
  lu: Object,
  qr: Object,
});

const hasResults = computed(() => {
  return props.operationResult.length || props.determinant !== null || props.solution || props.eigenvalues || props.lu || props.qr;
});

const formatDecomposition = (decomp) => {
  let result = '';
  for (const [key, value] of Object.entries(decomp)) {
    result += `${key}:\n`;
    result += math.format(value, { precision: 4 }) + '\n\n';
  }
  return result;
}
</script>
