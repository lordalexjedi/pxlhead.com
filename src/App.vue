<template lang='pug'>
  .app
    app-menu
    router-view
</template>

<script>
import AppMenu from '@/components/AppMenu';

export default {
  name: 'app',
  components: { AppMenu },
};
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Montserrat:600,700');
@import url('https://fonts.googleapis.com/css?family=Lato:400');

* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 62.5%;
}
.app {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
}
</style>
