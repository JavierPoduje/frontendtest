<template>
  <div class="coordinated__chessboard">
    <div class="coordinates__rows">
      <span v-for="row in rows" :key="row" class="coordinates__row">{{
        row
      }}</span>
    </div>
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
        <span class="coordinates__col">{{ col }}</span>
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

  $board-size: map-get($board, xxl);
  $square-size: map-get($square, xxl);
  $coordinate-size: calc($square-size / 3);
  $board-container-size: calc($board-size + $coordinate-size);

  .coordinated__chessboard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: $board-container-size;
  }

  .coordinates {
    &__rows {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      height: $board-size;
      width: $coordinate-size;
    }
    &__row,
    &__col {
      color: map-get($colors, gray);
      font-weight: map-get($fonts, bold);
      font-size: 1rem;
    }
  }

  .chessboard {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    height: $board-size;
    width: $board-size;

    &__square {
      cursor: pointer;
      height: $square-size;

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
        border-top-left-radius: $border-radius;
      }
      &--top_right {
        border-top-right-radius: $border-radius;
      }
      &--bottom_right {
        border-bottom-right-radius: $border-radius;
      }
      &--bottom_left {
        border-bottom-left-radius: $border-radius;
      }

      &:active {
        box-shadow: inset 0px 0px 0px 5px map-get($colors, active-square);
      }
    }
  }

  @media (max-width: map-get($breakpoints, xl)) {
    $board-size: map-get($board, xl);
    $square-size: map-get($square, xl);
    $coordinate-size: calc($square-size / 3);
    $board-container-size: calc($board-size + $coordinate-size);

    .coordinated__chessboard {
      width: $board-container-size;
    }

    .coordinates {
      &__rows {
        height: $board-size;
        width: $coordinate-size;
      }
    }

    .chessboard {
      height: $board-size;
      width: $board-size;
      &__square {
        height: $square-size;
      }
    }
  }

  @media (max-width: map-get($breakpoints, lg)) {
    $board-size: map-get($board, lg);
    $square-size: map-get($square, lg);
    $coordinate-size: calc($square-size / 3);
    $board-container-size: calc($board-size + $coordinate-size);

    .coordinated__chessboard {
      width: $board-container-size;
    }

    .coordinates {
      &__rows {
        height: $board-size;
        width: $coordinate-size;
      }
    }

    .chessboard {
      height: $board-size;
      width: $board-size;
      &__square {
        height: $square-size;
      }
    }
  }

  @media (max-width: map-get($breakpoints, md)) {
    $board-size: map-get($board, md);
    $square-size: map-get($square, md);
    $coordinate-size: calc($square-size / 3);
    $board-container-size: calc($board-size + $coordinate-size);

    .coordinated__chessboard {
      width: $board-container-size;
    }

    .coordinates {
      &__rows {
        height: $board-size;
        width: $coordinate-size;
      }
      &__row,
      &__col {
        font-size: 0.8rem;
      }
    }

    .chessboard {
      height: $board-size;
      width: $board-size;
      &__square {
        height: $square-size;
      }
    }
  }

  @media (max-width: map-get($breakpoints, sm)) {
    $board-size: map-get($board, sm);
    $square-size: map-get($square, sm);
    $coordinate-size: calc($square-size / 3);
    $board-container-size: calc($board-size + $coordinate-size);

    .coordinated__chessboard {
      width: $board-container-size;
    }

    .coordinates {
      &__rows {
        height: $board-size;
        width: $coordinate-size;
      }
      &__row,
      &__col {
        font-size: 0.8rem;
      }
    }

    .chessboard {
      height: $board-size;
      width: $board-size;
      &__square {
        height: $square-size;
      }
    }
  }
</style>
