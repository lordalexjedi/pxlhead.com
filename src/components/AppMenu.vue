<template lang='pug'>
  .menu
    a.menu-btn(@click='showModal = !showModal')
    .menu-modal
      a.menu-esc(@click='showModal = !showModal')
      a.menu-home HOME
      .menu-spinner
        nav.menu-links
          a.menu-link.link-experiments.link--active E
          a.menu-link.link-projects P
          a.menu-link.link-articles A
          a.menu-link.link-music M
        h2.menu-text EXPERIMENTS
        .menu-orbit
      .menu-social
        a.social-link.link-twitter
        a.social-link.link-facebook
        a.social-link.link-dribbble
        a.social-link.link-behance
      .menu-music
        .music-round
          a.music-toggle
          a.volume-set.toggle-up
          a.volume-set.toggle-down
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
  top: 5rem;
  left: 5rem;
  width: 6rem;
  height: 6rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: transform ease-out 0.1s, background 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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

// modal
.menu-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: $color-main;
}
.menu-esc {
  position: absolute;
  display: block;
  top: 4rem;
  right: 4rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid $color-white;
  transition: 0.3s ease-in-out;
  &::before {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 2rem / 2);
    left: calc(50% - 0.3rem / 2);
    height: 2rem;
    width: 0.3rem;
    transform: rotate(45deg);
    background: $color-white;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 2rem / 2);
    left: calc(50% - 0.3rem / 2);
    height: 2rem;
    width: 0.3rem;
    transform: rotate(-45deg);
    background: $color-white;
  }
}
.menu-home {
  position: absolute;
  display: block;
  top: 4rem;
  left: 4rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  color: $color-white;
  font-size: 20px;
  font-weight: 800;
  line-height: 2.2;
  transition: 0.3s ease-in-out;
  &::before {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 4rem / 2);
    left: calc(25% - 4rem / 2);
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 3px solid $color-white;
  }
}
.menu-spinner {
  position: absolute;
  top: calc(50% - 30rem / 2);
  left: calc(50% - 30rem / 2);
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  background: #98C9D6;
  z-index: 1003;
  box-shadow: 0px 8px 20px darken(#98B5D6, 50%);
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: calc(50% - 50rem / 2);
    left: calc(50% - 50rem / 2);
    width: 50rem;
    height: 50rem;
    border-radius: 50%;
    background: #98B5D6;
    opacity: 0.3;
    z-index: 1002;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: calc(50% - 60rem / 2);
    left: calc(50% - 60rem / 2);
    width: 60rem;
    height: 60rem;
    border-radius: 50%;
    background: #F2F2F2;
    opacity: 0.1;
    z-index: 1001;
  }
}
.menu-orbit {
  position: absolute;
  top: calc(50% - 70rem / 2);
  left: calc(50% - 70rem / 2);
  width: 70rem;
  height: 70rem;
  // border: 4px dotted $color-white;
  border-radius: 50%;
  opacity: 0.6;
  z-index: 1004;
}
.menu-links {
  position: absolute;
  display: block;
  top: calc(50% - 72rem / 2);
  left: calc(50% - 72rem / 2);
  width: 72rem;
  height: 72rem;
}
.menu-link {
  position: absolute;
  display: block;
  width: 4rem;
  height: 4rem;
  text-align: center;
  line-height: 2.7;
  color: $color-white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 50%;
  background: $color-white;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  z-index: 1005;
}
.link-experiments {
  top: calc(0% - 1.75rem / 2);
  left: calc(50% - 4rem / 2);
}
.link-projects {
  top: calc(50% - 4rem / 2);
  left: calc(0% - 1.75rem / 2);
}
.link-articles {
  bottom: calc(0% - 1.75rem / 2);
  right: calc(50% - 4rem / 2);
}
.link-music {
  bottom: calc(50% - 4rem / 2);
  right: calc(0% - 2.35rem / 2);
}
.link--active {
  background: $color-main;
  border: 3px solid $color-white;
  transition: 0.3s ease-in-out;
}
.menu-text {
  position: absolute;
  top: calc(50% - 2rem / 2);
  left: calc(50% - 16rem / 2);
  display: block;
  width: 16rem;
  height: 2rem;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  color: $color-white;
}
.menu-social {
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  width: 2rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.social-link {
  flex-basis: 2rem;
  width: 2rem;
  display: block;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: 0.3s;
  }
}
.link-twitter {
  background: url(../assets/icons/Twitter.svg) no-repeat;
  background-size: 100%;
}
.link-facebook {
  background: url(../assets/icons/Facebook.svg) no-repeat;
  background-size: 100%;
}
.link-dribbble {
  background: url(../assets/icons/Dribbble.svg) no-repeat;
  background-size: 100%;
}
.link-behance {
  background: url(../assets/icons/Behance.svg) no-repeat;
  background-size: 100%;
}
.menu-music {
  position: absolute;
  bottom: 4rem;
  left: 4rem;
  width: 8rem;
  height: 8rem;
}
.music-round {
  width: 8rem;
  height: 8rem;
  position: absolute;
  top: calc(50% - 8.6rem / 2);
  left: calc(50% - 8.6rem / 2);
  border: 0.3rem solid $color-white;
  border-radius: 50%;
  transform: scale(0.6);
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  cursor: pointer;
  &:hover {
    transform: scale(1);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &:hover .music-toggle{
    transform: scale(1);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
    animation: none;
  }
  &:hover .music-toggle--on{
    border-radius: 5%;
    opacity: 1;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &:hover .toggle-up{
    transform: translateX(-2.4rem) scale(0.6);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &:hover .toggle-down{
    transform: translateX(2.4rem) scale(0.6);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
}
.music-toggle {
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: calc(50% - 2rem / 2);
  left: calc(50% - 2rem / 2);
  background-color: $color-white;
  border-radius: 50%;
  transform: scale(1.4);
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  animation: scale 1.5s ease-in-out 1s infinite;
}
.btn-toggle--on {
  opacity: 0;
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
}
.toggle-up {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: calc(50% - 3rem / 2);
  left: calc(50% - 3rem / 2);
  border-radius: 1rem;
  transform: translateX(0rem) scale(0);
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  &::before {
    width: 1.8rem;
    height: 0.3rem;
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 0.3rem / 2);
    left: calc(50% - 1.8rem / 2);
    background-color: $color-white;
    border-radius: 1rem;
    transform: rotate(90deg);
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &::after {
    width: 1.8rem;
    height: 0.3rem;
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 0.3rem / 2);
    left: calc(50% - 1.8rem / 2);
    background-color: $color-white;
    border-radius: 1rem;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
}
.toggle-down {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: calc(50% - 3rem / 2);
  left: calc(50% - 3rem / 2);
  border-radius: 1rem;
  transform: translateX(0rem) scale(0);
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  &::after {
    width: 1.8rem;
    height: 0.3rem;
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 0.3rem / 2);
    left: calc(50% - 1.8rem / 2);
    background-color: $color-white;
    border-radius: 1rem;
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
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

@keyframes scale {
  0% {
    transform: scale(1.4);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1.4);
  }
}

</style>
