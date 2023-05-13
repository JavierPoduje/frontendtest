<template>
  <aside class="sidebar">
    <div v-for="square in clickedSquares" :key="square">
      {{ square }}
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
    data() {
      return {
        rows: 24,
      };
    },
  });
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .sidebar {
    width: calc(712px / 3);
    height: 712px;
    background-color: map-get($colors, bg2);
  }
</style>
