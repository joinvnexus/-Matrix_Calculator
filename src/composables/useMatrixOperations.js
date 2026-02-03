import * as math from 'mathjs'

export function useMatrixOperations(props, emit) {
  async function calculateDeterminant() {
    try {
      const det = math.det(props.matrixA)
      emit('determinant', det)
    } catch (error) {
      console.error('Error calculating determinant:', error)
      emit('error', 'Determinant error: ' + error.message)
    }
  }

  async function addMatrices() {
    try {
      const result = math.add(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      console.error('Error adding matrices:', error)
      emit('error', 'Addition error: ' + error.message)
    }
  }

  async function subtractMatrices() {
    try {
      const result = math.subtract(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      console.error('Error subtracting matrices:', error)
      emit('error', 'Subtraction error: ' + error.message)
    }
  }

  async function multiplyMatrices() {
    try {
      const result = math.multiply(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      console.error('Error multiplying matrices:', error)
      emit('error', 'Multiplication error: ' + error.message)
    }
  }

  async function solveLinearEquations() {
    try {
      const b = props.vectorB.map(x => [x])
      const res = math.lusolve(props.matrixA, b)
      // math.lusolve can return a Matrix or an Array.
      // We want a flat array for the solution.
      const solution = (res.toArray ? res.toArray() : res).flat()
      emit('solution', solution)
    } catch (error) {
      console.error('Error solving equations:', error)
      emit('error', 'Solver error: ' + error.message)
    }
  }

  async function calculateEigenvalues() {
    try {
      const result = math.eigs(props.matrixA)
      const eigenvalues = result.values.map(v => 
        typeof v === 'number' ? v.toFixed(4) : 
        `${v.re.toFixed(4)} + ${v.im.toFixed(4)}i`
      ).join(', ')
      emit('eigenvalues', eigenvalues)
    } catch (error) {
      console.error('Error calculating eigenvalues:', error)
      emit('error', 'Eigenvalue error: ' + error.message)
    }
  }

  async function luDecomposition() {
    try {
      const result = math.lup(props.matrixA)
      const lu = {
        L: result.L.toArray ? result.L.toArray() : result.L,
        U: result.U.toArray ? result.U.toArray() : result.U,
        P: result.p
      }
      // result.p is already a 0-based array in modern mathjs lup
      // but let's make it 1-based for display as in the original code
      lu.P = lu.P.map(i => i + 1)

      emit('decomposition', { type: 'lu', data: lu })
    } catch (error) {
      console.error('Error performing LU decomposition:', error)
      emit('error', 'LU error: ' + error.message)
    }
  }

  async function qrDecomposition() {
    try {
      const result = math.qr(props.matrixA)
      const qr = {
        Q: result.Q.toArray ? result.Q.toArray() : result.Q,
        R: result.R.toArray ? result.R.toArray() : result.R
      }
      emit('decomposition', { type: 'qr', data: qr })
    } catch (error) {
      console.error('Error performing QR decomposition:', error)
      emit('error', 'QR error: ' + error.message)
    }
  }

  return {
    calculateDeterminant,
    addMatrices,
    subtractMatrices,
    multiplyMatrices,
    solveLinearEquations,
    calculateEigenvalues,
    luDecomposition,
    qrDecomposition
  }
}