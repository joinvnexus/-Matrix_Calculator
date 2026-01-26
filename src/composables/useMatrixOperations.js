import * as math from 'mathjs';

export function useMatrixOperations() {
  const calculateDeterminant = (matrixA) => {
    try {
      const det = math.det(matrixA);
      return { data: det };
    } catch (error) {
      return { error: 'Error calculating determinant.' };
    }
  };

  const addMatrices = (matrixA, matrixB) => {
    try {
      const result = math.add(matrixA, matrixB);
      return { data: result };
    } catch (error) {
      return { error: 'Error adding matrices.' };
    }
  };

  const subtractMatrices = (matrixA, matrixB) => {
    try {
      const result = math.subtract(matrixA, matrixB);
      return { data: result };
    } catch (error) {
      return { error: 'Error subtracting matrices.' };
    }
  };

  const multiplyMatrices = (matrixA, matrixB) => {
    try {
      const result = math.multiply(matrixA, matrixB);
      return { data: result };
    } catch (error) {
      return { error: 'Error multiplying matrices.' };
    }
  };

  const solveLinearEquations = (matrixA, vectorB) => {
    try {
      const b = math.matrix(vectorB.map(x => [x]));
      const solution = math.lusolve(matrixA, b).toArray().flat();
      return { data: solution };
    } catch (error) {
      return { error: 'Error solving equations. The matrix may be singular.' };
    }
  };

  const calculateEigenvalues = (matrixA) => {
    try {
      const result = math.eigs(matrixA);
      const eigenvalues = result.values.map(v =>
        typeof v === 'number' ? v.toFixed(4) :
        `${v.re.toFixed(4)} + ${v.im.toFixed(4)}i`
      ).join(', ');
      return { data: eigenvalues };
    } catch (error) {
      return { error: 'Error calculating eigenvalues.' };
    }
  };

  const luDecomposition = (matrixA) => {
    try {
      const result = math.lup(matrixA);
      const lu = {
        L: result.L.toArray(),
        U: result.U.toArray(),
        P: result.p.map(i => i + 1)
      };
      return { data: { type: 'lu', data: lu } };
    } catch (error) {
      return { error: 'Error performing LU decomposition.' };
    }
  };

  const qrDecomposition = (matrixA) => {
    try {
      const result = math.qr(matrixA);
      const qr = {
        Q: result.Q.toArray(),
        R: result.R.toArray()
      };
      return { data: { type: 'qr', data: qr } };
    } catch (error) {
      return { error: 'Error performing QR decomposition.' };
    }
  };

  return {
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