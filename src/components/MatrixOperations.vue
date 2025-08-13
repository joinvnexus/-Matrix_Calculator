<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden h-full">
    <div class="bg-blue-600 text-white px-6 py-4 flex items-center">
      <i class="fas fa-calculator mr-3"></i>
      <h2 class="text-xl font-semibold">Matrix Operations</h2>
    </div>
    
    <div class="p-6">
      <div class="flex flex-wrap gap-3 mb-6">
        <button
          @click="calculateDeterminant"
          class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <i class="fas fa-determinant mr-2"></i> Determinant (A)
        </button>
        <button
          @click="addMatrices"
          class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <i class="fas fa-plus-circle mr-2"></i> Add (A+B)
        </button>
        <button
          @click="subtractMatrices"
          class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <i class="fas fa-minus-circle mr-2"></i> Subtract (A-B)
        </button>
        <button
          @click="multiplyMatrices"
          class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <i class="fas fa-times-circle mr-2"></i> Multiply (A×B)
        </button>
      </div>

      <div v-if="determinant !== null || operationResult.length" class="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 class="font-semibold mb-3 flex items-center">
          <i class="fas fa-list-alt mr-2"></i> Results
        </h3>
        
        <div class="space-y-4">
          <div v-if="determinant !== null">
            <p class="font-medium">Determinant of A:</p>
            <p class="text-xl font-mono">{{ determinant }}</p>
          </div>

          <div v-if="operationResult.length">
            <p class="font-medium">Operation Result:</p>
            <div class="overflow-x-auto">
              <table class="mx-auto border">
                <tr v-for="(row, i) in operationResult" :key="i">
                  <td v-for="(val, j) in row" :key="j" class="px-4 py-2 border font-mono">
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
</template>

<script>
import * as math from 'mathjs'

export default {
  props: {
    matrixA: Array,
    matrixB: Array
  },
  emits: ['determinant', 'operation-result' ],
  /**
   * Sets up the component's state and functions.
   *
   * @param {object} props - The component's props.
   * @param {object} context - The component's context.
   *
   * @returns {object} An object with the component's state and functions.
   */
  setup(props, { emit }) {
    // const determinant = ref(null)
    // const operationResult = ref([])

    function calculateDeterminant() {
      try {
        const det = math.det(props.matrixA)
        emit('determinant', det)
      } catch (error) {
        console.error('Error calculating determinant:', error)
      }
    }

    function addMatrices() {
      try {
        const result = math.add(props.matrixA, props.matrixB)
        emit('operation-result', result)
      } catch (error) {
        console.error('Error adding matrices:', error)
      }
    }

    function subtractMatrices() {
      try {
        const result = math.subtract(props.matrixA, props.matrixB)
        emit('operation-result', result)
      } catch (error) {
        console.error('Error subtracting matrices:', error)
      }
    }

    function multiplyMatrices() {
      try {
        const result = math.multiply(props.matrixA, props.matrixB)
        emit('operation-result', result)
      } catch (error) {
        console.error('Error multiplying matrices:', error)
      }
    }

    return {
      // determinant,
      // operationResult,
      calculateDeterminant,
      addMatrices,
      subtractMatrices,
      multiplyMatrices
    }
  }
}
</script>