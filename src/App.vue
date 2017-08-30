<template lang='pug'>
  #app
    app-menu
    router-view
</template>

<script>
import AppMenu from '@/components/AppMenu.vue'

export default {
  name: 'app',
  components: { AppMenu }
}
</script>

<style lang='scss'>
@import '~style';

@import url('https://fonts.googleapis.com/css?family=Montserrat:600,700');
@import url('https://fonts.googleapis.com/css?family=Roboto:400');
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,700');

* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 62.5%;
}
body {
  font-family: 'Roboto', sans-serif;
  // overflow: hidden;
}
</style>
