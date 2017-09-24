<template lang='pug'>
  .notification(v-show='show')
    p.notification-text {{ text }}
</template>

<script>
export default {
  name: 'notification',
  props: {
    text: String
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    text() {
      this.show = true
      setTimeout(() => this.show = false, 4000)
    }
  }
}
</script>

<style lang='scss'>
@import '~style';

.notification {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 2rem;
  background-color: transparentize($color-blue, 0.6);
}
.notification-text {
  color: $color-white;
  font-size: 1.5rem;
}

</style>
