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
</template>

<script>
// import Spinner from '../components/Spinner.vue'
// import Comment from '../components/Comment.vue'

export default {
  name: 'item-view',
  // components: { Spinner, Comment },

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

  // Fetch comments when mounted on the client
  beforeMount () {
    // this.fetchComments()
  },

  // refetch comments if item changed
  watch: {
    // item: 'fetchComments'
  },

  methods: {
    fetchComments () {
      this.loading = true
      fetchComments(this.$store, this.item).then(() => {
        this.loading = false
      })
    }
  }
}

// recursively fetch all descendent comments
function fetchComments (store, item) {
  if (item && item.kids) {
    return store.dispatch('FETCH_ITEMS', {
      ids: item.kids
    }).then(() => Promise.all(item.kids.map(id => {
      return fetchComments(store, store.state.items[id])
    })))
  }
}
</script>

<style lang='scss'></style>
