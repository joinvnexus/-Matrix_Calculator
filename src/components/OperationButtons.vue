<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
      <div class="bg-blue-600 text-white px-4 py-3 flex items-center">
        <i class="fas fa-calculator mr-2"></i>
        <h3 class="font-semibold text-sm uppercase tracking-wider text-blue-50">Matrix Operations</h3>
      </div>
      <div class="p-4 flex flex-col gap-3 flex-grow">
        <button @click="calculateDeterminant" class="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg flex items-center justify-between transition group">
          <span class="flex items-center"><i class="fas fa-minus-square mr-2 opacity-50"></i> Determinant (A)</span>
          <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition"></i>
        </button>
        <button @click="addMatrices" class="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg flex items-center justify-between transition group">
          <span class="flex items-center"><i class="fas fa-plus-circle mr-2 opacity-50"></i> Add (A+B)</span>
          <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition"></i>
        </button>
        <button @click="subtractMatrices" class="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg flex items-center justify-between transition group">
          <span class="flex items-center"><i class="fas fa-minus-circle mr-2 opacity-50"></i> Subtract (A-B)</span>
          <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition"></i>
        </button>
        <button @click="multiplyMatrices" class="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg flex items-center justify-between transition group">
          <span class="flex items-center"><i class="fas fa-times-circle mr-2 opacity-50"></i> Multiply (A×B)</span>
          <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition"></i>
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
      <div class="bg-green-600 text-white px-4 py-3 flex items-center">
        <i class="fas fa-brain mr-2"></i>
        <h3 class="font-semibold text-sm uppercase tracking-wider text-green-50">Linear Algebra</h3>
      </div>
      <div class="p-4 flex flex-col gap-3 flex-grow">
        <button @click="solveLinearEquations" class="w-full py-2 px-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg flex items-center justify-between transition group">
          <span class="flex items-center"><i class="fas fa-equals mr-2 opacity-50"></i> Solve Equations</span>
          <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition"></i>
        </button>
        <button @click="calculateEigenvalues" class="w-full py-2 px-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg flex items-center justify-between transition group">
          <span class="flex items-center"><i class="fas fa-chart-line mr-2 opacity-50"></i> Eigenvalues (A)</span>
          <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition"></i>
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
      <div class="bg-purple-600 text-white px-4 py-3 flex items-center">
        <i class="fas fa-project-diagram mr-2"></i>
        <h3 class="font-semibold text-sm uppercase tracking-wider text-purple-50">Decomposition</h3>
      </div>
      <div class="p-4 flex flex-col gap-3 flex-grow">
        <button @click="luDecomposition" class="w-full py-2 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg flex items-center justify-between transition group">
          <span class="flex items-center"><i class="fas fa-sitemap mr-2 opacity-50"></i> LU Decomposition (A)</span>
          <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition"></i>
        </button>
        <button @click="qrDecomposition" class="w-full py-2 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg flex items-center justify-between transition group">
          <span class="flex items-center"><i class="fas fa-qrcode mr-2 opacity-50"></i> QR Decomposition (A)</span>
          <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useMatrixOperations } from '../composables/useMatrixOperations'

const props = defineProps({
  matrixA: Array,
  matrixB: Array,
  vectorB: Array
})

const emit = defineEmits([
  'determinant',
  'operation-result',
  'solution',
  'eigenvalues',
  'decomposition',
  'error'
])

const { 
  calculateDeterminant,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  solveLinearEquations,
  calculateEigenvalues,
  luDecomposition,
  qrDecomposition
} = useMatrixOperations(props, emit)
</script>

<style scoped>
</style>