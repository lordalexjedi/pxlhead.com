<template lang='pug'>
  .item-main(v-if='item')
    template(v-if='item')
      .item-view
        a.item-view-esc
        .item-view-body
          .item-view-text
            h1.item-view-title {{ item.title }}
            p.item-view-description {{ item.description }}
            .item-view-action
              a.item-view-link.link--code VIEW
              a.item-view-comment(@click='scrollToComments')
          .item-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
          playlist(v-if='item.type === "music"')
          .item-view-social
            a.social-link.link-twitter
            a.social-link.link-facebook
            a.social-link.link-dribbble
          .item-view-tag
            a.tag-link(v-for='n in 3') #CSS
          span.item-view-watch {{ item.views }}
        .item-view-nav
          a.item-view-arrow.arrow-prev PREV ITEM
          h2 SCROLL
          a.item-view-arrow.arrow-next NEXT ITEM
      comments(:item='item' v-show='showComments' ref='comments')
      btn-top
</template>

<script>
import Comments from '@/components/Comments.vue'
import BtnTop from '@/components/BtnTop.vue'
import Playlist from '@/components/Playlist.vue'

export default {
  name: 'item-view',
  components: {
    Comments,
    BtnTop,
    Playlist
  },

  data() {
    return {
      showComments: false
    }
  },

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id]
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

