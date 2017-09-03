<template lang='pug'>
  .item-view(v-if='item')
    template(v-if='item')
      .item-view-text
        h1 {{ item.title }}
        p {{ item.description }}
      .item-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
      .item-view-social
      .item-view-nav
      .item-view-comments
        spinner(:show='loading')
        .comment-children(v-if='!loading')
          comment(v-for='id in item.commentIds'  :key='id'  :id='id')
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Comment from '@/components/Comment.vue'

export default {
  name: 'music-view',
  components: { Spinner, Comment },

  data: () => ({
    loading: true
  }),

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
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
