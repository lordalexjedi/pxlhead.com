<template lang='pug'>
  #app
    app-menu
    transition(name='menu-transtion' mode='out-in')
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
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 10px;
}
body {
  height: 100%;
  font-family: 'Roboto', sans-serif;
}
.hide-scrollbar {
  overflow: hidden;
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

.menu-transtion-enter-active, .menu-transtion-leave-active {
  transition: opacity .5s
}
.menu-transtion-enter, .menu-transtion-leave-active {
  opacity: 0
}

</style>
