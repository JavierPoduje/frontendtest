<template>
  <div class="chessboard">
    <div
      v-for="(col, colIdx) in cols"
      :key="col"
      data-test="chessboard__column"
    >
      <div v-for="(row, rowIdx) in rows" :key="row">
        <div
          class="chessboard__square"
          :class="`
            ${squareColor(rowIdx, colIdx)}
            ${highlightedSquare({ row, col })}
            ${roundIfCornerSquare(rowIdx, colIdx)}
          `"
          :data-test="`chessboard__square--${col}${row}`"
          @click="onSquareClick({ row, col })"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Square, Row, Col } from '../types';

  export default defineComponent({
    name: 'ChessBoard',
    props: {
      /**
       * The function to call when a square is clicked.
       */
      onSquareClick: {
        type: Function as PropType<(square: Square) => void>,
        required: true,
      },
      /**
       * The last square that was clicked. Null if no square has been clicked.
       */
      lastSquareClicked: {
        type: Object as PropType<Square | null>,
        required: true,
      },
    },
    data() {
      return {
        cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as Col[],
        rows: [8, 7, 6, 5, 4, 3, 2, 1] as Row[],
      };
    },
    methods: {
      /**
       * Given the row index and the column index of a square, return the
       * class that will color it appropriately.
       *
       * @param {number} rowIdx - The row index of the square
       * @param {number} colIdx - The column index of the square
       * @returns {string} The class to color the square.
       */
      squareColor(rowIdx: number, colIdx: number): string {
        const isLightsquare = (rowIdx + colIdx) % 2 === 0;
        return `chessboard__square--${isLightsquare ? 'light' : 'dark'}`;
      },
      /**
       * Given a square, return the appropriate class to highlight if it's the
       * last square clicked.
       *
       * @param {Square} square - The square to evaluate.
       * @returns {string} The appropriate class to highlight the square.
       */
      highlightedSquare(square: Square): string {
        if (
          square?.row === this.lastSquareClicked?.row &&
          square?.col === this.lastSquareClicked?.col
        ) {
          return 'chessboard__square--highlighted';
        }
        return '';
      },
      /**
       * Given the row index and column index of a square, return the
       * appropriate class to round its border if it's a corner square.
       *
       * @param {number} rowIdx - The row index of the square
       * @param {number} colIdx - The column index of the square
       * @returns {string} The appropriate class to round the border of the square
       */
      roundIfCornerSquare(rowIdx: number, colIdx: number): string {
        const isLeftColumn = colIdx === 0;
        const isRightColumn = colIdx === this.cols.length - 1;
        const isTopRow = rowIdx === 0;
        const isBottomRow = rowIdx === this.rows.length - 1;

        if (isLeftColumn && isTopRow) {
          return 'chessboard__square--top_left';
        } else if (isRightColumn && isTopRow) {
          return 'chessboard__square--top_right';
        } else if (isRightColumn && isBottomRow) {
          return 'chessboard__square--bottom_right';
        } else if (isLeftColumn && isBottomRow) {
          return 'chessboard__square--bottom_left';
        }

        return '';
      },
    },
  });
</script>

<style scoped lang="scss">
  @import '../styles/variables.scss';

  .chessboard {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    height: map-get($board, xxl);
    width: map-get($board, xxl);

    &__square {
      cursor: pointer;
      height: map-get($square, xxl);
    }

    &__square {
      &--light {
        background-color: map-get($colors, light-square);
      }
      &--dark {
        background-color: map-get($colors, dark-square);
      }
      &--highlighted {
        background-color: map-get($colors, highlighted-square);
      }
      &--top_left {
        border-top-left-radius: map-get($box, border-radius);
      }
      &--top_right {
        border-top-right-radius: map-get($box, border-radius);
      }
      &--bottom_right {
        border-bottom-right-radius: map-get($box, border-radius);
      }
      &--bottom_left {
        border-bottom-left-radius: map-get($box, border-radius);
      }

      &:active {
        box-shadow: inset 0px 0px 0px 5px map-get($colors, active-square);
      }
    }
  }

  @media (max-width: map-get($breakpoints, xl)) {
    .chessboard {
      height: map-get($board, xl);
      width: map-get($board, xl);
      &__square {
        height: map-get($square, xl);
      }
    }
  }

  @media (max-width: map-get($breakpoints, lg)) {
    .chessboard {
      width: map-get($board, lg);
      height: map-get($board, lg);
      &__square {
        height: map-get($square, lg);
      }
    }
  }

  @media (max-width: map-get($breakpoints, md)) {
    .chessboard {
      height: map-get($board, md);
      width: map-get($board, md);
      &__square {
        height: map-get($square, md);
      }
    }
  }

  @media (max-width: map-get($breakpoints, sm)) {
    .chessboard {
      height: map-get($board, sm);
      width: map-get($board, sm);
      &__square {
        height: map-get($square, sm);
      }
    }
  }
</style>
