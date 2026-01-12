<template>
  <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
    <strong class="font-bold">Error:</strong>
    <span class="block sm:inline">{{ error }}</span>
  </div>

  <div v-if="determinant !== null || operationResult.length > 0 || solution !== null || eigenvalues !== null || lu !== null || qr !== null"
       class="bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="bg-gray-800 text-white px-6 py-4 flex items-center">
      <i class="fas fa-poll mr-3"></i>
      <h2 class="text-lg font-semibold">Results</h2>
    </div>
    <div class="p-6 space-y-4">
      <!-- Determinant -->
      <div v-if="determinant !== null">
        <h3 class="font-semibold text-gray-800">Determinant of A:</h3>
        <p class="text-lg font-mono bg-gray-100 p-2 rounded">{{ determinant }}</p>
      </div>

      <!-- Operation Result -->
      <div v-if="operationResult.length > 0">
        <h3 class="font-semibold text-gray-800">Operation Result:</h3>
        <div class="overflow-x-auto bg-gray-100 p-2 rounded">
          <table class="mx-auto border-collapse">
            <tr v-for="(row, i) in operationResult" :key="i">
              <td v-for="(val, j) in row" :key="j" class="px-3 py-2 border border-gray-300 font-mono text-center">
                {{ typeof val === 'number' ? val.toFixed(2) : val }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Linear Equation Solution -->
      <div v-if="solution !== null">
        <h3 class="font-semibold text-gray-800">Solution (x):</h3>
         <div class="overflow-x-auto bg-gray-100 p-2 rounded">
          <table class="mx-auto border-collapse">
            <tr v-for="(val, i) in solution" :key="i">
              <td class="px-3 py-2 border border-gray-300 font-mono text-center">
                {{ typeof val === 'number' ? val.toFixed(4) : val }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Eigenvalues -->
      <div v-if="eigenvalues !== null">
        <h3 class="font-semibold text-gray-800">Eigenvalues of A:</h3>
        <p class="text-lg font-mono bg-gray-100 p-2 rounded break-words">{{ eigenvalues }}</p>
      </div>

      <!-- LU Decomposition -->
      <div v-if="lu !== null">
        <h3 class="font-semibold text-gray-800">LU Decomposition:</h3>
        <pre class="text-sm bg-gray-100 p-2 rounded overflow-x-auto">{{ formatDecomposition(lu) }}</pre>
      </div>

      <!-- QR Decomposition -->
      <div v-if="qr !== null">
        <h3 class="font-semibold text-gray-800">QR Decomposition:</h3>
        <pre class="text-sm bg-gray-100 p-2 rounded overflow-x-auto">{{ formatDecomposition(qr) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  operationResult: { type: Array, default: () => [] },
  determinant: { type: Number, default: null },
  solution: { type: Array, default: null },
  eigenvalues: { type: String, default: null },
  lu: { type: Object, default: null },
  qr: { type: Object, default: null },
  error: { type: String, default: null },
  formatDecomposition: { type: Function, required: true }
});
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
