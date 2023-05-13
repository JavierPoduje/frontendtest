<template>
  <div class="chessboard">
    <div v-for="(row, rowIdx) in rows" :key="row" class="chessboard__row">
      <div v-for="(col, colIdx) in cols" :key="col" class="chessboard__square">
        <div
          class="chessboard__square"
          :class="`${squareColor(rowIdx, colIdx)} ${highlightedSquare({
            row,
            col,
          })}`"
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
    },
  });
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  $square-size: calc(100% / 8);

  .chessboard {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    &__row {
      display: flex;
      height: $square-size;
      width: 100%;
    }

    &__square {
      height: 100%;
      width: $square-size;
      cursor: pointer;
    }

    &__square {
      width: 100%;
      height: 100%;

      &--light {
        background-color: map-get($colors, light-square);
      }
      &--dark {
        background-color: map-get($colors, dark-square);
      }
      &--highlighted {
        background-color: map-get($colors, highlighted-square);
      }

      &:active {
        box-shadow: inset 0px 0px 0px 5px map-get($colors, active-square);
      }
    }
  }
</style>
