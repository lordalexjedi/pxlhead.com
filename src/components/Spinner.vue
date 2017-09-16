<template lang='pug'>
  .loader
    - for (var blockNum = 0; blockNum < 23; blockNum++)
      div(class='block block-' + blockNum)
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
  top: calc(50% - 4rem / 2);
  left: calc(50% - 4rem / 2);
  width: 4rem;
  height: 4rem;
  z-index: 1000;
}
.block {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  background-color: $color-pink;
  transition: 0.3s ease-in-out;
}
@for $i from 0 through 23 {
  .block-#{$i} {
    left: 0.6rem * round(($i / 5 + 0.5));
    top: 0.6rem * ($i % 5);
  }
}

.block-11 {
  display: none;
}

.block-4, .block-9, .block-14, .block-19, .block-3 {
  opacity: 0;
  animation: move 1s steps(2, end) 1 forwards, scale 1s ease-in-out 4s forwards;
}

.block-8, .block-12, .block-13, .block-16, .block-17, .block-18 {
  opacity: 0;
  animation: move 1s steps(2, end) 1s 1 forwards, scale 1s ease-in-out 4s forwards;
}

.block-0, .block-1, .block-2, .block-5, .block-6, .block-7 {
  opacity: 0;
  animation: move 1s steps(2, end) 2s 1 forwards, scale 1s ease-in-out 4s forwards;
}

.block-10, .block-15, .block-20, .block-21, .block-22 {
  opacity: 0;
  animation: move 1s steps(2, end) 3s 1 forwards, scale 1s ease-in-out 4s forwards;
}

@keyframes move {
  0% {
    opacity: 1;
    transform: translateY(-1rem)
  }
  100% {
    opacity: 1;
    transform: translateY(0rem)
  }
}

@keyframes scale {
  0% {

    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
