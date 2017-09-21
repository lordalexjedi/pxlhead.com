<template lang='pug'>
  .loader
    - for (var orbit = 1; orbit < 3; orbit++)
      div(class='orbit orbit-' + orbit)
        .planet
    .planet.center-planet
</template>

<script>
export default {
  name: 'spinner',
  props: ['show'],
  serverCacheKey: props => props.show
}
</script>

<style lang='scss'>
@import '~style';

.loader {
  position: absolute;
  top: calc(50% - 10rem / 2);
  left: calc(50% - 10rem / 2);
  width: 10rem;
  height: 10rem;
  z-index: 1000;
  transform: scale(0.6);
  // animation: scale 5s $easing infinite;
}
@for $i from 1 through 3 {
  .orbit-#{$i} {
    top: calc(50% - #{$i} * 6rem / 2 - 2px);
    left: calc(50% - #{$i} * 6rem / 2 - 2px);
    width: $i * 6rem;
    height: $i * 6rem;
    animation: rotate $i + 1.2s linear 0.3s infinite;
  }
}
.orbit {
  position: absolute;
  border-radius: 50%;
  border: 2px solid $color-blue;
}
.planet {
  position: absolute;
  top: -0.5rem;
  left: calc(50% - 1rem / 2);
  width: 1rem;
  height: 1rem;
  background-color: $color-blue;
  border-radius: 50%;
}
.center-planet {
  top: calc(50% - 2rem / 2);
  left: calc(50% - 2rem / 2);
  width: 2rem;
  height: 2rem;
  animation: rotate 1s linear 0.3s infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

@keyframes scale {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(1);
  }
  90% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

</style>
