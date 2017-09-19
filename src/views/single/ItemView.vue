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
              a.item-view-comment(@click='scrollToComments')
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
      .item-comments(v-show='showComments')
        //- spinner(:show='loading')
        .item-comments-header
          .item-comments-title COMMENTS
            span.item-comments-counter (42)
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

export default {
  name: 'item-view',
  components: {
    Spinner,
    Comment,
    BtnTop
  },

  data: () => ({
    searching: false,
    loading: true,
    showComments: false,
    showCommentForm: false
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
@import '../../assets/style/view.scss';
</style>
