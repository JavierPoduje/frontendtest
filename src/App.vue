<template>
  <section class="chessboard_container">
    <ChessBoard />
  </section>
</template>

<script lang="ts">
  import ChessBoard from './components/ChessBoard.vue';

  export default {
    name: 'App',
    components: {
      ChessBoard,
    },
    props: {},
    methods: {
      test(name: string) {
        console.log(name);
      },
    },
  };
</script>

<style scoped lang="scss">
  .chessboard_container {
    width: 712px;
    height: 712px;
  }
</style>
