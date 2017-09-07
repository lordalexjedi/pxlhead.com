<template lang='pug'>
  .music-view(v-if='item')
    template(v-if='item')
      .search-box
        input.search(type='search' name='search' placeholder='droids u r looking for...')
      a.music-view-esc
      .music-view-body
        .music-view-text
          h1.music-view-title {{ item.title }}
          p.music-view-description {{ item.description }}
          .music-view-action
            a.music-view-link.link--code(@click='playlist = !playlist') PLAY
            a.music-view-comment
        .music-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
        a.music-view-playlist-volume
          .volume-toggle
            .volume-toggler(v-for='n in 6')
        a.music-view-playlist-btn(@click='playlist = !playlist')
          transition(name='fade')
            .playlist-body(v-show='playlist')
              li.playlist-list
                .playlist-player(v-for='n in 5')
                  a.player-play
                  .player-info
                    .player-content
                      h2.player-name Soundtrack name
                      span.player-date 29/12/2017
                    .player-control
                      input.player-timeline(type='range')
        .music-view-social
          a.social-link.link-twitter
          a.social-link.link-facebook
          a.social-link.link-dribbble
        .music-view-tag
          a.tag-link(v-for='n in 3') #CSS
        span.music-view-watch 4242
    .music-view-nav
      a.music-view-arrow.arrow-prev PREV ITEM
      h2 SCROLL
      a.music-view-arrow.arrow-next NEXT ITEM
    .music-view-comments
      //- spinner(:show='loading')
      .comment-children(v-if='!loading')
        comment(v-for='id in item.commentIds'  :key='id'  :id='id')
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Comment from '@/components/Comment.vue'

export default {
  name: 'music-view',
  components: { Spinner, Comment },

  data: () => ({
    loading: true,
    playlist: false
  }),

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id]
    }
  },

  title() {
    return this.item.title
  },

  beforeMount() {
    this.fetchComments()
  },

  watch: {
    item: 'fetchComments'
  },

  methods: {
    fetchComments() {
      if (this.item.commentIds) {
        this.loading = true
        fetchComments(this.$store, this.item).then(() => {
          this.loading = false
        })
      }
    }
  }
}

function fetchComments(store, item) {
  if (item && item.commentIds) {
    return store.dispatch('FETCH_COMMENTS', {
      ids: item.commentIds
    })
  }
}
</script>

<style lang='scss'>
@import '~style';

