<template>
  <section class="app_container">
    <section class="chessboard_container">
      <ChessBoard :on-square-click="onSquareClick" />
    </section>
    <section class="sidebar_container">
      <SideBar :clicked-squares="clickedSquares" :onClear="onClear"/>
    </section>
  </section>
</template>

<script lang="ts">
  import ChessBoard from './components/ChessBoard.vue';
  import SideBar from './components/SideBar.vue';
  import { Square } from './types';

  export default {
    name: 'App',
    components: {
      ChessBoard,
      SideBar,
    },
    data() {
      return {
        clickedSquares: [] as Square[],
      };
    },
    methods: {
      onSquareClick(square: Square) {
        this.clickedSquares.push(square);
      },
      onClear() {
        this.clickedSquares = [];
      },
    },
  };
</script>

<style scoped lang="scss">
  .app_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .chessboard_container {
    width: 712px;
    height: 712px;
  }

  .chessboard_container {
    width: 712px;
    height: 712px;
  }
</style>
