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
    <button class="sidebar__button" @click="onClear">Clear squares</button>
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
    height: $board-size;
    justify-content: space-between;
    padding: 0 $scrollbar-width;
    width: calc($square-size * 3);

    &__rows {
      display: flex;
      flex-direction: column;
      padding: 0;
      width: 100%;
      overflow: hidden;
      overflow-y: auto;
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
        background-color: #272423;
      }
      &--light {
        background-color: #2b2827;
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
      color: map-get($colors, button-fg);
      background-color: map-get($colors, button-bg);
      padding: 0.5rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: map-get($box, border-radius);
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
</style>