.music-view {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    width: 73%;
    height: 100%;
    background: #f2f2f2;
  }
}
.search-box {
  position: absolute;
  top: 3rem;
  right: 17%;
  cursor: pointer;
  z-index: 100;
  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 2.5rem / 2);
    left: 1.3rem;
    width: 2.5rem;
    height: 2.5rem;
    background: url('~@/assets/icons/search.svg') no-repeat center / 100%;
  }
}
.search {
  display: block;
  appearance: none;
  background-color: #E0E0E0;
  color: $color-main;
  padding: 0 2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 40px;
  border-style: none;
  outline-style: none;
  font-size: 1.6rem;
  transition: all .5s;
  @include screen-style(fullHd) {
    width: 30rem;
    padding: 0 5rem;
  };
  @include screen-style(iMac) {
    width: 30rem;
    padding: 0 5rem;
  };
  &:focus {
    background-color: $color-blue;
    color: $color-white;
  }
}
.music-view-img {
  @extend %img;
  flex-basis: 80rem;
  height: 60rem;
}
.music-view-playlist-btn {
  @extend %btn-icon;
  top: 3rem;
  left: 50%;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  &::after {
    background: url('~@/assets/icons/playlist.svg') no-repeat center / 100%;
  }
}
.music-view-playlist-volume {
  @extend %btn-icon;
  top: 3rem;
  left: 55%;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  &:hover {
    width: 15rem;
  }
  &::after {
    background: url('~@/assets/icons/volume.svg') no-repeat center / 100%;
  }
}
.volume-toggle {
  position: absolute;
  display: flex;
  opacity: 1;
  top: calc(50% - 2rem / 2);
  left: 4rem;
  width: 0rem;
  height: 2rem;
  justify-content: space-around;
  align-items: center;
  background-color: $color-pink;
  border-radius: 1rem;
  transition: 0.3s ease-in-out;
}
.volume-toggler {
  flex-basis: 0.7rem;
  height: 100%;
  opacity: 1;
  background-color: $color-white;
  &:hover ~ .volume-toggler {
    opacity: 0.8;
  }
}
.music-view-playlist-volume:hover .volume-toggle {
  width: 8rem;
  transition: 0.3s ease-in-out;
}
.playlist-body {
  position: absolute;
  display: block;
  top: 7rem;
  left: -4rem;
  width: 50rem;
  height: 46rem;
  cursor: auto;
  color: $color-grey;
  background-color: $color-white;
  &::before {
    display: block;
    content: '';
    top: -4rem;
    left: 5rem;
    border: solid transparent;
    height: 2rem;
    width: 0rem;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-width: 0rem 1rem 2rem 1rem;
    border-bottom-color: $color-white;
    margin-bottom: -10px;
  }
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
.music-view-body {
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 20%;
  background-position: center;
  background-size: cover;
  left: calc(50% - 75% / 2);
  width: 75%;
  height: 60%;
  z-index: 100;
}
.music-view-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 95%;
  // padding: 4rem;
}
.music-view-title {
  @extend %heading;
  max-width: 50rem;
  flex-basis: 50%;
  text-align: right;
  color: #4f4f4f;
}
.music-view-watch {
  position: absolute;
  display: block;
  bottom: -9rem;
  right: 70rem;
  font-size: 1.7rem;
  color: $color-grey;
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 2rem;
    height: 2rem;
    top: 0;
    left: -4rem;
    background: url('~@/assets/icons/eye-black.svg') no-repeat center / 100%;
  }
}
.music-view-description {
  @extend %paragraph;
  flex-basis: 20%;
  margin-left: 5rem;
  max-height: 2rem * 6 + 2.5rem / 2;
  color: darken($color-grey, 10%);
}
.music-view-action {
  flex-basis: 6rem;
  width: 25rem;
  display: flex;
  justify-content: space-between;
}
.music-view-link {
  @extend %btn-text;
}

.music-view-comment {
  @extend %btn-icon;
  position: relative;
  width: 6rem;
  height: 6rem;
  &::after {
    @include center-pos(4rem);
    background: url('~@/assets/icons/comment.svg') no-repeat center / 50%;
  }
}
.music-view-nav {
  position: absolute;
  top: 20%;
  right: 5rem;
  width: 7rem;
  height: 60%;
  display: flex;
  color: transparentize($color-grey, 0.2);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 2rem;
    text-align: center;
    align-self: center;
  }
}
.music-view-arrow {
  position: relative;
  width: 100%;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: $color-grey;
    transition: 0.3s ease-in-out;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    left: calc(50% - 4rem / 2);
    width: 4rem;
    height: 4rem;
  }
}
.arrow-prev {
  &::after {
    top: -5rem;
    background: url('~@/assets/icons/arrow.svg') no-repeat center / 100%;
  }
}
.arrow-next {
  &::after {
    transform: rotate(180deg);
    bottom: -5rem;
    background: url('~@/assets/icons/arrow.svg') no-repeat center / 100%;
  }
}
.music-view-tag {
  position: absolute;
  bottom: -10rem;
  right: 5rem;
  width: 44rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag-link {
  @extend %btn-text;
  flex-basis: 12rem;
  height: 5rem;
  background-color: $color-blue;
  line-height: 5rem;
  &:hover {
    background-color: darken($color-blue, 10%);
  }
}
.music-view-social {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 6rem;
  height: 25rem;
  top: calc(50% - 25rem / 2);
  right: -3rem;
}
.social-link {
  @extend %btn-icon;
  position: relative;
  flex-basis: 5rem;
  &::after {
    @include center-pos(2rem);
  }
}
.link-twitter {
  &::after {
    background: url('~@/assets/icons/twitter.svg') no-repeat center / 100%;
  }
}
.link-facebook {
  &::after {
    background: url('~@/assets/icons/facebook.svg') no-repeat center / 100%;
  }
}
.link-dribbble {
  &::after {
    background: url('~@/assets/icons/link.svg') no-repeat center / 120%;
  }
}
.music-view-esc {
  @extend %btn-esc;
}
</style>