.item-view {
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  background: #fff;
  z-index: 100;
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
  @media (orientation: portrait) {
    &::after {
      bottom: 0;
      height: 70%;
      width: 100%;
      top: 100% - 70%;
    }
  }
}
.search-box {
  @extend %search;
}
.search--active {
  width: 30rem;
  padding: 0 5rem;
  cursor: text;
  @include screen-style(iphone7) {
    width: 27rem;
  };
  @include screen-style(iphoneSE) {
    width: 22rem;
  };
}
.item-view-esc {
  @extend %btn-esc;
}
.item-view-img {
  flex-basis: 80rem;
  height: 60rem;
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
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 20%;
  left: calc(50% - 75% / 2);
  width: 75%;
  height: 60%;
  z-index: 100;
  @include screen-style(iMac) {
    width: 85%;
    left: calc(45% - 85% / 2);
  };
  @media (orientation: portrait) {
    top: 18%;
    height: 70%;
    width: 75%;
    left: calc(50% - 75% / 2);
    flex-direction: column-reverse;
  }
}
.item-view-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex-basis: 50rem;
  height: 95%;
  @media (orientation: portrait) {
    flex-basis: 30%;
    align-items: center;
    width: 90%;
  }
  @include screen-style(iphone7) {
    flex-basis: 60%;
    margin-top: 4rem;
  };
  @include screen-style(iphoneSE) {
    flex-basis: 60%;
    margin-top: 4rem;
  }
}
.item-view-title {
  @extend %heading;
  max-width: 50rem;
  flex-basis: 50%;
  text-align: right;
  color: #4f4f4f;
  margin: 0;
  @media (orientation: portrait) {
    max-width: 90rem;
    font-size: 5rem;
    line-height: 5rem;
    text-align: center;
    min-height: 5rem * 2 + 5rem / 2;
  }
  @include screen-style(iphone7) {
    max-width: 100%;
    min-width: 30rem;
    font-size: 4rem;
    line-height: 4rem;
    text-align: left;
    min-height: 7rem;
    flex-basis: 30%;
  };
  @include screen-style(iphoneSE) {
    max-width: 100%;
    min-width: 30rem;
    font-size: 4rem;
    line-height: 4rem;
    text-align: left;
    min-height: 7rem;
    flex-basis: 30%;
  }
}
.item-view-watch {
  position: absolute;
  display: block;
  bottom: -9rem;
  right: 70rem;
  font-size: 1.7rem;
  color: $color-grey;
  @include screen-style(iMac) {
    right: 56rem;
  };
  @media (orientation: portrait) {
    top: -5rem;
    left: 4rem;
  }
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
.item-view-description {
  @extend %paragraph;
  flex-basis: 50%;
  margin-left: 5rem;
  max-height: 2rem * 6 + 2.5rem / 2;
  color: darken($color-grey, 10%);
  @media (orientation: portrait) {
    text-align: justify;
    max-width: 80rem;
    margin: 0;
  }
  @include screen-style(iphone7) {
    font-size: 1.7rem;
    max-height: 1.7rem * 4 + 2.5rem / 2;
  };
  @include screen-style(iphoneSE) {
    font-size: 1.7rem;
    max-height: 1.7rem * 4 + 2.5rem / 2;
  }
}
.item-view-action {
  flex-basis: 6rem;
  width: 25rem;
  display: flex;
  justify-content: space-between;
  @include screen-style(ipadPro) {
    position: absolute;
    top: 45rem - 6rem / 2;
    right: 10%;
  };
  @include screen-style(ipadAir) {
    position: absolute;
    top: 45rem - 6rem / 2;
    right: 10%;
  };
  @include screen-style(iphone7) {
    align-self: flex-start;
    width: 18rem;
  }
  @include screen-style(iphoneSE) {
    align-self: flex-start;
    width: 18rem;
  }
}
.item-view-link {
  @extend %btn-text;
  @include screen-style(iphone7) {
    width: 12rem;
    height: 5rem;
    line-height: 5rem;
  };
  @include screen-style(iphoneSE) {
    width: 10rem;
    height: 4rem;
    line-height: 4rem;
  }
}
.item-view-comment {
  @extend %btn-icon;
  position: relative;
  width: 6rem;
  height: 6rem;
  @include screen-style(iphone7) {
    width: 5rem;
    height: 5rem;
  };
  @include screen-style(iphoneSE) {
    width: 4rem;
    height: 4rem;
  }
  &::after {
    @include center-pos(4rem);
    background: url('~@/assets/icons/comment.svg') no-repeat center / 50%;
  }
}
.item-view-nav {
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
  z-index: 100;
  @media (orientation: portrait) {
    bottom: 2%;
    flex-direction: row;
    width: 60%;
    height: 7rem;
    left: 20%;
    top: auto;
  }
  h2 {
    font-size: 2rem;
    text-align: center;
    align-self: center;
    @media (orientation: portrait) {
      display: none;
    }
  }
}
.item-view-arrow {
  position: relative;
  width: 100%;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: $color-grey;
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
  @media (orientation: portrait) {
    &::after {
      left: -3rem;
      top: -1rem;
      transform: rotate(-90deg)
    }
  }
}
.arrow-next {
  &::after {
    transform: rotate(180deg);
    bottom: -5rem;
    background: url('~@/assets/icons/arrow.svg') no-repeat center / 100%;
  }
  @media (orientation: portrait) {
    &::after {
      right: -3rem;
      left: auto;
      top: -1rem;
      transform: rotate(90deg);
    }
  }
}
.item-view-tag {
  position: absolute;
  bottom: -10rem;
  right: 5rem;
  width: 44rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include screen-style(iMac) {
    right: 2rem;
  };
  @media (orientation: portrait) {
    width: 60%;
    top: -6rem;
    right: 0;
  }
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
  @include screen-style(ipadPro) {
    box-shadow: none;
    flex-basis: 10rem;
    height: 4rem;
    line-height: 4rem;
  };
  @include screen-style(ipadAir) {
    box-shadow: none;
    flex-basis: 10rem;
    height: 4rem;
    line-height: 4rem;
  };
  @include screen-style(iphone7) {
    box-shadow: none;
    flex-basis: 7rem;
    height: 3rem;
    line-height: 3rem;
  };
  @include screen-style(iphoneSE) {
    box-shadow: none;
    flex-basis: 6rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
  }
}
.item-view-social {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 5rem;
  height: 25rem;
  top: calc(50% - 25rem / 2);
  right: -2.5rem;
  @media (orientation: portrait) {
    top: 18%;
  }
  @include screen-style(iphone7) {
    height: 18rem;
  };
  @include screen-style(iphoneSE) {
    height: 18rem;
  }
}
.social-link {
  @extend %btn-icon;
  position: relative;
  flex-basis: 5rem;
  @include screen-style(iphone7) {
    flex-basis: 4rem;
    width: 4rem;
  };
  @include screen-style(iphoneSE) {
    flex-basis: 4rem;
    width: 4rem;
  }
  &::after {
    @include center-pos(2rem);
  }
  @include screen-style(iphoneSE) {
    &::after {
      @include center-pos(1.5rem);
    }
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

</style>
