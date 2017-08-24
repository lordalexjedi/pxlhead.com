<template lang='pug'>
  .item-view(v-if='item')
    template(v-if='item')
      .item-view-body
        .item-view-text
          h1.item-view-title {{ item.title }}
          p.item-view-description {{ item.description }}
        span.item-view-watch 4242
        .item-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
        .item-view-tag
          a.tag-link(v-for='n in 3') #CSS
        .item-view-social
          a.social-link.link-twitter
          a.social-link.link-facebook
          a.social-link.link-dribbble
        a.item-view-link.link--code
        // link--music, link--art
        a.item-view-comment
    .item-view-nav
      router-link.item-view-arrow.arrow--prev(:to='`/${type}/(page - 1)`')
      //- router-link.item-view-arrow.arrow--pre(v-if='page > 1'  :to='`/${type}/(page - 1)`')
      //- a.disabled(v-else)
      router-link.item-view-arrow.arrow--next(:to='`/${type}/(page + 1)`')
      //- router-link.item-view-arrow.arrow--nex(v-if='hasMore'  :to='`/${type}/(page + 1)`')
      //- a.disabled(v-else)
    .item-view-comments
      spinner(:show='loading')
      .comment-children(v-if='!loading')
        comment(v-for='id in item.commentIds'  :key='id'  :id='id')
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Comment from '@/components/Comment.vue'

export default {
  name: 'item-view',
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

.item-view {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: $color-white;
}
.item-view-img {
  position: absolute;
  top: calc(45% - 60rem/ 2);
  left: calc(75% - 45rem / 2);
  width: 60rem;
  height: 45rem;
  background: $color-pink;
  background-position: center;
  background-size: cover;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
}
.item-view-body {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: calc(55% - 60% / 2);  background: $color-pink;
  background-position: center;
  background-size: cover;
  left: calc(46% - 70% / 2);
  width: 70%;
  height: 60%;
  background: $color-blue;
}
.item-view-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 84%;
  height: 100%;
  padding: 4rem;
}
.item-view-title {
  flex-basis: 40%;
  font-size: 6rem;
  font-weight: 700;
  max-width: 40rem;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  color: $color-white;
}
.item-view-watch {
  position: absolute;
  display: block;
  bottom: 5rem;
  left: 10rem;
  font-size: 1.5rem;
  color: $color-white;
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    top: 0;
    left: -3rem;
    background: url('~@/assets/icons/eye.svg') no-repeat center / 100%;
  }
}
.item-view-description {
  flex-basis: 50%;
  font-size: 1.8rem;
  margin-left: 5rem;
  max-width: 40rem;
  color: darken($color-grey, 20%);
}
.item-view-link {
  position: absolute;
  display: block;
  top: 92%;
  left: 20%;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background: $color-pink;
  transition: 0.3s ease-in-out;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  &:hover {
    background: darken($color-pink, 10%);
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 5rem;
    height: 5rem;
    top: calc(50% - 5rem / 2);
    left: calc(50% - 5rem / 2);
  }
}
.item-view-link.link--code {
  &::after {
    background: url('~@/assets/icons/code.svg') no-repeat center / 60%;
  }
}
.item-view-link.link--music {
  &::after {
    background: url('~@/assets/icons/music.svg') no-repeat center / 60%;
  }
}
.item-view-link.link--art {
  &::after {
    background: url('~@/assets/icons/photo.svg') no-repeat center / 60%;
  }
}
.item-view-comment {
  position: absolute;
  display: block;
  top: 92%;
  left: 35%;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background: $color-pink;
  transition: 0.3s ease-in-out;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  &:hover {
    background: darken($color-pink, 10%);
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 5rem;
    height: 5rem;
    top: calc(50% - 5rem / 2);
    left: calc(50% - 5rem / 2);
    background: url('~@/assets/icons/comment.svg') no-repeat center / 50%;
  }
}
.item-view-tag {
  position: absolute;
  bottom: 4rem;
  right: 10rem;
  width: 36rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag-link {
  flex-basis: 10rem;
  height: 4rem;
  color: $color-white;
  background-color: darken($color-blue, 10%);
  border-radius: 20px;
  line-height: 4rem;
  font-size: 1.3rem;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: darken($color-blue, 20%);
    transition: 0.3s ease-in-out;
  }
}
.item-view-social {
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 25rem;
  height: 6rem;
  top: -12rem;
  right: 10%;
}
.social-link {
  position: relative;
  flex-basis: 5rem;
  height: 5rem;
  top: calc(50% - 5rem / 2);
  left: calc(50% - 5rem / 2);
  border-radius: 50%;
  background: $color-pink;
  transition: 0.3s ease-in-out;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  &:hover {
    background: darken($color-pink, 10%);
    cursor: pointer;
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
.item-view-arrow {
  position: absolute;
  display: block;
  width: 10rem;
  height: 10rem;
  background-color: $color-pink;
  opacity: 0.8;
  cursor: pointer;
  transform: rotate(45deg);
  transition: 0.3s ease-in-out;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  &:hover {
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
}
.arrow--prev {
  top: calc(50% - 10rem / 2);
  left: -5rem;
  &::after{
    position: absolute;
    display: block;
    top: calc(30% - 5rem / 2);
    left: calc(70% - 5rem / 2);
    content: '';
    width: 5rem;
    height: 5rem;
    transform: rotate(-135deg);
    background: url('~@/assets/icons/arrow-small.svg') no-repeat center / 100%;
  }
}
.arrow--next {
  top: calc(50% - 10rem / 2);
  right: -5rem;
  &::after{
    position: absolute;
    display: block;
    bottom: calc(30% - 5rem / 2);
    right: calc(70% - 5rem / 2);
    content: '';
    width: 5rem;
    height: 5rem;
    transform: rotate(45deg);
    background: url('~@/assets/icons/arrow-small.svg') no-repeat center / 100%;
  }
}
.nav-esc {
  position: absolute;
  display: block;
  top: 4rem;
  right: 4rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: $color-grey;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
    transition: 0.3s ease-in-out;
  }
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: 25%;
    left: calc(50% - 5px / 2);
    width: 5px;
    height: 50%;
    transform: rotate(45deg);
    background: $color-white;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: 25%;
    left: calc(50% - 5px / 2);
    width: 5px;
    height: 50%;
    transform: rotate(-45deg);
    background: $color-white;
  }
}
</style>
