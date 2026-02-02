import * as math from 'mathjs'

export function useMatrixOperations(props, emit) {
  function ensureArray(obj) {
    return obj && typeof obj.toArray === 'function' ? obj.toArray() : obj
  }

  async function calculateDeterminant() {
    try {
      const det = math.det(props.matrixA)
      emit('determinant', det)
    } catch (error) {
      emit('error', 'Failed to calculate determinant: ' + error.message)
    }
  }

  async function addMatrices() {
    try {
      const result = math.add(props.matrixA, props.matrixB)
      emit('operation-result', ensureArray(result))
    } catch (error) {
      emit('error', 'Failed to add matrices: ' + error.message)
    }
  }

  async function subtractMatrices() {
    try {
      const result = math.subtract(props.matrixA, props.matrixB)
      emit('operation-result', ensureArray(result))
    } catch (error) {
      emit('error', 'Failed to subtract matrices: ' + error.message)
    }
  }

  async function multiplyMatrices() {
    try {
      const result = math.multiply(props.matrixA, props.matrixB)
      emit('operation-result', ensureArray(result))
    } catch (error) {
      emit('error', 'Failed to multiply matrices: ' + error.message)
    }
  }

  async function solveLinearEquations() {
    try {
      if (!props.matrixA || props.matrixA.length === 0) {
        throw new Error('Matrix A is empty')
      }

      const b = math.matrix(props.vectorB.map(x => [x]))
      const result = math.lusolve(props.matrixA, b)
      const solution = ensureArray(result).flat()
      emit('solution', solution)
    } catch (error) {
      emit('error', 'Failed to solve equations: ' + error.message + '. (Note: The matrix might be singular or non-invertible)')
    }
  }

  async function calculateEigenvalues() {
    try {
      const result = math.eigs(props.matrixA)
      const values = ensureArray(result.values)
      const eigenvalues = values.map(v =>
        typeof v === 'number' ? v.toFixed(4) : 
        (v.re !== undefined ? `${v.re.toFixed(4)} + ${v.im.toFixed(4)}i` : v.toString())
      ).join(', ')
      emit('eigenvalues', eigenvalues)
    } catch (error) {
      emit('error', 'Failed to calculate eigenvalues: ' + error.message)
    }
  }

  async function luDecomposition() {
    try {
      const result = math.lup(props.matrixA)
      const lu = {
        L: ensureArray(result.L),
        U: ensureArray(result.U),
        P: result.p.map(i => i + 1)
      }
      emit('decomposition', { type: 'lu', data: lu })
    } catch (error) {
      emit('error', 'Failed to perform LU decomposition: ' + error.message)
    }
  }

  async function qrDecomposition() {
    try {
      const result = math.qr(props.matrixA)
      const qr = {
        Q: ensureArray(result.Q),
        R: ensureArray(result.R)
      }
      emit('decomposition', { type: 'qr', data: qr })
    } catch (error) {
      emit('error', 'Failed to perform QR decomposition: ' + error.message)
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