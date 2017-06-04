<template lang='pug'>
  .intro
</template>

<script>
import World from './intro/World';

export default {
  name: 'intro',
  data() {
    return {
      world: null,
    };
  },
  mounted() {
    this.world = new World(this.$el);
    this.world.init();
    this.world.animate();
  },
};
</script>

<style>
.intro {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #000046, #1cb5e0);
}
</style>
