<template lang='pug'>
  .menu
    a.menu-btn(@clock='showModal = true')
    .menu-modal
      router-link(to='/experiments') Experiments
</template>

<script>
export default {
  name: 'appMenu',
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style lang='scss' scoped>
@import '~global';

.menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.menu-btn {
  display: block;
  position: absolute;
  top: 6rem;
  left: 6rem;
  width: 6rem;
  height: 6rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: transform ease-out 0.1s, background 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(0.93);
    transition: transform ease-out 0.1s, background 0.2s;
    &::after {
      animation: sonar 1.3s ease-out 75ms;
    }
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    opacity: 0;
    transform: scale(0.7);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: content-box;
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../assets/icons/logo.svg') no-repeat center / 50%;
  }
}

@keyframes sonar {
  0% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.5;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1),
                0 0 10px 10px $color-main,
                0 0 0 10px rgba(255, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1),
                0 0 10px 10px $color-main,
                0 0 0 10px rgba(255, 255, 255, 0.3);
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
