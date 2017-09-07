<template lang='pug'>
  .item-view(v-if='item')
    template(v-if='item')
      .search-box
        input.search(type='search' name='search' placeholder='droids u r looking for...')
      a.item-view-esc
      .item-view-body
        .item-view-text
          h1.item-view-title {{ item.title }}
          p.item-view-description {{ item.description }}
          .item-view-action
            a.item-view-link.link--code VIEW
            a.item-view-comment
        .item-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
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

.item-view {
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
  right: 18%;
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
.item-view-esc {
  @extend %btn-esc;
}
.item-view-img {
  flex-basis: 80rem;
  height: 60rem;
  @extend %img;
}
.item-view-body {
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
.item-view-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 95%;
}
.item-view-title {
  @extend %heading;
  max-width: 50rem;
  flex-basis: 50%;
  text-align: right;
  color: #4f4f4f;
}
.item-view-watch {
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
.item-view-description {
  @extend %paragraph;
  flex-basis: 20%;
  margin-left: 5rem;
  max-height: 2rem * 6 + 2.5rem / 2;
  color: darken($color-grey, 10%);
}
.item-view-action {
  flex-basis: 6rem;
  width: 25rem;
  display: flex;
  justify-content: space-between;
}
.item-view-link {
  @extend %btn-text;
}
.item-view-comment {
  @extend %btn-icon;
  position: relative;
  width: 6rem;
  height: 6rem;
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
  h2 {
    font-size: 2rem;
    text-align: center;
    align-self: center;
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
}
.arrow-next {
  &::after {
    transform: rotate(180deg);
    bottom: -5rem;
    background: url('~@/assets/icons/arrow.svg') no-repeat center / 100%;
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
.item-view-social {
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
</style>
