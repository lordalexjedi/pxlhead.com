<template lang='pug'>
  #app
    .app-menu
      a.app-menu-btn
      span.app-menu-title PXLHEAD
    router-view
</template>

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

.app-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
.app-menu-btn {
  display: block;
  position: absolute;
  top: 3rem;
  left: 5rem;
  width: 5rem;
  height: 5rem;
  background-color: transparentize($color-white, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: transform ease-out 0.1s, background 0.2s;
  &:hover {
    background-color: transparentize($color-white, 0.9);
    transform: scale(0.9);
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
    box-shadow: 0 0 0 2px transparentize($color-white, 0.9);
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
    background: url('assets/icons/logo.svg') no-repeat center / 40%;
  }
}
.app-menu-title {
  display: block;
  position: absolute;
  top: 4.5rem;
  left: 12rem;
  font-size: 2rem;
  font-weight: 600;
  color: $color-white;
}
@keyframes sonar {
  0% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.5;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1),
                0 0 10px 10px #12233f,
                0 0 0 10px rgba(255, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1),
                0 0 10px 10px #12233f,
                0 0 0 10px rgba(255, 255, 255, 0.3);
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
