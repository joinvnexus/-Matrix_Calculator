import { ref, watch, onMounted } from 'vue';
import * as math from 'mathjs';

export function useMatrices() {
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

  function calculateDeterminant() {
    resetResults();
    try {
      determinant.value = math.det(matrixA.value);
    } catch (err) {
      error.value = 'Error calculating determinant: ' + err.message;
    }
  }

  function addMatrices() {
    resetResults();
    try {
      operationResult.value = math.add(matrixA.value, matrixB.value);
    } catch (err) {
      error.value = 'Error adding matrices: ' + err.message;
    }
  }

  function subtractMatrices() {
    resetResults();
    try {
      operationResult.value = math.subtract(matrixA.value, matrixB.value);
    } catch (err) {
      error.value = 'Error subtracting matrices: ' + err.message;
    }
  }

  function multiplyMatrices() {
    resetResults();
    try {
      operationResult.value = math.multiply(matrixA.value, matrixB.value);
    } catch (err) {
      error.value = 'Error multiplying matrices: ' + err.message;
    }
  }

  function solveLinearEquations() {
    resetResults();
    try {
      const b = math.matrix(vectorB.value.map(x => [x]));
      solution.value = math.lusolve(matrixA.value, b).toArray().flat();
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
    } catch (err) {
      error.value = 'Error performing QR decomposition: ' + err.message;
    }
  }

  function saveMatrix() {
    localStorage.setItem('matrixA', JSON.stringify(matrixA.value));
    alert('Matrix A saved successfully!');
  }

  function loadMatrix() {
    const savedMatrix = localStorage.getItem('matrixA');
    if (savedMatrix) {
      matrixA.value = JSON.parse(savedMatrix);
      matrixSize.value = matrixA.value.length;
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

  onMounted(loadMatrix);

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