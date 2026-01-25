<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-gray-100 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
          <i class="fas fa-calculator"></i> Matrix Calculator
        </h1>
        <p class="text-blue-200 max-w-2xl mx-auto">
          Perform matrix operations, solve linear equations, and decompose matrices with this powerful calculator
        </p>
      </header>

      <!-- Main Content -->
      <main class="space-y-8">
        <!-- Matrix Configuration Card -->
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
                  v-model.number="matrixSize"
                  min="1"
                  max="10"
                  class="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div class="flex flex-wrap gap-3">
                <button
                  @click="saveMatrix"
                  class="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-save mr-2"></i> Save Matrix A
                </button>
                <button
                  @click="loadMatrix"
                  class="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-folder-open mr-2"></i> Load Matrix A
                </button>
              </div>
            </div>

            <!-- Matrices Container -->
            <div class="flex flex-col md:flex-row gap-6 mb-4">
              <MatrixDisplay title="Matrix A" :matrix="matrixA" @update:matrix="matrixA = $event" />
              <MatrixDisplay title="Matrix B" :matrix="matrixB" @update:matrix="matrixB = $event" />
            </div>
          </div>
        </div>

        <!-- Operations Section -->
        <OperationButtons
          :matrixA="matrixA"
          :matrixB="matrixB"
          :vectorB="vectorB"
          @determinant="handleDeterminant"
          @operation-result="handleOperationResult"
          @solution="handleSolution"
          @eigenvalues="handleEigenvalues"
          @decomposition="handleDecomposition"
          @error="handleError"
        />

        <!-- Error Display -->
        <ErrorDisplay v-if="error" :message="error" />

        <!-- Results Section -->
        <ResultsDisplay
          :operationResult="operationResult"
          :determinant="determinant"
          :solution="solution"
          :eigenvalues="eigenvalues"
          :lu="lu"
          :qr="qr"
        />
      </main>

      <!-- Footer -->
      <footer class="text-center text-blue-200 mt-12 pb-6">
        <p>Matrix Calculator &copy; {{ new Date().getFullYear() }} | Perform complex matrix operations with ease</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { createApp, ref, watch } from 'vue';
import OperationButtons from './OperationButtons.vue';
import ErrorDisplay from './ErrorDisplay.vue';
import MatrixDisplay from './MatrixDisplay.vue';
import ResultsDisplay from './ResultsDisplay.vue';

export default {
  components: {
    OperationButtons,
    ErrorDisplay,
    MatrixDisplay,
    ResultsDisplay,
  },
  setup() {
    const matrixSize = ref(3);
    const matrixA = ref(createMatrix(matrixSize.value));
    const matrixB = ref(createMatrix(matrixSize.value));
    const vectorB = ref(Array(matrixSize.value).fill(0));
    const operationResult = ref([]);
    const determinant = ref(null);
    const solution = ref(null);
    const eigenvalues = ref(null);
    const lu = ref(null);
    const qr = ref(null);
    const error = ref(null);

    function createMatrix(size) {
      return Array.from({ length: size }, () => Array(size).fill(0));
    }

    function resetResults() {
      operationResult.value = [];
      determinant.value = null;
      solution.value = null;
      eigenvalues.value = null;
      lu.value = null;
      qr.value = null;
      error.value = null;
    }

    watch(matrixSize, (newSize) => {
      matrixA.value = createMatrix(newSize);
      matrixB.value = createMatrix(newSize);
      vectorB.value = Array(newSize).fill(0);
      resetResults();
    });

    return {
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
      handleDeterminant(det) {
        resetResults();
        determinant.value = det;
      },
      handleOperationResult(result) {
        resetResults();
        operationResult.value = result;
      },
      handleSolution(sol) {
        resetResults();
        solution.value = sol;
      },
      handleEigenvalues(eig) {
        resetResults();
        eigenvalues.value = eig;
      },
      handleDecomposition({ type, data }) {
        resetResults();
        if (type === 'lu') {
          lu.value = data;
        } else if (type === 'qr') {
          qr.value = data;
        }
      },
      handleError(errorMessage) {
        resetResults();
        error.value = errorMessage;
      },
      saveMatrix() {
        localStorage.setItem('savedMatrixA', JSON.stringify(matrixA.value));
        alert('Matrix A saved successfully!');
      },
      loadMatrix() {
        const saved = localStorage.getItem('savedMatrixA');
        if (saved) {
          matrixA.value = JSON.parse(saved);
          matrixSize.value = matrixA.value.length;
          alert('Matrix A loaded successfully!');
        } else {
          alert('No matrix saved yet.');
        }
      },
    };
  }
};

const app = createApp({
  template: '#app-template',
  setup() {
    return {};
  }
});

app.mount('#app');
</script>

<style>
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'); */
</style>