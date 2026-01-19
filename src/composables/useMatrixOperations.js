import * as math from 'mathjs';
import { ref } from 'vue';

export function useMatrixOperations() {
  const error = ref(null);

  const resetError = () => {
    error.value = null;
  };

  const calculateDeterminant = (matrix) => {
    resetError();
    try {
      return math.det(matrix);
    } catch (err) {
      error.value = 'Error calculating determinant: ' + err.message;
      return null;
    }
  };

  const addMatrices = (matrixA, matrixB) => {
    resetError();
    try {
      return math.add(matrixA, matrixB);
    } catch (err) {
      error.value = 'Error adding matrices: ' + err.message;
      return null;
    }
  };

  const subtractMatrices = (matrixA, matrixB) => {
    resetError();
    try {
      return math.subtract(matrixA, matrixB);
    } catch (err) {
      error.value = 'Error subtracting matrices: ' + err.message;
      return null;
    }
  };

  const multiplyMatrices = (matrixA, matrixB) => {
    resetError();
    try {
      return math.multiply(matrixA, matrixB);
    } catch (err) {
      error.value = 'Error multiplying matrices: ' + err.message;
      return null;
    }
  };

  const solveLinearEquations = (matrixA, vector) => {
    resetError();
    try {
      const b = math.matrix(vector.map(x => [x]));
      return math.lusolve(matrixA, b).toArray().flat();
    } catch (err) {
      error.value = 'Error solving equations: ' + err.message;
      return null;
    }
  };

  const calculateEigenvalues = (matrix) => {
    resetError();
    try {
      const result = math.eigs(matrix);
      return result.values
        .map(v =>
          typeof v === 'number'
            ? v.toFixed(4)
            : `${v.re.toFixed(4)} + ${v.im.toFixed(4)}i`
        )
        .join(', ');
    } catch (err) {
      error.value = 'Error calculating eigenvalues: ' + err.message;
      return null;
    }
  };

  const luDecomposition = (matrix) => {
    resetError();
    try {
      const result = math.lup(matrix);
      return {
        L: result.L.toArray(),
        U: result.U.toArray(),
        P: result.p.map(i => i + 1),
      };
    } catch (err) {
      error.value = 'Error performing LU decomposition: ' + err.message;
      return null;
    }
  };

  const qrDecomposition = (matrix) => {
    resetError();
    try {
      const result = math.qr(matrix);
      return {
        Q: result.Q.toArray(),
        R: result.R.toArray(),
      };
    } catch (err) {
      error.value = 'Error performing QR decomposition: ' + err.message;
      return null;
    }
  };

  return {
    error,
    calculateDeterminant,
    addMatrices,
    subtractMatrices,
    multiplyMatrices,
    solveLinearEquations,
    calculateEigenvalues,
    luDecomposition,
    qrDecomposition,
  };
}
