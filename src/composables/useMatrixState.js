import { ref, watch } from 'vue';

export function useMatrixState() {
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
  const savedMatrix = ref(null);
  const error = ref(null);
  const notification = ref('');

  watch(notification, (newValue) => {
    if (newValue) {
      setTimeout(() => {
        notification.value = '';
      }, 3000);
    }
  });

  function createMatrix(size) {
    const s = Math.max(1, Math.min(10, size));
    return Array.from({ length: s }, () => Array(s).fill(0));
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
    if (newSize >= 1 && newSize <= 10) {
      matrixA.value = createMatrix(newSize);
      matrixB.value = createMatrix(newSize);
      vectorB.value = Array(newSize).fill(0);
      resetResults();
    }
  });

  function saveMatrix() {
    try {
      savedMatrix.value = JSON.stringify(matrixA.value);
      notification.value = 'Matrix A saved successfully!';
    } catch (e) {
      error.value = 'Could not save matrix.';
    }
  }

  function loadMatrix() {
    if (savedMatrix.value) {
      try {
        const loadedMatrix = JSON.parse(savedMatrix.value);
        matrixSize.value = loadedMatrix.length;
        matrixA.value = loadedMatrix;
        notification.value = 'Matrix A loaded successfully!';
      } catch (e) {
        error.value = 'Could not load matrix. Saved data may be corrupt.';
        setTimeout(() => error.value = '', 3000);
      }
    } else {
      notification.value = 'No matrix saved yet.';
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
    notification,
    resetResults,
    saveMatrix,
    loadMatrix,
  };
}
