<template>
  <div class="chessboard">
    <div v-for="(row, rowIdx) in rows" :key="row" class="chessboard__row">
      <div v-for="(col, colIdx) in cols" :key="col" class="chessboard__col">
        <div class="chessboard__cell" :class="cellColor(rowIdx, colIdx)"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ChessBoard',
    data() {
      return {
        rows: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        cols: [1, 2, 3, 4, 5, 6, 7, 8],
      };
    },
    methods: {
      isLightCell(rowIdx: number, colIdx: number): boolean {
        return (rowIdx + colIdx) % 2 === 0;
      },
      cellColor(rowIdx: number, colIdx: number): string {
        if (this.isLightCell(rowIdx, colIdx)) {
          return 'chessboard__cell--light';
        } else {
          return 'chessboard__cell--dark';
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  $cell-size: calc(100% / 8);

  .chessboard {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &__row {
      width: 100%;
      height: $cell-size;
      display: flex;
    }

    &__col {
      width: $cell-size;
      height: 100%;
    }

    &__cell {
      width: 100%;
      height: 100%;

      &--light {
        background-color: map-get($colors, light-cell);
      }
      &--dark {
        background-color: map-get($colors, dark-cell);
      }
    }
  }
</style>
