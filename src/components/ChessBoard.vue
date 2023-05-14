<template>
  <div class="chessboard">
    <div v-for="(row, rowIdx) in rows" :key="row" class="chessboard__row">
      <div v-for="(col, colIdx) in cols" :key="col" class="chessboard__square">
        <div
          class="chessboard__square"
          :class="`
            ${squareColor(rowIdx, colIdx)}
            ${highlightedSquare({ row, col })}
            ${roundIfCornerSquare(rowIdx, colIdx)}
          `"
          @click="onSquareClick({ row, col })"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Square } from '../types';

  export default defineComponent({
    name: 'ChessBoard',
    props: {
      onSquareClick: {
        type: Function as (square: Square) => void,
        required: true,
      },
      lastSquareClicked: {
        type: Object as Square | null,
        required: true,
      },
    },
    data() {
      return {
        cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        rows: [8, 7, 6, 5, 4, 3, 2, 1],
      };
    },
    methods: {
      squareColor(rowIdx: number, colIdx: number): string {
        const isLightsquare = (rowIdx + colIdx) % 2 === 0;
        return `chessboard__square--${isLightsquare ? 'light' : 'dark'}`;
      },
      highlightedSquare(square: Square): string {
        if (
          square?.row === this.lastSquareClicked?.row &&
          square?.col === this.lastSquareClicked?.col
        ) {
          return 'chessboard__square--highlighted';
        }
        return '';
      },
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
  @import '../assets/styles/variables.scss';

  .chessboard {
    display: flex;
    flex-direction: column;
    height: map-get($board, xxl);
    width: map-get($board, xxl);

    &__row {
      display: flex;
      height: map-get($square, xxl);
      width: 100%;
    }

    &__square {
      height: map-get($square, xxl);
      width: map-get($square, xxl);
      cursor: pointer;
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
      width: map-get($board, xl);
      height: map-get($board, xl);
      &__row {
        height: map-get($square, xl);
      }
      &__square {
        height: map-get($square, xl);
        width: map-get($square, xl);
      }
    }
  }

  @media (max-width: map-get($breakpoints, lg)) {
    .chessboard {
      width: map-get($board, lg);
      height: map-get($board, lg);
      &__row {
        height: map-get($square, lg);
      }
      &__square {
        height: map-get($square, lg);
        width: map-get($square, lg);
      }
    }
  }

  @media (max-width: map-get($breakpoints, md)) {
    .chessboard {
      width: map-get($board, md);
      height: map-get($board, md);
      &__row {
        height: map-get($square, md);
      }
      &__square {
        height: map-get($square, md);
        width: map-get($square, md);
      }
    }
  }

  @media (max-width: map-get($breakpoints, sm)) {
    .chessboard {
      width: map-get($board, sm);
      height: map-get($board, sm);
      &__row {
        height: map-get($square, sm);
      }
      &__square {
        height: map-get($square, sm);
        width: map-get($square, sm);
      }
    }
  }
</style>
