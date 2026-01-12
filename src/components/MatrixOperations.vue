<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- Basic Operations -->
    <div class="bg-blue-600 text-white px-6 py-4 flex items-center">
      <i class="fas fa-calculator mr-3"></i>
      <h2 class="text-lg font-semibold">Matrix Operations</h2>
    </div>
    <div class="p-6">
      <div class="flex flex-wrap gap-3">
        <button @click="calculateDeterminant" class="btn-primary">Det(A)</button>
        <button @click="addMatrices" class="btn-primary">A + B</button>
        <button @click="subtractMatrices" class="btn-primary">A - B</button>
        <button @click="multiplyMatrices" class="btn-primary">A × B</button>
      </div>
    </div>

    <!-- Linear Algebra -->
    <div class="bg-green-600 text-white px-6 py-4 flex items-center">
      <i class="fas fa-brain mr-3"></i>
      <h2 class="text-lg font-semibold">Linear Algebra</h2>
    </div>
    <div class="p-6">
      <div class="flex flex-wrap gap-3">
        <button @click="solveLinearEquations" class="btn-secondary">Solve Ax = b</button>
        <button @click="calculateEigenvalues" class="btn-secondary">Eigenvalues</button>
      </div>
    </div>

    <!-- Decomposition -->
    <div class="bg-red-600 text-white px-6 py-4 flex items-center">
      <i class="fas fa-project-diagram mr-3"></i>
      <h2 class="text-lg font-semibold">Matrix Decomposition</h2>
    </div>
    <div class="p-6">
      <div class="flex flex-wrap gap-3">
        <button @click="luDecomposition" class="btn-danger">LU</button>
        <button @click="qrDecomposition" class="btn-danger">QR</button>
      </div>
    </div>

     <!-- Data Persistence -->
    <div class="bg-gray-700 text-white px-6 py-4 flex items-center">
      <i class="fas fa-save mr-3"></i>
      <h2 class="text-lg font-semibold">Data</h2>
    </div>
    <div class="p-6">
        <div class="flex flex-wrap gap-3">
            <button @click="saveMatrix" class="btn-dark">Save A</button>
            <button @click="loadMatrix" class="btn-dark">Load A</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  calculateDeterminant: Function,
  addMatrices: Function,
  subtractMatrices: Function,
  multiplyMatrices: Function,
  solveLinearEquations: Function,
  calculateEigenvalues: Function,
  luDecomposition: Function,
  qrDecomposition: Function,
  saveMatrix: Function,
  loadMatrix: Function,
});
</script>

<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1;
}
.btn-secondary {
  @apply px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1;
}
.btn-danger {
  @apply px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1;
}
.btn-dark {
    @apply px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex items-center transition transform hover:-translate-y-1;
}
</style>
