<template lang='pug'>
  a.btn-top(@click='scrollTop')
</template>

<script>
import { TweenLite } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export default {
  name: 'btn-top',
  methods: {
    scrollTop() {
      TweenLite.to(window, 0.5, { scrollTo: 0 })
    }
  }
}
</script>

<style lang='scss'>
@import '~style';

.btn-top {
  position: fixed;
  bottom: 2rem;
  right: 5rem;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: $color-pink;
  transition: 0.3s ease-in-out;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 100;
  @include screen-style(ipadPro) {
    right: 3rem;
  };
  @include screen-style(ipadAir) {
    right: 2rem;
  };
  @include screen-style(iphone7) {
    right: 2rem;
    width: 5rem;
    height: 5rem;
  };
  @include screen-style(iphoneSE) {
    right: 2rem;
    width: 4.5rem;
    height: 4.5rem;
  };
  &:after {
    position: absolute;
    display: block;
    content: '';
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    background: url('~@/assets/icons/arrow-small.svg') no-repeat center / 100%;
  }
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s ease-in-out;
  }
}

</style>
