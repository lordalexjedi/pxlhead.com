<template lang='pug'>
  .item-main(v-if='item')
    template(v-if='item')
      .item-view
        .search-box(@click='searching = true')
          input.search(type='search' name='search' placeholder='droids u r looking for...' v-bind:class='{ "search--active": searching }')
        a.item-view-esc
        .item-view-body
          .item-view-text
            h1.item-view-title {{ item.title }}
            p.item-view-description {{ item.description }}
            .item-view-action
              a.item-view-link.link--code VIEW
              a.item-view-comment(@click='commentDown')
          .item-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
          a.music-view-playlist-volume(@click='volume = !volume')
            transition(name='fade')
              .volume-toggle(v-show='volume')
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
          .item-view-social
            a.social-link.link-twitter
            a.social-link.link-facebook
            a.social-link.link-dribbble
          .item-view-tag
            a.tag-link(v-for='n in 3') #CSS
          span.item-view-watch 4242
        .item-view-nav
          a.item-view-arrow.arrow-prev PREV ITEM
          h2 SCROLL
          a.item-view-arrow.arrow-next NEXT ITEM
      .item-comments(v-show='commentClick')
        //- spinner(:show='loading')
        .item-comments-header
          .item-comments-title COMMENTS
            span.item-comments-counter (42)
          a.item-comments-submit(@click='comment=!comment')
        transition(name='fade')
          form.item-comments-form(v-show='comment')
            .item-comments-img
            .item-comments-input
              input.item-comments-name(placeholder='ex. Marty McFly')
              textarea.item-comments-message(placeholder='Dont panic')
            a.item-comments-send
        .item-comments-list(v-if='!loading')
          comment(v-for='id in item.commentIds'  :key='id'  :id='id')
        a.item-comments-up(@click='scrollTop')
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Comment from '@/components/Comment.vue'

export default {
  name: 'music-view',
  components: { Spinner, Comment },

  data: () => ({
    searching: false,
    commentClick: false,
    comment: false,
    loading: true,
    playlist: false,
    volume: false
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
    },
    commentDown() {
      this.commentClick = true,
      TweenLite.to(window, 0.5, { scrollTo: 1000 })
    },
    scrollTop() {
      this.commentClick = false,
      TweenLite.to(window, 0.5, { scrollTo: 0 })
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
@import '../../assets/style/view.scss';

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
  &::after {
    background: url('~@/assets/icons/volume.svg') no-repeat center / 100%;
  }
}
.volume-toggle {
  position: absolute;
  display: flex;
  top: calc(50% - 4rem / 2);
  left: 5rem;
  width: 6rem;
  height: 2rem;
  padding: 1rem;
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
</style>
