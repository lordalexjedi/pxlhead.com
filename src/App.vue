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

* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 10px;
}
body {
  height: 100%;
  overflow: auto;
  font-family: 'Roboto', sans-serif;
}
.hide-scrollbar {
  overflow: hidden;
}


.menu-transtion-enter-active, .menu-transtion-leave-active {
  transition: opacity .5s
}
.menu-transtion-enter, .menu-transtion-leave-active {
  opacity: 0
}

</style>
