<template lang='pug'>
  .playlist
    a.playlist-volume(@click='showVolume = !showVolume')
      transition(name='fade')
        .volume-toggle(v-show='showVolume')
          .volume-toggler(v-for='n in 6')
    a.playlist-btn(@click='showPlaylist = !showPlaylist')
    transition(name='fade')
      .playlist-body(v-show='showPlaylist')
        li.playlist-list
          .playlist-player(v-for='n in 5')
            a.player-play
            .player-info
              .player-content
                h2.player-name Soundtrack name
                span.player-date 29/12/2017
              .player-control
                input.player-timeline(type='range')
</template>

<script>
export default {
  name: 'playlist',
  data() {
    return {
      showPlaylist: false,
      showVolume: false
    }
  }
}
</script>

<style lang='scss'>
@import '~style';

.playlist-btn {
  @extend %btn-icon;
  top: 7%;
  right: 10%;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  &::after {
    background: url('~@/assets/icons/playlist.svg') no-repeat center / 100%;
  }
}
.playlist-volume {
  @extend %btn-icon;
  top: 15%;
  right: 10%;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  &::after {
    background: url('~@/assets/icons/volume.svg') no-repeat center / 100%;
  }
}
.volume-toggle {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: calc(50% - 4rem / 2);
  top: 5rem;
  width: 2rem;
  height: 6rem;
  padding: 1rem;
  justify-content: space-around;
  align-items: center;
  background-color: $color-pink;
  border-radius: 1rem;
  transition: 0.3s ease-in-out;
}
.volume-toggler {
  flex-basis: 0.7rem;
  width: 100%;
  opacity: 1;
  background-color: $color-white;
  &:hover ~ .volume-toggler {
    opacity: 0.8;
  }
}
.playlist-body {
  position: absolute;
  display: block;
  top: 5%;
  left: 5%;
  width: 50%;
  height: 55vh;
  cursor: auto;
  color: $color-grey;
  background-color: transparentize($color-lightblue, 0.2);
  h2 {
    text-transform: uppercase;
    color: darken($color-grey, 10%);
  }
}
.playlist-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
}
.playlist-player {
  flex-basis: 20%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.player-info {
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.player-play {
  @extend %btn-icon;
  position: relative;
  flex-basis: 4rem;
  height: 4rem;
  &::after {
    @include center-pos(2rem);
    background: url('~@/assets/icons/play.svg') no-repeat center / 100%;
  }
}
.player-play--active {
  &::after {
    background: url('~@/assets/icons/pause.svg') no-repeat center / 100%;
  }
}
.player-content {
  flex-basis: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.player-control {
  flex-basis: 2rem;
  width: 80%;
  display: flex;
  align-items: center;
}
.player-timeline {
  width: 100%;
  height: 0.3rem;
  outline: none;
  border-radius: 0.4rem;
  cursor: pointer;
  background-color: lighten($color-grey, 20%);
  -webkit-appearance: none;
  &::-webkit-slider-thumb{
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    background-color: $color-pink;
    border-radius: 50%;
    cursor: pointer;
  }
  &::-moz-range-thumb{
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    background-color: $color-pink;
    border-radius: 50%;
    cursor: pointer;
  }
}

</style>
