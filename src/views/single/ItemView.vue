<template lang='pug'>
  .item-view(v-if='item')
    template(v-if='item')
      .item-view-text
        h1 {{ item.title }}
        p {{ item.description }}
      .item-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
      .item-view-social
      .item-view-nav
        router-link(v-if='page > 1'  :to='`/${type}/(page - 1)`') &lt; prev
        a.disabled(v-else) &lt; prev
        router-link(v-if='hasMore'  :to='`/${type}/(page + 1)`') more &gt;
        a.disabled(v-else) more &gt;
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

<style lang='scss'></style>
