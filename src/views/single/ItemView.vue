<template lang='pug'>
  .item-main(v-if='item')
    transition(name='fade' appear)
    .item-overlay(v-if='item')
    transition(name='slide-up' appear)
      .item-view(v-if='item')
        .item-view-body
          .item-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
          .item-view-text
            h1.item-view-title {{ item.title }}
            p.item-view-description {{ item.description }}
            .item-view-action
              a.item-view-link VIEW
              a.item-view-comment.material-icons(@click='scrollToComments') comment
          playlist(v-if='item.type === "music"')
          .item-view-tag
            a.tag-link(v-for='tag in item.tags') {{ tag }}
          .item-view-watch
            i.material-icons remove_red_eye
            span.watch-counter {{ item.views }}
          .item-view-date
            i.material-icons date_range
            span.view-date {{ item.time }}
          .item-view-social
            a.social-link.link-twitter
            a.social-link.link-facebook
            a.social-link.link-dribbble
        a.item-view-esc.material-icons close
        a.item-view-arrow.material-icons.arrow-prev keyboard_arrow_left
        a.item-view-arrow.material-icons.arrow-next keyboard_arrow_right
        comments(:item='item' v-show='showComments' ref='comments')
</template>

<script>
import Comments from '@/components/Comments.vue'
import Playlist from '@/components/Playlist.vue'

export default {
  name: 'item-view',

  components: {
    Comments,
    Playlist
  },

  props: {
    id: String
  },

  data() {
    return {
      showComments: false
    }
  },

  computed: {
    item() {
      return this.$store.state.items[this.id]
    }
  },

  title() {
    return this.item.title
  },

  methods: {
    scrollToComments() {
      this.showComments = true

      const commentEl = this.$refs.comments.$el
      TweenLite.to(window, 0.5, { scrollTo: commentEl })
    }
  }
}
</script>

<style lang='scss'>
@import '~style';

.item-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(51, 51, 51, 0.8);
}
.item-view {
  position: fixed;
  overflow-y: auto;
  bottom: 0;
  left: 25vw;
  height: 90vh;
  width: 50vw;
  background: $color-white;
  z-index: 1001;
}
.item-view-esc {
  position: absolute;
  width: 5rem;
  height: 5rem;
  font-size: 4rem;
  color: $color-white;
  right: -20rem;
  top: 0;
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background: transparent;
  &:hover {
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
}
.item-view-img {
  width: 100%;
  flex-basis: 55rem;
  @extend %img;
  @include screen-style(iMac) {
    flex-basis: 65rem;
    height: 55rem;
  };
  @media (orientation: portrait) {
    width: 100%;
    flex-basis: 45rem;
  }
}
.item-view-body {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 80%;
  margin: 10%;
}
.item-view-text {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 0;
}
.item-view-title {
  max-width: 50rem;
  font-size: 3rem;
  text-align: left;
  color: #4f4f4f;
  margin: 0;
}

.item-view-description {
  @extend %paragraph;
  padding: 2rem 0 1rem 0;
  flex-basis: 50%;
  width: 100%;
  max-width: 100%;
  font-size: 2rem;
  line-height: 2rem;
  min-height: 1.5rem * 2 + 2rem / 2;
  max-height: 1.5rem * 3 + 2rem / 2;
  color: darken($color-grey, 10%);
  text-align: justify;
}
.item-view-action {
  position: absolute;
  top: -7rem;
  right: 4rem;
  width: 22rem;
  display: flex;
  justify-content: space-between;
}
.item-view-link {
  @extend %btn-text;
  box-shadow: none;
  width: 14rem;
  height: 5rem;
  line-height: 5rem;
  &:hover {
    box-shadow: $shadow;
  }
}
.item-view-comment {
  width: 5rem;
  height: 5rem;
  color: $color-white;
  font-size: 2rem;
  text-align: center;
  line-height: 5rem;
  background-color: $color-pink;
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: $shadow;
    background-color: darken($color-pink, 10%);
    transition: all 0.3s ease-in-out;
  }
  @include screen-style(iphone7) {
    width: 5rem;
    height: 5rem;
  };
  @include screen-style(iphoneSE) {
    width: 4rem;
    height: 4rem;
  }
}
.item-view-watch {
  position: absolute;
  display: block;
  top: -4rem;
  left: 4rem;
  font-size: 1.7rem;
  color: $color-grey;
  i {
    position: absolute;
    display: block;
    left: -4rem;
    line-height: 1.7rem;
  }
  .view-counter {
    position: absolute;
    display: block;
    left: 0rem;
  }
}
.item-view-date {
  position: absolute;
  display: block;
  width: 5rem;
  height: 2rem;
  top: -4rem;
  left: 14rem;
  font-size: 1.7rem;
  color: $color-grey;
  i {
    position: absolute;
    display: block;
    left: -4rem;
    line-height: 1.7rem;
  }
  .view-date{
    position: absolute;
    display: block;
    left: 0rem;
  }
}
.item-view-arrow {
  position: absolute;
  top: 20rem;
  width: 7rem;
  height: 7rem;
  font-size: 6rem;
  color: $color-white;
  opacity: 0.8;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
}
.arrow-prev {
  left: -10rem;
}
.arrow-next {
  right: -10rem;
}
.item-view-tag {
  position: relative;
  width: 35rem;
  display: flex;
  justify-content: space-between;
}
.tag-link {
  @extend %btn-text;
  flex-basis: 10rem;
  height: 4rem;
  background-color: $color-blue;
  line-height: 4rem;
  box-shadow: none;
  &:hover {
    box-shadow: $shadow;
    background-color: darken($color-blue, 10%);
  }
}
.item-view-social {
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 18rem;
  height: 5rem;
  top: -5.5rem;
  right: 0rem;
}
.social-link {
  position: relative;
  flex-basis: 5rem;
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(200, 200, 200, 0.8);
    transition: all 0.3s ease-in-out;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    @include center-pos(2rem);
  }
}
.link-twitter {
  &::after {
    background: url('~@/assets/icons/twitter-black.svg') no-repeat center / 100%;
  }
}
.link-facebook {
  &::after {
    background: url('~@/assets/icons/facebook-black.svg') no-repeat center / 100%;
  }
}
.link-dribbble {
  &::after {
    background: url('~@/assets/icons/link-black.svg') no-repeat center / 120%;
  }
}

</style>
