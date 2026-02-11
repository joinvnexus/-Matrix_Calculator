import * as math from 'mathjs'

export function useMatrixOperations(props, emit) {
  async function calculateDeterminant() {
    try {
      const det = math.det(props.matrixA)
      emit('determinant', det)
    } catch (error) {
      console.error('Error calculating determinant:', error)
      emit('error', 'Error calculating determinant: ' + error.message)
    }
  }

  async function addMatrices() {
    try {
      const result = math.add(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      console.error('Error adding matrices:', error)
      emit('error', 'Error adding matrices: ' + error.message)
    }
  }

  async function subtractMatrices() {
    try {
      const result = math.subtract(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      console.error('Error subtracting matrices:', error)
      emit('error', 'Error subtracting matrices: ' + error.message)
    }
  }

  async function multiplyMatrices() {
    try {
      const result = math.multiply(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      console.error('Error multiplying matrices:', error)
      emit('error', 'Error multiplying matrices: ' + error.message)
    }
  }

  async function solveLinearEquations() {
    try {
      const b = math.matrix(props.vectorB.map(x => [x]))
      const result = math.lusolve(props.matrixA, b)
      const solution = result.toArray ? result.toArray().flat() : result.flat()
      emit('solution', solution)
    } catch (error) {
      console.error('Error solving equations:', error)
      emit('error', 'Error solving equations: ' + error.message)
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
      emit('error', 'Error calculating eigenvalues: ' + error.message)
    }
  }

  async function luDecomposition() {
    try {
      const result = math.lup(props.matrixA)
      const lu = {
        L: result.L.toArray(),
        U: result.U.toArray(),
        P: result.p.map(i => i + 1)
      }
      emit('decomposition', { type: 'lu', data: lu })
    } catch (error) {
      console.error('Error performing LU decomposition:', error)
      emit('error', 'Error performing LU decomposition: ' + error.message)
    }
  }

  async function qrDecomposition() {
    try {
      const result = math.qr(props.matrixA)
      const qr = {
        Q: result.Q.toArray(),
        R: result.R.toArray()
      }
      emit('decomposition', { type: 'qr', data: qr })
    } catch (error) {
      console.error('Error performing QR decomposition:', error)
      emit('error', 'Error performing QR decomposition: ' + error.message)
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