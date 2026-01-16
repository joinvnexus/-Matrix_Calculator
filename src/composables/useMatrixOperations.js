import { ref, watch } from 'vue';
import * as math from 'mathjs';

export function useMatrixOperations() {
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
  const success = ref(null);

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
    success.value = null;
  }

  watch(matrixSize, (newSize) => {
    if (newSize > 10) newSize = 10;
    if (newSize < 1) newSize = 1;
    matrixA.value = createMatrix(newSize);
    matrixB.value = createMatrix(newSize);
    vectorB.value = Array(newSize).fill(0);
    resetResults();
  });

  function calculateDeterminant() {
    resetResults();
    try {
      determinant.value = math.det(matrixA.value);
      success.value = 'Determinant calculated successfully.';
    } catch (err) {
      error.value = 'Error calculating determinant: ' + err.message;
    }
  }

  function addMatrices() {
    resetResults();
    try {
      operationResult.value = math.add(matrixA.value, matrixB.value);
      success.value = 'Matrices added successfully.';
    } catch (err) {
      error.value = 'Error adding matrices: ' + err.message;
    }
  }

  function subtractMatrices() {
    resetResults();
    try {
      operationResult.value = math.subtract(matrixA.value, matrixB.value);
      success.value = 'Matrices subtracted successfully.';
    } catch (err) {
      error.value = 'Error subtracting matrices: ' + err.message;
    }
  }

  function multiplyMatrices() {
    resetResults();
    try {
      operationResult.value = math.multiply(matrixA.value, matrixB.value);
      success.value = 'Matrices multiplied successfully.';
    } catch (err) {
      error.value = 'Error multiplying matrices: ' + err.message;
    }
  }

  function solveLinearEquations() {
    resetResults();
    try {
      const b = math.matrix(vectorB.value.map(x => [x]));
      solution.value = math.lusolve(matrixA.value, b).toArray().flat();
      success.value = 'Linear equations solved successfully.';
    } catch (err) {
      error.value = 'Error solving equations: ' + err.message;
    }
  }

  function calculateEigenvalues() {
    resetResults();
    try {
      const result = math.eigs(matrixA.value);
      eigenvalues.value = result.values.map(v =>
        typeof v === 'number' ? v.toFixed(4) :
        `${v.re.toFixed(4)} + ${v.im.toFixed(4)}i`
      ).join(', ');
      success.value = 'Eigenvalues calculated successfully.';
    } catch (err) {
      error.value = 'Error calculating eigenvalues: ' + err.message;
    }
  }

  function luDecomposition() {
    resetResults();
    try {
      const result = math.lup(matrixA.value);
      lu.value = {
        L: result.L.toArray(),
        U: result.U.toArray(),
        P: result.p.map(i => i + 1)
      };
      success.value = 'LU decomposition performed successfully.';
    } catch (err) {
      error.value = 'Error performing LU decomposition: ' + err.message;
    }
  }

  function qrDecomposition() {
    resetResults();
    try {
      const result = math.qr(matrixA.value);
      qr.value = {
        Q: result.Q.toArray(),
        R: result.R.toArray()
      };
      success.value = 'QR decomposition performed successfully.';
    } catch (err) {
      error.value = 'Error performing QR decomposition: ' + err.message;
    }
  }

  function saveMatrix() {
    localStorage.setItem('savedMatrixA', JSON.stringify(matrixA.value));
    alert('Matrix A saved successfully!');
  }

  function loadMatrix() {
    const saved = localStorage.getItem('savedMatrixA');
    if (saved) {
      const parsedMatrix = JSON.parse(saved);
      matrixSize.value = parsedMatrix.length;
      matrixA.value = parsedMatrix;
      alert('Matrix A loaded successfully!');
    } else {
      alert('No matrix saved yet.');
    }
  }

  function formatDecomposition(decomp) {
    let result = '';
    for (const [key, value] of Object.entries(decomp)) {
      result += `${key}:\n`;
      result += math.format(value, { precision: 4 }) + '\n\n';
    }
    return result;
  }

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
    formatDecomposition
  };
}
