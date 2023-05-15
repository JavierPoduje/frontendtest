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
  @import './styles/variables.scss';

  $board-size: map-get($board, xxl);
  $square-size: map-get($square, xxl);
  $coordinate-size: calc($square-size / 3);
  $board-container-size: calc($board-size + $coordinate-size);

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
    height: $board-container-size;
    width: $board-container-size;
  }

  .sidebar_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: $board-container-size;
  }

  @media (max-width: map-get($breakpoints, xl)) {
    $board-size: map-get($board, xl);
    $square-size: map-get($square, xl);
    $coordinate-size: calc($square-size / 3);
    $board-container-size: calc($board-size + $coordinate-size);

    .chessboard_container {
      height: $board-container-size;
      width: $board-container-size;
    }

    .sidebar_container {
      height: $board-container-size;
    }
  }

  @media (max-width: map-get($breakpoints, lg)) {
    $board-size: map-get($board, lg);
    $square-size: map-get($square, lg);
    $coordinate-size: calc($square-size / 3);
    $board-container-size: calc($board-size + $coordinate-size);

    .chessboard_container {
      height: $board-container-size;
      width: $board-container-size;
    }

    .sidebar_container {
      height: $board-container-size;
    }
  }

  @media (max-width: map-get($breakpoints, md)) {
    $board-size: map-get($board, md);
    $square-size: map-get($square, md);
    $coordinate-size: calc($square-size / 3);
    $board-container-size: calc($board-size + $coordinate-size);

    .app_container {
      flex-direction: column;
    }

    .chessboard_container {
      height: $board-container-size;
      width: $board-container-size;
    }

    .sidebar_container {
      flex-direction: row;
      justify-content: flex-end;
      width: $board-container-size;
      height: calc($square-size * 4);
    }
  }

  @media (max-width: map-get($breakpoints, sm)) {
    $board-size: map-get($board, sm);
    $square-size: map-get($square, sm);
    $coordinate-size: calc($square-size / 3);
    $board-container-size: calc($board-size + $coordinate-size);

    .app_container {
      flex-direction: column;
    }

    .chessboard_container {
      height: $board-container-size;
      width: $board-container-size;
    }

    .sidebar_container {
      flex-direction: row;
      justify-content: flex-end;
      width: $board-container-size;
      height: calc($square-size * 4);
    }
  }
</style>
