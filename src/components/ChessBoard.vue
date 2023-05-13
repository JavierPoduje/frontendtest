<template>
  <div class="chessboard">
    <div v-for="(row, rowIdx) in rows" :key="row" class="chessboard__row">
      <div v-for="(col, colIdx) in cols" :key="col" class="chessboard__col">
        <div
          class="chessboard__cell"
          :class="cellColor(rowIdx, colIdx)"
          @click="onCellClick(row, col)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ChessBoard',
    data() {
      return {
        cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        rows: [8, 7, 6, 5, 4, 3, 2, 1],
      };
    },
    methods: {
      cellColor(rowIdx: number, colIdx: number): string {
        const isLightCell = (rowIdx + colIdx) % 2 === 0;
        if (isLightCell) {
          return 'chessboard__cell--light';
        } else {
          return 'chessboard__cell--dark';
        }
      },
      onCellClick(row: string, col: number) {
        console.log(col, row);
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

      &:active {
        box-shadow: inset 0px 0px 0px 5px #fff;
      }
    }
  }
</style>
