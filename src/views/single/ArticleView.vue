<template lang='pug'>
  .article-main(v-if='item')
    template(v-if='item')
      .article-view(v-bind:style='{ backgroundImage: `url(${item.imageURL})` }')
        .article-view-text
          span.article-view-date 11/12/2017
          h1.article-view-title {{ item.title }}
          p.article-view-description {{ item.description }}
          .article-view-action
            a.article-view-btn READ
            a.article-view-btn COMMENT
        a.article-view-link
        a.article-view-esc
      .article-read
        .text-block(v-html='item.text')
        .article-read-social
          a.article-read-link.link--facebook
          a.article-read-link.link--twitter
          a.article-read-link.link--link
      .article-comments
        spinner(:show='loading')
        .article-comments-header
          .article-comments-title COMMENTS
            span.article-comments-counter (42)
          a.article-comments-submit(:class='{"comment-submit--active": comment}' @click='comment=!comment')
        form.article-comments-form(:class='{ "article-comments-form--active": comment}')
          .article-comments-img
          .article-comments-input
            input.article-comments-name(placeholder='ex. Marty McFly')
            textarea.article-comments-message(placeholder='Dont panic')
          a.article-comments-send
        .article-comments-list(v-if='!loading')
          comment(v-for='id in item.commentIds'  :key='id'  :id='id')
        a.article-comments-up
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Comment from '@/components/Comment.vue'

export default {
  name: 'article-view',
  components: { Spinner, Comment },

  data: () => ({
    loading: true,

    comment: false
  }),

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    },
  },

  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('FETCH_ITEMS', { ids: [id] })
  },

  title () {
    return this.item.title
  },

  beforeMount () {
    this.fetchComments()
  },

  watch: {
    item: 'fetchComments'
  },

  methods: {
    fetchComments () {
      if (this.item.commentIds) {
        this.loading = true
        fetchComments(this.$store, this.item).then(() => {
          this.loading = false
        })
      }
    }
  }
}

function fetchComments (store, item) {
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
  background: $color-white;
  background-size: cover;
  z-index: 100;
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparentize(#000, 0.8);
  }
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
}
.article-view-date {
  flex-basis: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: $color-white;
}
.article-view-title {
  margin: 2rem 0;
  overflow: hidden;
  font-size: 7rem;
  font-weight: 700;
  line-height: 9rem;
  max-width: 80rem;
  min-width: 40rem;
  max-height: 7rem * 3 + 9rem / 2;
  min-height: 7rem * 2 + 9rem / 2;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  color: $color-white;
}
.article-view-description {
  margin: 2rem 0rem 2rem 4rem;
  overflow: hidden;
  font-size: 2rem;
  min-height: 2rem * 2 + 2.5rem / 2;
  max-height: 2rem * 3 + 2.5rem / 2;
  line-height: 2.5rem;
  max-width: 60rem;
  opacity: 0.9;
  color: $color-white;
}
.article-view-action {
  margin: 2rem 0;
  max-width: 35rem;
  display: flex;
  justify-content: space-between;
}
.article-view-btn {
  flex-basis: 15rem;
  height: 5rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  line-height: 5rem;
  color: $color-white;
  border-radius: 5rem;
  cursor: pointer;
  background-color: $color-pink;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s ease-in-out;
  }
}
.article-view-esc {
  position: absolute;
  right: 5rem;
  top: 3rem;
  display: block;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: $color-blue;
  transition: 0.3s ease-in-out;
  z-index: 100;
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: calc(50% - 2rem / 2);
    left: calc(50% - 0.3rem / 2);
    transform: rotate(45deg);
    width: 0.3rem;
    height: 2rem;
    background-color: $color-white;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: calc(50% - 2rem / 2);
    left: calc(50% - 0.3rem / 2);
    transform: rotate(-45deg);
    width: 0.3rem;
    height: 2rem;
    background-color: $color-white;
  }
  &:hover {
    background-color: darken($color-blue, 10%);
    transition: 0.3s ease-in-out;
  }
}
.article-view-link {
  position: absolute;
  right: 15rem;
  top: 3rem;
  display: block;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: $color-blue;
  transition: 0.3s ease-in-out;
  z-index: 100;
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: calc(50% - 2rem / 2);
    left: calc(50% - 2rem / 2);
    width: 2rem;
    height: 2rem;
    background: url('~@/assets/icons/link.svg') no-repeat center / 120%;
  }
  &:hover {
    background-color: darken($color-blue, 10%);
    transition: 0.3s ease-in-out;
  }
}
.article-read {
  position: relative;
  background-color: $color-white;
}
.text-block {
  position: relative;
  left: calc(50% - 100rem / 2);
  min-height: 100vh; //???
  width: 100rem;
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
      width: 104rem;
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
  line-height: 2rem;
  padding: 1.5rem 0;
  margin-bottom: 3rem;
  background-color: #EAEFF6;
  justify-content: flex-start;
  &::after {
    position: absolute;
    display: block;
    content: '';
    cursor: pointer;
    top: 1rem;
    right: 3rem;
    width: 3rem;
    height: 3rem;
    background: url('~@/assets/icons/link.svg') no-repeat center / 120%;
  }
  span {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 3rem;
    height: 100%;
    padding: 0 1rem;
    &::before {
      position: absolute;
      display: block;
      content: '';
      top: 0;
      left: 0;
      width: 3rem;
      height: 100%;
      padding: 0 1rem;
      background-color: #D7DEE8;
    }
  }
  code {
    position: absolute;
    top: 0;
    left: 6rem;
    height: 100%;
    width: calc(100% - 6rem);
  }
}
.text-attention {
  width: 100%;
  font-size: 2rem;
  line-height: 3rem;
  margin-bottom: 3rem;
  background-color: #FFDCE5;
  padding: 2rem;
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
  width: 100%;
  font-size: 2rem;
  line-height: 3rem;
  margin-bottom: 3rem;
  background-color: #C9FDD5;
  padding: 2rem;
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
  width: 100rem;
  top: 0;
  left: calc(50% - 100rem / 2);
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
  margin-right: 4rem;
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  cursor: pointer;
  line-height: 4rem;
  background-color: $color-pink;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s ease-in-out;
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
  transition: 0.3s ease-in-out;
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
.article-comments-up {
  position: fixed;
  display: block;
  width: 7rem;
  height: 7rem;
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
    top: calc(50% - 4rem / 2);
    left: calc(50% - 4rem / 2);
    width: 4rem;
    height: 4rem;
    background: url('~@/assets/icons/arrow-small.svg') no-repeat center / 120%;
  }
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s ease-in-out;
  }
}
.article-comments-form {
  position: relative;
  height: 15rem;
  display: flex;
  display: none;
  justify-content: space-around;
  align-items: center;
  padding: 4rem 0;
  margin-bottom: 4rem;
  width: 100rem;
  top: 0;
  left: calc(50% - 100rem / 2);
  background-color: #EAEFF6;
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
    border-bottom-color: #EAEFF6;
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
    font-size: 1.5rem;
    padding: 1rem;
    flex-basis: 2rem;
    background-color: #D7DEE8;
    width: 60%;
    appearance: none;
    border: 0.2rem solid lighten($color-blue, 10%);
  }
  .article-comments-message {
    font-size: 1.5rem;
    padding: 1rem;
    flex-basis: 40%;
    background-color: #D7DEE8;
    width: 100%;
    appearance: none;
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
.article-comments-form--active {
  display: flex;
}
</style>
