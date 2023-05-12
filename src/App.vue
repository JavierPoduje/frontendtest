<template>
  <h1>Programming challenge</h1>
  <div class="hola">hola</div>
</template>

<script lang="ts">
  export default {
    name: 'App',
    components: {},
    props: {},
    methods: {
      test(name: string) {
        console.log(name);
      },
    },
  };
</script>

<style scoped lang="scss">
  .hola {
    border: 1px solid red;
  }
</style>
