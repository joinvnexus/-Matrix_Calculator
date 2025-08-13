<template>
  <div id="app">
    <MatrixInput />
  </div>
</template>

<script>
import MatrixInput from './components/MatrixInput.vue';

export default {
  components: {
    MatrixInput,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
