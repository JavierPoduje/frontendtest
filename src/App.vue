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
  import { Square } from './types';

  export default {
    name: 'App',
    components: {
      ChessBoard,
      SideBar,
    },
    data() {
      return {
        /**
         * The squares that have been clicked on the chessboard.
         */
        clickedSquares: [] as Square[],
        /**
         * The last square that was clicked on the chessboard.
         */
        lastSquareClicked: null as Square | null,
      };
    },
    methods: {
      /**
       * Handle a square being clicked on the chessboard.
       *
       * @param {Square} square - The square that was clicked.
       * @returns void
       */
      onSquareClick(square: Square) {
        this.lastSquareClicked = square;
        this.clickedSquares.push(square);
      },
      /**
       * Handle a square being clicked on the chessboard.
       *
       * @returns void
       */
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
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  .chessboard_container {
    height: map-get($board, xxl);
    width: map-get($board, xxl);
  }

  @media (max-width: map-get($breakpoints, xl)) {
    .chessboard_container {
      height: map-get($board, xl);
      width: map-get($board, xl);
    }
  }

  @media (max-width: map-get($breakpoints, lg)) {
    .chessboard_container {
      height: map-get($board, lg);
      width: map-get($board, lg);
    }
  }

  @media (max-width: map-get($breakpoints, md)) {
    .app_container {
      flex-direction: column;
    }

    .chessboard_container {
      height: map-get($board, md);
      width: map-get($board, md);
    }
  }

  @media (max-width: map-get($breakpoints, sm)) {
    .app_container {
      flex-direction: column;
    }

    .chessboard_container {
      height: map-get($board, sm);
      width: map-get($board, sm);
    }
  }
</style>
