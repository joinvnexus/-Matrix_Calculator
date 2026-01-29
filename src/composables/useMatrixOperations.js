import * as math from 'mathjs'

export function useMatrixOperations(props, emit) {
  async function calculateDeterminant() {
    try {
      const det = math.det(props.matrixA)
      emit('determinant', det)
    } catch (error) {
      emit('error', error.message)
    }
  }

  async function addMatrices() {
    try {
      const result = math.add(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      emit('error', error.message)
    }
  }

  async function subtractMatrices() {
    try {
      const result = math.subtract(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      emit('error', error.message)
    }
  }

  async function multiplyMatrices() {
    try {
      const result = math.multiply(props.matrixA, props.matrixB)
      emit('operation-result', result)
    } catch (error) {
      emit('error', error.message)
    }
  }

  async function solveLinearEquations() {
    try {
      const b = math.matrix(props.vectorB.map(x => [x]))
      const solution = math.lusolve(props.matrixA, b).toArray().flat()
      emit('solution', solution)
    } catch (error) {
      emit('error', error.message)
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
      emit('error', error.message)
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
      emit('error', error.message)
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
      emit('error', error.message)
    }
  }

  async function invertMatrix() {
    try {
      const result = math.inv(props.matrixA)
      emit('operation-result', result)
    } catch (error) {
      emit('error', error.message)
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
    qrDecomposition,
    invertMatrix
  }
}