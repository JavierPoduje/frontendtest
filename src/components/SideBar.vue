<template>
  <aside class="sidebar">
    <section ref="rows" class="sidebar__rows">
      <div
        v-for="(pair, pairIdx) in pairedSquares"
        :key="pairIdx"
        class="sidebar__row"
        :class="`${rowColor(pairIdx)} ${roundedBorder(pairIdx)}`"
      >
        <div
          v-for="(square, squareIdx) in pair"
          :key="squareIdx"
          class="sidebar__col"
        >
          <span v-if="squareIdx === 0" class="sidebar__row__numerator">
            {{ pairIdx + 1 }}.
          </span>
          <span class="sidebar__row__square">
            {{ squareStr(square) }}
          </span>
        </div>
      </div>
    </section>
    <button class="sidebar__button" @click="onClear">Clear</button>
  </aside>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Square } from '../types';

  export default defineComponent({
    name: 'SideBar',
    props: {
      /**
       * The squares that have been clicked on the chessboard.
       */
      clickedSquares: {
        type: Array as PropType<Square[]>,
        required: true,
      },
      /**
       * The function to call when the clear button is clicked.
       */
      onClear: {
        type: Function as PropType<() => void>,
        required: true,
      },
    },
    computed: {
      /**
       * Given the clicked squares, return them in pairs.
       *
       * @returns {Square[][]} The clicked squares in pairs.
       */
      pairedSquares(): Square[][] {
        return this.clickedSquares?.reduce(
          (acc: Square[][], square: Square) => {
            if (!acc.length) {
              return [[square]];
            }

            const lastPair = acc[acc.length - 1];

            if (lastPair.length < 2) {
              lastPair.push(square);
            } else {
              acc.push([square]);
            }

            return acc;
          },
          [] as Square[][],
        );
      },
    },
    updated() {
      // Scroll to the bottom of the sidebar if a square is clicked
      const rows = this.$refs.rows as HTMLElement;
      rows.scrollTop = rows.scrollHeight;
    },
    methods: {
      /**
       * Given a square, return the string representation of it.
       *
       * @params {Square} square - The square to evaluate.
       * @returns {string} The string representation of the square.
       */
      squareStr(square: Square): string {
        return `${square.col}${square.row}`;
      },
      /**
       * Given the index of a row, return the class that will color it.
       *
       * @param {number} idx - The index of the row.
       * @returns {string} The class that will color the row.
       */
      rowColor(idx: number): string {
        return `sidebar__row--${idx % 2 === 0 ? 'dark' : 'light'}`;
      },
      /**
       * Given the index of a row, return the class that will round its border.
       *
       * @param {number} idx - The index of the row.
       * @returns {string} The class that will round the row's border.
       */
      roundedBorder(idx: number): string {
        return `sidebar__row--${idx === 0 ? 'rounded' : ''}`;
      },
    },
  });
</script>

<style scoped lang="scss">
  @import '../styles/variables.scss';

  .sidebar {
    align-items: center;
    background-color: map-get($colors, bg2);
    border-radius: map-get($box, border-radius);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: map-get($board, xxl);
    justify-content: space-between;
    padding: 0 $scrollbar-width;
    width: calc(map-get($square, xxl) * 3);

    &__rows {
      display: flex;
      flex-direction: column;
      margin-top: 0.5rem;
      overflow-y: scroll;
      padding: 0;
      width: 100%;

      &::-webkit-scrollbar {
        width: $scrollbar-width;
      }
      &::-webkit-scrollbar-thumb {
        background-color: map-get($colors, scrollbar-thumb);
        border-radius: map-get($box, border-radius);
      }
      &::-webkit-scrollbar-track {
        background-color: map-get($colors, scrollbar-track);
        border-radius: map-get($box, border-radius);
      }
    }

    &__row {
      align-items: center;
      display: flex;
      flex-direction: row;
      font-weight: bold;
      justify-content: flex-start;

      &__numerator {
        color: map-get($colors, gray);
        flex-grow: 1;
      }
      &__square {
        flex-grow: 4;
      }

      &--dark {
        background-color: map-get($colors, sidebar-dark-row);
      }
      &--light {
        background-color: map-get($colors, sidebar-light-row);
      }
      &--rounded {
        border-radius: map-get($box, border-radius);
      }
    }

    &__col {
      color: map-get($colors, fg2);
      display: flex;
      justify-content: flex-start;
      width: 40%;
    }

    &__button {
      background-color: map-get($colors, button-bg);
      border-radius: map-get($box, border-radius);
      color: map-get($colors, button-fg);
      margin-bottom: 0.5rem;
      padding: 0.5rem 1rem;
      width: 80%;

      &:hover {
        background-color: map-get($colors, button-bg-hover);
        color: map-get($colors, button-fg-hover);
      }
      &:active {
        background-color: map-get($colors, button-bg-active);
        color: map-get($colors, button-fg-active);
      }
    }
  }

  @media (max-width: map-get($breakpoints, xl)) {
    .sidebar {
      width: calc(map-get($square, xl) * 3);
      height: map-get($board, xl);
      &__button {
        width: calc(calc(map-get($square, xl) * 3) * 0.8);
      }
    }
  }

  @media (max-width: map-get($breakpoints, lg)) {
    .sidebar {
      width: calc(map-get($square, lg) * 3);
      height: map-get($board, lg);
      &__button {
        width: calc(calc(map-get($square, lg) * 3) * 0.8);
      }
    }
  }

  @media (max-width: map-get($breakpoints, md)) {
    .sidebar {
      height: calc(map-get($square, md) * 5);
      width: map-get($board, md);
      padding: 0;
      &__button {
        width: calc(map-get($board, md) * 0.9);
      }
    }
  }

  @media (max-width: map-get($breakpoints, sm)) {
    .sidebar {
      height: calc(map-get($square, sm) * 5);
      width: map-get($board, sm);
      padding: 0;
      &__button {
        width: calc(map-get($board, md) * 0.9);
      }
    }
  }
</style>
