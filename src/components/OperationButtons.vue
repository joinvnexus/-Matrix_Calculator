<template>
  <div class="operations-container">
    <div class="operation-group">
      <h3><i class="fas fa-calculator"></i> Matrix Operations</h3>
      <div class="btn-group">
        <button @click="calculateDeterminant">
          <i class="fas fa-determinant"></i> Determinant (A)
        </button>
        <button @click="addMatrices">
          <i class="fas fa-plus-circle"></i> Add (A+B)
        </button>
        <button @click="subtractMatrices">
          <i class="fas fa-minus-circle"></i> Subtract (A-B)
        </button>
        <button @click="multiplyMatrices">
          <i class="fas fa-times-circle"></i> Multiply (A×B)
        </button>
      </div>
    </div>

    <div class="operation-group">
      <h3><i class="fas fa-brain"></i> Linear Algebra</h3>
      <div class="btn-group">
        <button @click="solveLinearEquations">
          <i class="fas fa-equals"></i> Solve Equations
        </button>
        <button @click="calculateEigenvalues">
          <i class="fas fa-chart-line"></i> Eigenvalues (A)
        </button>
        <button @click="invertMatrix">
          <i class="fas fa-retweet"></i> Invert (A)
        </button>
      </div>
    </div>

    <div class="operation-group">
      <h3><i class="fas fa-project-diagram"></i> Matrix Decomposition</h3>
      <div class="btn-group">
        <button @click="luDecomposition">
          <i class="fas fa-sitemap"></i> LU Decomposition (A)
        </button>
        <button @click="qrDecomposition">
          <i class="fas fa-qrcode"></i> QR Decomposition (A)
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
  qrDecomposition,
  invertMatrix
} = useMatrixOperations(props, emit)
</script>

<style scoped>
/* Operation buttons specific styles */
</style>