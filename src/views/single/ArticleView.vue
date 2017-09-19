<template lang='pug'>
  .article-main(v-if='item')
    template(v-if='item')
      .article-view(:class='{ "article-view--push": read}'
        :style='{ backgroundImage: `url(${item.imageURL})` }')
        .article-view-text
          span.article-view-date 11/12/2017
          h1.article-view-title {{ item.title }}
          p.article-view-description {{ item.description }}
          .article-view-action
            a.article-view-btn(@click='scrollToText') READ
            a.article-view-btn COMMENT
      .article-view-navbar
        a.article-view-esc
        .article-view-social
          a.article-view-link.link--facebook
          a.article-view-link.link--twitter
          a.article-view-link.link--link
        a.article-view-comment
      .article-read
        .text-wrapper
          .text-block(v-html='item.text')
      .article-comments
        spinner(:show='loading')
        .text-wrapper
          .article-comments-header
            .article-comments-title COMMENTS
              span.article-comments-counter (42)
            a.article-comments-submit(@click='comment=!comment')
          transition(name='fade')
            form.article-comments-form(v-show='comment')
              .article-comments-img
              .article-comments-input
                input.article-comments-name(placeholder='ex. Marty McFly')
                textarea.article-comments-message(placeholder='Dont panic')
              a.article-comments-send
          .article-comments-list(v-if='!loading')
            comment(v-for='id in item.commentIds'  :key='id'  :id='id')
      btn-top(@click.native='read = false')
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Comment from '@/components/Comment.vue'
import BtnTop from '@/components/BtnTop.vue'

