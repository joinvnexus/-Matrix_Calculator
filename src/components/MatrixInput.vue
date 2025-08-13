<template>
    <div>
      <h2>Matrix Calculator</h2>
      <div>
        <label for="matrix-size">Matrix Size:</label>
        <input
          id="matrix-size"
          type="number"
          v-model.number="matrixSize"
          min="1"
          max="10"
        />
      </div>
      <div class="matrix-grid">
        <table>
          <tr v-for="(row, i) in matrixA" :key="i">
            <td v-for="(val, j) in row" :key="j">
              <input v-model.number="matrixA[i][j]" type="number" />
            </td>
          </tr>
        </table>
      </div>
      <button @click="calculateDeterminant">Calculate Determinant</button>
      <p v-if="determinant !== null">Determinant: {{ determinant }}</p>
  
      <h3>Matrix Operations</h3>
      <button @click="addMatrices">Add Matrices</button>
      <button @click="subtractMatrices">Subtract Matrices</button>
      <button @click="multiplyMatrices">Multiply Matrices</button>
      <p v-if="operationResult.length">Result: {{ operationResult }}</p>
  
      <h3>Linear Algebra</h3>
      <button @click="solveLinearEquations">Solve Equations</button>
      <button @click="calculateEigenvalues">Eigenvalues</button>
      <p v-if="solution">Solution: {{ solution }}</p>
      <p v-if="eigenvalues">Eigenvalues: {{ eigenvalues }}</p>
  
      <h3>Matrix Decomposition</h3>
      <button @click="luDecomposition">LU Decomposition</button>
      <button @click="qrDecomposition">QR Decomposition</button>
      <p v-if="lu">LU: {{ lu }}</p>
      <p v-if="qr">QR: {{ qr }}</p>
  
      <h3>Save/Load Matrices</h3>
      <button @click="saveMatrix">Save Matrix</button>
      <button @click="loadMatrix">Load Matrix</button>
    </div>
  </template>
  
  <script>
  import {
    determinant,
    add,
    subtract,
    multiply,
    eig,
    lusolve,
    lup,
    qr,
  } from 'mathjs';
  
  export default {
    data() {
      return {
        matrixSize: 3,
        matrixA: this.createMatrix(3),
        matrixB: this.createMatrix(3),
        operationResult: [],
        determinant: null,
        solution: null,
        eigenvalues: null,
        lu: null,
        qr: null,
        savedMatrix: null,
      };
    },
    watch: {
      matrixSize(newSize) {
        this.matrixA = this.createMatrix(newSize);
        this.matrixB = this.createMatrix(newSize);
      },
    },
    methods: {
      createMatrix(size) {
        return Array.from({ length: size }, () => Array(size).fill(0));
      },
      calculateDeterminant() {
        try {
          this.determinant = determinant(this.matrixA);
        } catch (error) {
          console.error('Error calculating determinant:', error);
          this.determinant = 'Error';
        }
      },
      addMatrices() {
        try {
          this.operationResult = add(this.matrixA, this.matrixB);
        } catch (error) {
          console.error('Error adding matrices:', error);
          this.operationResult = 'Error';
        }
      },
      subtractMatrices() {
        try {
          this.operationResult = subtract(this.matrixA, this.matrixB);
        } catch (error) {
          console.error('Error subtracting matrices:', error);
          this.operationResult = 'Error';
        }
      },
      multiplyMatrices() {
        try {
          this.operationResult = multiply(this.matrixA, this.matrixB);
        } catch (error) {
          console.error('Error multiplying matrices:', error);
          this.operationResult = 'Error';
        }
      },
      solveLinearEquations() {
        try {
          this.solution = lusolve(this.matrixA, this.matrixB);
        } catch (error) {
          console.error('Error solving equations:', error);
          this.solution = 'Error';
        }
      },
      calculateEigenvalues() {
        try {
          this.eigenvalues = eig(this.matrixA).values;
        } catch (error) {
          console.error('Error calculating eigenvalues:', error);
          this.eigenvalues = 'Error';
        }
      },
      luDecomposition() {
        try {
          this.lu = lup(this.matrixA);
        } catch (error) {
          console.error('Error performing LU decomposition:', error);
          this.lu = 'Error';
        }
      },
      qrDecomposition() {
        try {
          this.qr = qr(this.matrixA);
        } catch (error) {
          console.error('Error performing QR decomposition:', error);
          this.qr = 'Error';
        }
      },
      saveMatrix() {
        this.savedMatrix = JSON.stringify(this.matrixA);
        alert('Matrix saved successfully!');
      },
      loadMatrix() {
        if (this.savedMatrix) {
          this.matrixA = JSON.parse(this.savedMatrix);
          alert('Matrix loaded successfully!');
        } else {
          alert('No matrix saved yet.');
        }
      },
    },
  };
  </script>
  <style scoped>
  .matrix-grid {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  table {
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  td {
    padding: 5px;
  }
  
  input[type='number'] {
    width: 50px;
  }
  
  button {
    margin: 5px;
    padding: 10px 15px;
    font-size: 14px;
  }
  
  @media (max-width: 600px) {
    input[type='number'] {
      width: 40px;
    }
  
    button {
      font-size: 12px;
    }
  }
  </style>
  
  