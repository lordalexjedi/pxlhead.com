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
      .item-comments(v-show='showComments')
        //- spinner(:show='loading')
        .item-comments-header
          .item-comments-title COMMENTS
            span.item-comments-counter {{ commentsCount }}
          a.item-comments-submit(@click='showCommentForm = !showCommentForm')
        transition(name='fade')
          form.item-comments-form(v-show='showCommentForm')
            .item-comments-img
            .item-comments-input
              input.item-comments-name(placeholder='ex. Marty McFly')
              textarea.item-comments-message(placeholder='Dont panic')
            a.item-comments-send
        .item-comments-list(v-if='!loading')
          comment(v-for='id in item.commentIds'  :key='id'  :id='id')
      btn-top
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Comment from '@/components/Comment.vue'
import BtnTop from '@/components/BtnTop.vue'
import Playlist from '@/components/Playlist.vue'

export default {
  name: 'item-view',
  components: {
    Spinner,
    Comment,
    BtnTop,
    Playlist
  },

  data: () => ({
    loading: true,
    showComments: false,
    showCommentForm: false
  }),

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id]
    },
    commentsCount() {
      return this.item.commentIds
      ? this.item.commentIds.length
      : 0
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
    scrollToComments() {
      this.showComments = true
      TweenLite.to(window, 0.5, { scrollTo: 1000 })
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
.item-comments {
  position: relative;
  background-color: #F8FCFF;
  min-height: 100vh;
}
.item-comments-header {
  position: relative;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;
  width: 100rem;
  top: 0;
  left: calc(50% - 100rem / 2);
}
.item-comments-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: darken($color-grey, 17%);
}
.item-comments-submit {
  position: relative;
  flex-basis: 5rem;
  height: 5rem;
  margin-right: 4rem;
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  cursor: pointer;
  line-height: 4rem;
  background-color: $color-pink;
  transition: 0.3s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &::before {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 0.3rem / 2);
    left: calc(50% - 2.5rem / 2);
    width: 2.5rem;
    height: 0.3rem;
    background-color: $color-white;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 2.5rem / 2);
    left: calc(50% - 0.3rem / 2);
    width: 0.3rem;
    height: 2.5rem;
    background-color: $color-white;
  }
}
.comment-submit--active {
  transform: rotate(45deg);
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
}
.item-comments-list {
  position: relative;
  display: flex;
  width: 100rem;
  top: 0rem;
  padding: 3rem 0;
  left: calc(50% - 100rem / 2);
  flex-direction: column;
  justify-content: space-between;
}
.item-comments-up {
  position: fixed;
  display: block;
  width: 6rem;
  height: 6rem;
  bottom: 5rem;
  right: 5rem;
  cursor: pointer;
  background-color: $color-pink;
  transition: 0.3s ease-in-out;
  border-radius: 50%;
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 3rem / 2);
    left: calc(50% - 3rem / 2);
    width: 3rem;
    height: 3rem;
    background: url('~@/assets/icons/arrow-small.svg') no-repeat center / 120%;
  }
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s ease-in-out;
  }
}
.item-comments-form {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem 0;
  margin-bottom: 4rem;
  height: 15rem;
  width: 100rem;
  top: 0;
  left: calc(50% - 100rem / 2);
  background-color: $color-lightblue;
  transition: 0.5s ease-in-out;
  &::after {
    display: block;
    content: '';
    top: -7rem;
    right: 4.5rem;
    border: solid transparent;
    height: 4rem;
    width: 0rem;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-width: 0rem 2rem 4rem 2rem;
    border-bottom-color: $color-lightblue;
    margin-bottom: -10px;
  }
  .item-comments-img {
    width: 10rem;
    height: 10rem;
    background-color: $color-pink;
  }
  .item-comments-input {
    flex-basis: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
  }
  .item-comments-name {
    font-size: 1.8rem;
    color: darken($color-grey, 10%);
    padding: 1rem;
    flex-basis: 2rem;
    width: 60%;
    appearance: none;
    outline-color: $color-blue;
    border: 0.2rem solid lighten($color-blue, 10%);
  }
  .item-comments-message {
    font-size: 1.8rem;
    color: darken($color-grey, 10%);
    padding: 1rem;
    flex-basis: 40%;
    appearance: none;
    outline-color: $color-blue;
    border: 0.2rem solid lighten($color-blue, 10%);
  }
  .item-comments-send {
    position: absolute;
    display: block;
    bottom: -2.5rem;
    right: 12rem;
    width: 12rem;
    height: 5rem;
    cursor: pointer;
    border-radius: 5rem;
    background-color: $color-blue;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: darken($color-blue, 10%);
      transition: 0.3s ease-in-out;
    }
    &::after {
      position: absolute;
      display: block;
      content: '';
      top: calc(50% - 2rem / 2);
      left: calc(50% - 2rem / 2);
      width: 2rem;
      height: 2rem;
      background: url('~@/assets/icons/send.svg') no-repeat center / 120%;
    }
  }
}

</style>
