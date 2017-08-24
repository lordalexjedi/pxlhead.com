<template lang='pug'>
  .article-view(v-if='item' v-bind:style='{ backgroundImage: `url(${item.imageURL})` }')
    template(v-if='item')
      .article-view-text
        span.article-view-date 11/12/2017
        h1.article-view-title {{ item.title }}
        p.article-view-description {{ item.description }}
        .article-view-action
          a.article-view-btn READ
          a.article-view-btn COMMENT
      a.article-view-link
      a.article-view-esc
      //- .article-view-nav
      //-   router-link(v-if='page > 1'  :to='`/${type}/(page - 1)`') &lt; prev
      //-   a.disabled(v-else) &lt; prev
      //-   router-link(v-if='hasMore'  :to='`/${type}/(page + 1)`') more &gt;
      //-   a.disabled(v-else) more &gt;
    .article-read
      .text-block
        p.first-letter
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        .text-codebox
          pre
            span 1
            code Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        h3.text-subtitle
          | Heading 1
        p
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        h2.text-title
          | Heading 2
        p.text-attention
          | Attention: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        p.text-summary
          | Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        p.text-bold
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        a.text-link Click here
      .article-read-social
        a.article-read-link.link--facebook
        a.article-read-link.link--twitter
        a.article-read-link.link--link
    .article-comments
      spinner(:show='loading')
      .article-comments-header
        .article-comments-title COMMENTS
          span.article-comments-counter (42)
        a.article-comments-submit Comment
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
    loading: true
  }),

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    },
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    hasMore () {
      return this.page < this.maxPage
    }
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
  position: relative;
  background: $color-white;
  background-size: cover;
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparentize(#000, 0.8);
  }
}
.article-view-text {
  position: absolute;
  top: 25vh;
  left: 10rem;
  height: 70vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 100;
}
.article-view-date {
  flex-basis: 5%;
  font-size: 1.5rem;
  font-weight: 700;
  color: $color-white;
}
.article-view-title {
  flex-basis: 40%;
  font-size: 7rem;
  font-weight: 700;
  max-width: 40rem;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  color: $color-white;
}
.article-view-description {
  flex-basis: 20%;
  font-size: 2.5rem;
  max-width: 40rem;
  color: $color-white;
}
.article-view-action {
  flex-basis: 20%;
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
  position: absolute;
  top: 100vh; //???
  left: 0;
  // height: 100vh;
  width: 100vw;
  background-color: $color-white;
}
.text-block {
  position: relative;
  top: 10vh;
  left: calc(50% - 100rem / 2);
  min-height: 100vh; //???
  width: 100rem;
  font-family: 'Roboto Slab', serif;
  font-weight: 400;
  padding: 5rem;
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
    margin-bottom: 5rem;
    text-transform: uppercase;
    position: relative;
    &::after {
      position: absolute;
      display: block;
      content: '';
      top: 4rem;
      left: 0;
      width: 10rem;
      height: 0.3rem;
      background-color: $color-blue;
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
  padding: 1.5rem 0;
  display: flex;
  margin-bottom: 3rem;
  background-color: #EAEFF6;
  justify-content: flex-start;
  &::after {
    position: absolute;
    display: block;
    content: '';
    cursor: pointer;
    top: calc(50% - 3rem / 2);
    right: 3rem;
    width: 3rem;
    height: 3rem;
    background: url('~@/assets/icons/link.svg') no-repeat center / 120%;
  }
  span {
    padding: 2rem;
    flex-basis: 2rem;
    background-color: #D7DEE8;
  }
  code {
    padding: 2rem;
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
  text-decoration: underline;
  color: darken($color-grey, 17%);
  background-color: #D7DEE8;
  &::before {
    display: block;
    opacity: 0;
    transition: 0.3s ease-in-out;
    content: '';
    left: calc(50% - 4rem / 2);
    top: -4rem;
    border: solid transparent;
    height: 4rem;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-width: 4rem 2rem 0rem 2rem;
    border-top-color: #D7DEE8;
    margin-bottom: -10px;
  }
  &::after {
    position: absolute;
    display: block;
    opacity: 0;
    transition: 0.3s ease-in-out;
    content: 'copy link';
    text-align: center;
    font-size: 1.2rem;
    line-height: 4rem;
    top: -5rem;
    left: calc(50% - 8rem / 2);
    width: 8rem;
    height: 4rem;
    border-radius: 5rem;
    background-color: #D7DEE8;
  }
  &:hover {
    &::before, &::after {
      opacity: 1;
      transition: 0.3s ease-in-out;
    }
  }
}
.article-comments {
  position: absolute;
  top: 250vh; //???
  left: 0;
  // height: 100vh;
  width: 100vw;
  background-color: #F8FCFF;
}
.article-comments-header {
  position: relative;
  height: 5rem;
  display: flex;
  justify-content: space-between;
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
  flex-basis: 12rem;
  height: 4rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  cursor: pointer;
  line-height: 4rem;
  background-color: $color-pink;
  &:hover {
    background-color: darken($color-pink, 10%);
  }
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
  width: 5rem;
  height: 5rem;
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
    top: calc(50% - 2rem / 2);
    left: calc(50% - 2rem / 2);
    width: 2rem;
    height: 2rem;
    background: url('~@/assets/icons/arrow-small.svg') no-repeat center / 120%;
  }
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s ease-in-out;
  }
}
</style>
