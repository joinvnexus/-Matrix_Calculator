<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-gray-100 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <AppHeader />
      <main class="space-y-8">
        <MatrixInput
          v-model:matrixSize="matrixSize"
          v-model:matrixA="matrixA"
          v-model:matrixB="matrixB"
          v-model:vectorB="vectorB"
        />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MatrixOperations
            :calculate-determinant="calculateDeterminant"
            :add-matrices="addMatrices"
            :subtract-matrices="subtractMatrices"
            :multiply-matrices="multiplyMatrices"
            :solve-linear-equations="solveLinearEquations"
            :calculate-eigenvalues="calculateEigenvalues"
            :lu-decomposition="luDecomposition"
            :qr-decomposition="qrDecomposition"
            :save-matrix="saveMatrix"
            :load-matrix="loadMatrix"
          />
          <MatrixResult
            :operation-result="operationResult"
            :determinant="determinant"
            :solution="solution"
            :eigenvalues="eigenvalues"
            :lu="lu"
            :qr="qr"
            :error="error"
            :format-decomposition="formatDecomposition"
          />
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import MatrixInput from './components/MatrixInput.vue';
import MatrixOperations from './components/MatrixOperations.vue';
import MatrixResult from './components/MatrixResult.vue';
import { useMatrixOperations } from './composables/useMatrixOperations';

const {
  matrixSize,
  matrixA,
  matrixB,
  vectorB,
  operationResult,
  determinant,
  solution,
  eigenvalues,
  lu,
  qr,
  error,
  calculateDeterminant,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  solveLinearEquations,
  calculateEigenvalues,
  luDecomposition,
  qrDecomposition,
  saveMatrix,
  loadMatrix,
  formatDecomposition
} = useMatrixOperations();

provide('matrixSize', matrixSize);
provide('matrixA', matrixA);
provide('matrixB', matrixB);
provide('vectorB', vectorB);
</script>
