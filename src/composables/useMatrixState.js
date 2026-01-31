import { ref } from 'vue';

export function useMatrixState() {
  const matrixSize = ref(3);
  const matrixA = ref(createMatrix(3));
  const matrixB = ref(createMatrix(3));
  const vectorB = ref(Array(3).fill(0));

  const operationResult = ref([]);
  const determinant = ref(null);
  const solution = ref(null);
  const eigenvalues = ref(null);
  const lu = ref(null);
  const qr = ref(null);
  const error = ref(null);
  const info = ref(null);

  const savedMatrix = ref(null);

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
    info.value = null;
  }

  function updateMatrixSize(newSize) {
    if (newSize < 1) newSize = 1;
    if (newSize > 10) newSize = 10;

    // Only re-initialize if the size actually changed
    if (matrixSize.value !== newSize || matrixA.value.length !== newSize) {
      matrixSize.value = newSize;
      matrixA.value = createMatrix(newSize);
      matrixB.value = createMatrix(newSize);
      vectorB.value = Array(newSize).fill(0);
      resetResults();
    }
  }

  function saveMatrix() {
    try {
      savedMatrix.value = JSON.stringify(matrixA.value);
      info.value = 'Matrix A saved successfully!';
      error.value = null;
    } catch (err) {
      error.value = 'Failed to save matrix: ' + err.message;
    }
  }

  function loadMatrix() {
    if (savedMatrix.value) {
      try {
        const loaded = JSON.parse(savedMatrix.value);
        const newSize = loaded.length;

        resetResults();

        // Update size first to avoid watch re-initializing with old size
        matrixSize.value = newSize;
        matrixA.value = loaded;

        // If the loaded matrix has a different size, we must also reset matrixB and vectorB
        // to maintain consistency, but we don't want to overwrite matrixA.
        matrixB.value = createMatrix(newSize);
        vectorB.value = Array(newSize).fill(0);

        info.value = 'Matrix A loaded successfully!';
        error.value = null;
      } catch (err) {
        error.value = 'Failed to load matrix: ' + err.message;
      }
    } else {
      error.value = 'No matrix saved yet.';
    }
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
    info,
    updateMatrixSize,
    resetResults,
    saveMatrix,
    loadMatrix
  };
}
