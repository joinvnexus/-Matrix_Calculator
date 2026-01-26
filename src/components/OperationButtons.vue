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
import { defineProps, defineEmits } from 'vue';
import { useMatrixOperations } from '../composables/useMatrixOperations';

const props = defineProps({
  matrixA: Array,
  matrixB: Array,
  vectorB: Array,
});

const emit = defineEmits([
  'determinant',
  'operation-result',
  'solution',
  'eigenvalues',
  'decomposition',
  'error',
]);

const {
  calculateDeterminant: calcDet,
  addMatrices: add,
  subtractMatrices: subtract,
  multiplyMatrices: multiply,
  solveLinearEquations: solve,
  calculateEigenvalues: eigs,
  luDecomposition: lu,
  qrDecomposition: qr,
} = useMatrixOperations();

const handleOperation = (operation, ...args) => {
  const result = operation(...args);
  if (result.error) {
    emit('error', result.error);
  } else {
    return result.data;
  }
};

const calculateDeterminant = () => {
  const data = handleOperation(calcDet, props.matrixA);
  if (data) emit('determinant', data);
};

const addMatrices = () => {
  const data = handleOperation(add, props.matrixA, props.matrixB);
  if (data) emit('operation-result', data);
};

const subtractMatrices = () => {
  const data = handleOperation(subtract, props.matrixA, props.matrixB);
  if (data) emit('operation-result', data);
};

const multiplyMatrices = () => {
  const data = handleOperation(multiply, props.matrixA, props.matrixB);
  if (data) emit('operation-result', data);
};

const solveLinearEquations = () => {
  const data = handleOperation(solve, props.matrixA, props.vectorB);
  if (data) emit('solution', data);
};

const calculateEigenvalues = () => {
  const data = handleOperation(eigs, props.matrixA);
  if (data) emit('eigenvalues', data);
};

const luDecomposition = () => {
  const data = handleOperation(lu, props.matrixA);
  if (data) emit('decomposition', data);
};

const qrDecomposition = () => {
  const data = handleOperation(qr, props.matrixA);
  if (data) emit('decomposition', data);
};
</script>

<style scoped>
/* Operation buttons specific styles */
</style>