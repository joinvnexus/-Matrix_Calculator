<template>
  <div class="space-y-6">
    <!-- Matrix Operations Group -->
    <div class="operation-group bg-white rounded-xl shadow-md overflow-hidden">
      <div class="bg-blue-600 text-white px-6 py-3">
        <h3 class="font-semibold flex items-center gap-2">
          <i class="fas fa-calculator"></i> Matrix Operations
        </h3>
      </div>
      <div class="p-4 flex flex-wrap gap-3">
        <button
          @click="calculateDeterminant"
          class="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i class="fas fa-vector-square"></i> Determinant (A)
        </button>
        <button
          @click="addMatrices"
          class="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i class="fas fa-plus-circle"></i> Add (A+B)
        </button>
        <button
          @click="subtractMatrices"
          class="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i class="fas fa-minus-circle"></i> Subtract (A-B)
        </button>
        <button
          @click="multiplyMatrices"
          class="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i class="fas fa-times-circle"></i> Multiply (A×B)
        </button>
      </div>
    </div>

    <!-- Linear Algebra Group -->
    <div class="operation-group bg-white rounded-xl shadow-md overflow-hidden">
      <div class="bg-green-600 text-white px-6 py-3">
        <h3 class="font-semibold flex items-center gap-2">
          <i class="fas fa-brain"></i> Linear Algebra
        </h3>
      </div>
      <div class="p-4 flex flex-wrap gap-3">
        <button
          @click="solveLinearEquations"
          class="px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i class="fas fa-equals"></i> Solve Equations
        </button>
        <button
          @click="calculateEigenvalues"
          class="px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i class="fas fa-wave-square"></i> Eigenvalues (A)
        </button>
      </div>
    </div>

    <!-- Matrix Decomposition Group -->
    <div class="operation-group bg-white rounded-xl shadow-md overflow-hidden">
      <div class="bg-purple-600 text-white px-6 py-3">
        <h3 class="font-semibold flex items-center gap-2">
          <i class="fas fa-project-diagram"></i> Matrix Decomposition
        </h3>
      </div>
      <div class="p-4 flex flex-wrap gap-3">
        <button
          @click="luDecomposition"
          class="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i class="fas fa-layer-group"></i> LU Decomposition (A)
        </button>
        <button
          @click="qrDecomposition"
          class="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <i class="fas fa-clone"></i> QR Decomposition (A)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
/* No additional styles needed as we use Tailwind */
</style>
