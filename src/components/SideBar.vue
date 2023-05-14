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
  import { defineComponent } from 'vue';
  import { Square } from '../types';

  export default defineComponent({
    name: 'SideBar',
    props: {
      clickedSquares: {
        type: Array as Square[],
        required: true,
      },
      onClear: {
        type: Function as () => void,
        required: true,
      },
    },
    computed: {
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
      // scroll to the bottom of the sidebar if a square is clicked
      const rows = this.$refs.rows as HTMLElement;
      rows.scrollTop = rows.scrollHeight;
    },
    methods: {
      squareStr(square: Square): string {
        return `${square.col}${square.row}`;
      },
      rowColor(idx: number): string {
        return `sidebar__row--${idx % 2 === 0 ? 'dark' : 'light'}`;
      },
      roundedBorder(idx: number): string {
        return `sidebar__row--${idx === 0 ? 'rounded' : ''}`;
      },
    },
  });
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .sidebar {
    align-items: center;
    background-color: map-get($colors, bg2);
    border-radius: map-get($box, border-radius);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    padding: 0 $scrollbar-width;
    height: map-get($board, xxl);
    width: calc(map-get($square, xxl) * 3);

    &__rows {
      display: flex;
      flex-direction: column;
      padding: 0;
      width: 100%;
      overflow: hidden;
      overflow-y: scroll;
      margin-top: 0.5rem;

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
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-weight: bold;

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
      height: calc(map-get($square, md) * 6);
      width: map-get($board, md);
      padding: 0;
      &__button {
        width: calc(map-get($board, md) * 0.9);
      }
    }
  }

  @media (max-width: map-get($breakpoints, sm)) {
    .sidebar {
      height: calc(map-get($square, sm) * 6);
      width: map-get($board, sm);
      padding: 0;
      &__button {
        width: calc(calc(map-get($square, sm) * 3) * 0.8);
      }
    }
  }
</style>
