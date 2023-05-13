<template>
  <aside class="sidebar">
    <section class="sidebar__rows">
      <div
        v-for="(pair, pairIdx) in pairedSquares"
        :key="pairIdx"
        class="sidebar__row"
        :class="rowColor(pairIdx) + roundedBorder(pairIdx)"
      >
        {{ pairIdx + 1 }}.
        <span
          v-for="(square, squareIdx) in pair"
          :key="squareIdx"
          class="sidebar__col"
        >
          {{ squareStr(square) }}
        </span>
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
      pairedSquares() {
        return this.clickedSquares?.reduce((acc, square: Square) => {
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
        }, [] as Square[][]);
      },
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

  $scrollbar-width: 10px;

  .sidebar {
    width: calc(712px / 3);
    height: 712px;
    background-color: map-get($colors, bg2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-radius: 4px;
    padding-right: $scrollbar-width;

    &__rows {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      width: 100%;
      overflow: hidden;
      overflow-y: auto;

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
      padding: 0 0.4rem;
      font-weight: bold;
      color: map-get($colors, gray);

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
      width: 50%;
      padding: 0 1rem;
    }

    &__button {
      color: map-get($colors, button-fg);
      background-color: map-get($colors, button-bg);
      padding: 0.5rem 1rem;
      margin-bottom: 0.5rem;
      margin-left: $scrollbar-width;
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
