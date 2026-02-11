<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Matrix Basic Operations -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      <div class="bg-gray-800 text-white px-4 py-3 flex items-center">
        <i class="fas fa-calculator mr-2 text-blue-400"></i>
        <h3 class="font-bold text-sm uppercase tracking-wider">Basic Operations</h3>
      </div>
      <div class="p-4 grid grid-cols-1 gap-2">
        <button @click="calculateDeterminant" class="op-btn group">
          <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <i class="fas fa-crosshairs text-xs"></i>
          </span>
          Determinant (A)
        </button>
        <button @click="addMatrices" class="op-btn group">
          <span class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <i class="fas fa-plus text-xs"></i>
          </span>
          Add (A + B)
        </button>
        <button @click="subtractMatrices" class="op-btn group">
          <span class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <i class="fas fa-minus text-xs"></i>
          </span>
          Subtract (A - B)
        </button>
        <button @click="multiplyMatrices" class="op-btn group">
          <span class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <i class="fas fa-times text-xs"></i>
          </span>
          Multiply (A × B)
        </button>
      </div>
    </div>

    <!-- Linear Algebra -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      <div class="bg-gray-800 text-white px-4 py-3 flex items-center">
        <i class="fas fa-brain mr-2 text-purple-400"></i>
        <h3 class="font-bold text-sm uppercase tracking-wider">Linear Algebra</h3>
      </div>
      <div class="p-4 grid grid-cols-1 gap-2">
        <button @click="solveLinearEquations" class="op-btn group">
          <span class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <i class="fas fa-equals text-xs"></i>
          </span>
          Solve AX = B
        </button>
        <button @click="calculateEigenvalues" class="op-btn group">
          <span class="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
            <i class="fas fa-wave-square text-xs"></i>
          </span>
          Eigenvalues (A)
        </button>
      </div>
    </div>

    <!-- Decomposition -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      <div class="bg-gray-800 text-white px-4 py-3 flex items-center">
        <i class="fas fa-layer-group mr-2 text-green-400"></i>
        <h3 class="font-bold text-sm uppercase tracking-wider">Decomposition</h3>
      </div>
      <div class="p-4 grid grid-cols-1 gap-2">
        <button @click="luDecomposition" class="op-btn group">
          <span class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <i class="fas fa-columns text-xs"></i>
          </span>
          LU Decomposition
        </button>
        <button @click="qrDecomposition" class="op-btn group">
          <span class="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <i class="fas fa-th-large text-xs"></i>
          </span>
          QR Decomposition
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
.op-btn {
  @apply flex items-center px-3 py-2 text-left text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 active:scale-95;
}
</style>
