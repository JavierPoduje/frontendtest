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

  $board-size: map-get($board, xxl);
  $square-size: map-get($square, xxl);
  $sidebar-width: calc($square-size * 3);

  .sidebar {
    align-items: center;
    background-color: map-get($colors, bg2);
    border-radius: map-get($box, border-radius);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: $board-size;
    justify-content: space-between;
    padding: 0 $scrollbar-width;
    width: $sidebar-width;

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
      font-weight: map-get($fonts, bold);
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
      width: calc($sidebar-width * 0.8);

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
    $board-size: map-get($board, xl);
    $square-size: map-get($square, xl);
    $sidebar-width: calc($square-size * 3);

    .sidebar {
      width: $sidebar-width;
      height: $board-size;
      &__button {
        width: calc($sidebar-width * 0.8);
      }
    }
  }

  @media (max-width: map-get($breakpoints, lg)) {
    $board-size: map-get($board, lg);
    $square-size: map-get($square, lg);
    $sidebar-width: calc($square-size * 3);

    .sidebar {
      width: $sidebar-width;
      height: $board-size;
      &__button {
        width: calc($sidebar-width * 0.8);
      }
    }
  }

  @media (max-width: map-get($breakpoints, md)) {
    $board-size: map-get($board, md);
    $square-size: map-get($square, md);
    $sidebar-height: calc($square-size * 4);

    .sidebar {
      height: $sidebar-height;
      width: $board-size;
      padding: 0;
      &__button {
        width: calc($board-size * 0.8);
      }
    }
  }

  @media (max-width: map-get($breakpoints, sm)) {
    $board-size: map-get($board, sm);
    $square-size: map-get($square, sm);
    $sidebar-height: calc($square-size * 4);

    .sidebar {
      height: $sidebar-height;
      width: $board-size;
      padding: 0;
      &__button {
        width: calc($board-size * 0.8);
      }
    }
  }
</style>
