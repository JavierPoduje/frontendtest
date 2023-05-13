<template>
  <section class="app_container">
    <section class="chessboard_container">
      <ChessBoard
        :on-square-click="onSquareClick"
        :last-square-clicked="lastSquareClicked"
      />
    </section>
    <section class="sidebar_container">
      <SideBar :clicked-squares="clickedSquares" :on-clear="onClear" />
    </section>
  </section>
</template>

<script lang="ts">
  import ChessBoard from './components/ChessBoard.vue';
  import SideBar from './components/SideBar.vue';
  // import clickedSquares from './clickedSquares.ts';
  // import fewerClickedSquares from './fewerClickedSquares.ts';
  import { Square } from './types';

  export default {
    name: 'App',
    components: {
      ChessBoard,
      SideBar,
    },
    data() {
      return {
        // clickedSquares: clickedSquares as Square[],
        // clickedSquares: fewerClickedSquares as Square[],
        clickedSquares: [] as Square[],
        lastSquareClicked: null as Square | null,
      };
    },
    methods: {
      onSquareClick(square: Square) {
        this.lastSquareClicked = square;
        this.clickedSquares.push(square);
      },
      onClear() {
        this.lastSquareClicked = null;
        this.clickedSquares = [];
      },
    },
  };
</script>

<style scoped lang="scss">
  @import './assets/styles/variables.scss';

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
    width: $board-size;
    height: $board-size;
  }
</style>
