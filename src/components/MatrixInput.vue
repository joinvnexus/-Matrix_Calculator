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
            </div>

            <!-- Matrices Container -->
            <div class="flex flex-col md:flex-row gap-6 mb-4">
              <!-- Matrix A -->
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                  <i class="fas fa-matrix"></i> Matrix A
                </h3>
                <MatrixDisplay :matrix="matrixA" @update:matrix="updateMatrixA" />
              </div>

              <!-- Matrix B -->
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                  <i class="fas fa-matrix"></i> Matrix B
                </h3>
                <MatrixDisplay :matrix="matrixB" @update:matrix="updateMatrixB" />
              </div>
            </div>
          </div>
        </div>

        <!-- Operations Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Matrix Operations -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-blue-600 text-white px-6 py-4 flex items-center">
              <i class="fas fa-calculator mr-3"></i>
              <h2 class="text-lg font-semibold">Matrix Operations</h2>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-3 mb-6">
                <button
                  @click="calculateDeterminant"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-determinant mr-2"></i> Det(A)
                </button>
                <button
                  @click="addMatrices"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-plus-circle mr-2"></i> A+B
                </button>
                <button
                  @click="subtractMatrices"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-minus-circle mr-2"></i> A-B
                </button>
                <button
                  @click="multiplyMatrices"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-times-circle mr-2"></i> A×B
                </button>
              </div>

              <!-- Results -->
              <div v-if="operationResult.length || determinant !== null" class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-gray-800 font-medium mb-3 flex items-center">
                  <i class="fas fa-list-alt mr-2"></i> Results
                </h4>
                <div class="bg-white rounded p-3 border border-gray-200 overflow-x-auto">
                  <p v-if="determinant !== null" class="text-gray-800 mb-2">
                    <span class="font-semibold">Determinant of A:</span> {{ determinant }}
                  </p>
                  <div v-if="operationResult.length">
                    <p class="text-gray-800 font-semibold mb-2">Operation Result:</p>
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
                </div>
              </div>
            </div>
          </div>

          <!-- Linear Algebra -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-green-600 text-white px-6 py-4 flex items-center">
              <i class="fas fa-brain mr-3"></i>
              <h2 class="text-lg font-semibold">Linear Algebra</h2>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-3 mb-6">
                <button
                  @click="solveLinearEquations"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-equals mr-2"></i> Solve
                </button>
                <button
                  @click="calculateEigenvalues"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-chart-line mr-2"></i> Eigenvalues
                </button>
              </div>

              <!-- Vector Inputs -->
              <div class="flex flex-wrap gap-3 mb-6">
                <div v-for="(val, index) in vectorB" :key="index" class="flex flex-col">
                  <label class="text-gray-800 text-sm mb-1">Vector b{{index+1}}:</label>
                  <input
                    v-model.number="vectorB[index]"
                    type="number"
                    class="w-20 px-3 py-1 border text-gray-700 border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                </div>
              </div>

              <!-- Results -->
              <div v-if="solution || eigenvalues" class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-gray-800 font-medium mb-3 flex items-center">
                  <i class="fas fa-lightbulb mr-2"></i> Results
                </h4>
                <div class="bg-white rounded p-3 border border-gray-200 overflow-x-auto">
                  <div v-if="solution">
                    <p class="text-gray-800 font-semibold mb-2">Solution:</p>
                    <div class="inline-block border border-gray-200 rounded p-2">
                      <table class="mx-auto">
                        <tr v-for="(val, i) in solution" :key="i">
                          <td class="px-3 py-2 border border-gray-200">{{ val.toFixed(2) }}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <p v-if="eigenvalues" class="text-gray-800 mt-3">
                    <span class="font-semibold">Eigenvalues:</span> {{ eigenvalues }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Matrix Decomposition -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-red-600 text-white px-6 py-4 flex items-center">
              <i class="fas fa-project-diagram mr-3"></i>
              <h2 class="text-lg font-semibold">Matrix Decomposition</h2>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-3 mb-6">
                <button
                  @click="luDecomposition"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-sitemap mr-2"></i> LU
                </button>
                <button
                  @click="qrDecomposition"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-qrcode mr-2"></i> QR
                </button>
              </div>

              <div class="flex flex-wrap gap-3 mb-6">
                <button
                  @click="saveMatrix"
                  class="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-save mr-2"></i> Save
                </button>
                <button
                  @click="loadMatrix"
                  class="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex items-center transition transform hover:-translate-y-1"
                >
                  <i class="fas fa-folder-open mr-2"></i> Load
                </button>
              </div>

              <!-- Results -->
              <div v-if="lu || qr" class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-gray-800 font-medium mb-3 flex items-center">
                  <i class="fas fa-file-alt mr-2"></i> Decomposition
                </h4>
                <div class="bg-white rounded p-3 border border-gray-200 overflow-x-auto">
                  <div v-if="lu">
                    <p class="text-gray-800 font-semibold mb-2">LU Decomposition:</p>
                    <pre class="text-sm bg-gray-100 p-2 rounded overflow-x-auto">{{ formatDecomposition(lu) }}</pre>
                  </div>
                  <div v-if="qr" class="mt-3">
                    <p class="text-gray-800 font-semibold mb-2">QR Decomposition:</p>
                    <pre class="text-sm bg-gray-100 p-2 rounded overflow-x-auto">{{ formatDecomposition(qr) }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="text-center text-blue-200 mt-12 pb-6">
        <p>Matrix Calculator &copy; {{ new Date().getFullYear() }} | Perform complex matrix operations with ease</p>
      </footer>
    </div>
    <ToastMessage :message="error" type="error" />
    <ToastMessage :message="success" type="success" />
  </div>
</template>

<script>
import { useMatrixOperations } from '../composables/useMatrixOperations';
import ToastMessage from './ToastMessage.vue';
import MatrixDisplay from './MatrixDisplay.vue';

export default {
  components: {
    ToastMessage,
    MatrixDisplay
  },
  setup() {
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
      success,
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

    const updateMatrixA = (newMatrix) => {
      matrixA.value = newMatrix;
    };

    const updateMatrixB = (newMatrix) => {
      matrixB.value = newMatrix;
    };

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
      success,
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
      formatDecomposition,
      updateMatrixA,
      updateMatrixB
    };
  }
};
</script>

<style>
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'); */
</style>
