<template>
  <aside class="sidebar">
    <div
      v-for="(pair, pairIdx) in pairedSquares"
      :key="pairIdx"
      class="sidebar__row"
      :class="rowColor(pairIdx)"
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
    },
  });
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .sidebar {
    width: calc(712px / 3);
    height: 712px;
    background-color: map-get($colors, bg2);
    display: flex;
    flex-direction: column;

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
    }

    &__col {
      color: map-get($colors, fg2);
      display: flex;
      justify-content: flex-start;
      width: 50%;
      padding: 0 1rem;
    }
  }
</style>