export default {
  name: 'article-view',
  components: {
    Spinner,
    Comment,
    BtnTop
  },

  data: () => ({
    loading: true,
    read: false,
    comment: false
  }),

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id]
    },
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
    scrollToText() {
      this.read = true
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

.article-view {
  height: 100vh;
  position: relative;
  background: $color-blue;
  background-size: cover;
  z-index: 100;
  opacity: 1;
  transition: all 1s cubic-bezier(0.7,0,0.3,1);
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: transparentize(#000, 0.8);
  }
}
.article-view--push {
  opacity: 0;
  transform: translateY(-100%) scale(0.9);
  transition: all 1s cubic-bezier(0.7,0,0.3,1);
}
.article-view-text {
  position: absolute;
  top: 25vh;
  left: 10rem;
  height: 60vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 101;
  @include screen-style(iphone7) {
    left: 10%;
  };
  @media (orientation: portrait) {
    width: 70vw;
    top: 20vh;
    height: 70vh;
    left: 5rem;
  }
}
.article-view-date {
  flex-basis: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: $color-white;
}
.article-view-title {
  @extend %heading;
  margin: 2rem 0;
  @include screen-style(iphone7) {
    font-size: 6rem;
    line-height: 8rem;
    max-height: 6rem * 5 + 8rem / 2;
  };
  @include screen-style(iphoneSE) {
    font-size: 6rem;
    line-height: 8rem;
    max-height: 6rem * 5 + 8rem / 2;
  };
}
.article-view-description {
  @extend %paragraph;
  margin: 2rem 0rem 2rem 4rem;
  overflow: hidden;
  font-size: 2rem;
  min-height: 2rem * 2 + 2.5rem / 2;
  max-height: 2rem * 5 + 2.5rem / 2;
  max-width: 60rem;
  @media (orientation: portrait) {
    margin: 2rem 0;
  }
}
.article-view-action {
  margin: 2rem 0;
  max-width: 35rem;
  display: flex;
  justify-content: space-between;
  @include screen-style(ipadPro) {
    max-width: 28rem;
  };
  @include screen-style(ipadAir) {
    max-width: 28rem;
  };
  @include screen-style(iphone7) {
    max-width: 28rem;
  };
  @include screen-style(iphoneSE) {
    max-width: 28rem;
  };
}
.article-view-btn {
  @extend %btn-text;
  @include screen-style(ipadPro) {
    width: 12rem;
    height: 5rem;
    border-radius: 5rem;
    font-size: 1.4rem;
    line-height: 5rem;
  };
  @include screen-style(ipadAir) {
    width: 12rem;
    height: 5rem;
    border-radius: 5rem;
    font-size: 1.4rem;
    line-height: 5rem;
  };
  @include screen-style(iphone7) {
    width: 12rem;
    height: 5rem;
    border-radius: 5rem;
    font-size: 1.4rem;
    line-height: 5rem;
  };
  @include screen-style(iphoneSE) {
    width: 12rem;
    height: 5rem;
    border-radius: 5rem;
    font-size: 1.4rem;
    line-height: 5rem;
  };
}
.article-view-btn:nth-of-type(2){
  @media (orientation: portrait) {
    display: none;
  }
}
.article-view-comment {
  display: none;
  @media (orientation: portrait) {
    position: absolute;
    display: block;
    top: calc(50% - 6rem / 2);
    left: 5rem;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    cursor: pointer;
    z-index: 101;
    background-color: transparentize(#000, 0.9);
    &:hover {
      background-color: darken($color-blue, 10%);
      transition: 0.3s ease-in-out;
    }
    &::after {
      position: absolute;
      content: '';
      display: block;
      @include center-pos(4rem);
      background: url('~@/assets/icons/comment.svg') no-repeat center / 50%;
    }
  }
}
.article-view-navbar {
  @media (orientation: portrait) {
    position: fixed;
    width: 100%;
    height: 12%;
    left: 0;
    bottom: 0;
    z-index: 101;
    background-color: $color-blue;
  }
}
.article-view-esc {
  @extend %btn-esc;
  right: 5rem;
  z-index: 101;
  background-color: transparentize(#000, 0.9);
  @media (orientation: portrait) {
    top: calc(50% - 6rem / 2);
    width: 6rem;
    height: 6rem;
  }
}
.article-view-social {
  position: absolute;
  right: 5rem;
  top: calc(50% - 18rem / 2);
  width: 5rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (orientation: portrait) {
    top: calc(50% - 5rem / 2);
    left: calc(50% - 20rem / 2);
    width: 20rem;
    height: 5rem;
    flex-direction: row;
  }
}
.article-view-link {
  @extend %btn-icon;
  position: relative;
  flex-basis: 5rem;
  z-index: 101;
  @media (orientation: portrait) {
    background-color: transparent;
    box-shadow: none;
    &:hover {
      background-color: transparentize(#000, 0.9);
    }
  }
  &::after {
    @include center-pos(2rem);
  }
}
.link--facebook {
  &::after {
    background: url('~@/assets/icons/facebook.svg') no-repeat center / 100%;
  }
}
.link--twitter {
  &::after {
    background: url('~@/assets/icons/twitter.svg') no-repeat center / 100%;
  }
}
.link--link {
  &::after {
    background: url('~@/assets/icons/link.svg') no-repeat center / 100%;
  }
}
.article-read {
  position: relative;
  background-color: $color-white;
}
.text-wrapper {
  margin: 0 24%;
  @include screen-style(iMac) {
    margin: 0 20%;
  };
  @include screen-style(ipadPro) {
    margin: 0 10%;
  };
  @include screen-style(ipadAir) {
    margin: 0 10%;
  };
  @include screen-style(iphone7) {
    margin: 0 8%;
  };
  @include screen-style(iphoneSE) {
    margin: 0 8%;
  };
}
.text-block {
  position: relative;
  min-height: 100vh;
  font-family: 'Roboto Slab', serif;
  font-weight: 400;
  padding: 5rem 0;
  color: darken($color-grey, 17%);
  .text-bold {
    font-weight: bold;
  }
  .first-letter {
    &:first-letter {
      font-size: 5rem;
    }
  }
  p {
    font-size: 2rem;
    line-height: 3rem;
    margin-bottom: 3rem;
  }
  h2.text-title {
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: 7rem;
    text-transform: uppercase;
    position: relative;
    &::after {
      position: absolute;
      display: block;
      content: '';
      top: 5rem;
      left: 0;
      width: 100%;
      height: 0.3rem;
      background-color: #D7DEE8;
    }
  }
  h3.text-subtitle {
    font-size: 2.5rem;
    line-height: 3rem;
    margin-bottom: 3rem;
  }
}
.text-codebox {
  position: relative;
  width: 100%;
  font-size: 2rem;
  line-height: 3rem;
  margin-bottom: 3rem;
  background-color: $color-lightblue;
  justify-content: flex-start;
  text-align: justify;
  &::after {
    position: absolute;
    display: block;
    content: '';
    cursor: pointer;
    top: 1rem;
    right: 3rem;
    width: 3rem;
    height: 3rem;
    background: url('~@/assets/icons/link-black.svg') no-repeat center / 120%;
  }
  pre {
    overflow: auto;
    height: 100%;
  }
  span {
    position: absolute;
    display: block;
    // overflow: hidden;
    white-space: normal;
    top: 0;
    left: 0;
    width: 3rem;
    height: 100%;
    padding: 0 1%;
    background-color: #D7DEE8;
  }
  code {
    position: relative;
    height: 100%;
    width: 80%;
    padding: 0 3rem;
  }
}
.text-attention {
  position: relative;
  width: calc(100% - 8rem);
  font-size: 2rem;
  line-height: 3rem;
  margin-bottom: 3rem;
  background-color: $color-lightblue;
  border: 2px solid lighten($color-pink,10%);
  padding: 2rem 4rem;
  &::before {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 3rem / 2);
    left: -1.5rem;
    width: 3rem;
    height: 3rem;
    background: $color-white;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 3rem / 2);
    left: -1.5rem;
    width: 3rem;
    height: 3rem;
    background: url('~@/assets/icons/warn.svg') no-repeat center / 120%;
  }
}
.text-select {
  font-size: 2rem;
  line-height: 3rem;
  margin-bottom: 3rem;
  cursor: pointer;
  position: relative;
  color: $color-pink;
  padding: 1rem;
  background-color: #D7DEE8;
}
.text-summary {
  position: relative;
  width: calc(100% - 8rem);
  font-size: 2rem;
  line-height: 3rem;
  margin-bottom: 3rem;
  background-color: $color-lightblue;
  border: 2px solid #42b983;
  padding: 2rem 4rem;
  &::before {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 3rem / 2);
    left: -1.5rem;
    width: 3rem;
    height: 3rem;
    background: $color-white;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 3rem / 2);
    left: -1.5rem;
    width: 3rem;
    height: 3rem;
    background: url('~@/assets/icons/sum.svg') no-repeat center / 120%;
  }
}
.text-link {
  font-size: 2rem;
  line-height: 3rem;
  margin-bottom: 3rem;
  cursor: pointer;
  position: relative;
  color:  #42b983;
  &::before {
    display: block;
    opacity: 0;
    transition: 0.3s ease-in-out;
    content: '';
    right: -4rem;
    top: calc(50% - 3rem / 2);
    height: 3rem;
    width: 3rem;
    position: absolute;
    border-radius: 50%;
    background-color: #42b983;
    z-index: 100;
  }
  &::after {
    display: block;
    opacity: 0;
    transition: 0.3s ease-in-out;
    content: '';
    right: -3.5rem;
    top: calc(50% - 2rem / 2);
    height: 2rem;
    width: 2rem;
    position: absolute;
    border-radius: 50%;
    background: url('~@/assets/icons/link.svg') no-repeat center / 120%;
    z-index: 100;
  }
  &:hover {
    &::before, &::after {
      opacity: 1;
      transition: 0.3s ease-in-out;
    }
  }
}
.article-comments {
  position: relative;
  background-color: #F8FCFF;
}
.article-comments-header {
  position: relative;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;
}
.article-comments-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: darken($color-grey, 17%);
}
.article-comments-submit {
  position: relative;
  flex-basis: 5rem;
  height: 5rem;
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  cursor: pointer;
  line-height: 4rem;
  margin-right: 2rem;
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
.article-comments-list {
  position: relative;
  display: flex;
  width: 100rem;
  top: 0rem;
  padding: 3rem 0;
  left: calc(50% - 100rem / 2);
  flex-direction: column;
  justify-content: space-between;
}
.article-comments-form {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem 0;
  margin-bottom: 4rem;
  height: 15rem;
  width: 100%;
  background-color: $color-lightblue;
  transition: 0.5s ease-in-out;

  &::after {
    display: block;
    content: '';
    top: -7rem;
    right: 2.5rem;
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
  .article-comments-img {
    width: 10rem;
    height: 10rem;
    background-color: $color-pink;
  }
  .article-comments-input {
    flex-basis: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
  }
  .article-comments-name {
    font-size: 1.8rem;
    color: darken($color-grey, 10%);
    padding: 1rem;
    flex-basis: 2rem;
    width: 60%;
    appearance: none;
    outline-color: $color-blue;
    border: 0.2rem solid lighten($color-blue, 10%);
  }
  .article-comments-message {
    font-size: 1.8rem;
    color: darken($color-grey, 10%);
    padding: 1rem;
    flex-basis: 40%;
    appearance: none;
    outline-color: $color-blue;
    border: 0.2rem solid lighten($color-blue, 10%);
  }
  .article-comments-send {
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
