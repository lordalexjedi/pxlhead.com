<template lang='pug'>
  .view
    .toolbox
      .sorter
        a.sort-item(@click='sortItems("top")') Top
        a.sort-item(@click='sortItems("new")') New
      .search-box(@click='searching = true')
        input.search(type='search' name='search' placeholder='droids u r looking for...' v-model='search'
          :class='{ "search--active": searching }'
          @blur='searching = false')
    transition-group.gallery(name='item')
      item(v-for='item in displayedItems'  :key='item.id'  :item='item')
    mugen-scroll(:handler='loadItems'  :should-handle='!loading && hasMore')
    a.btn-back
</template>

<script>
import { watchList } from '@/api'
import MugenScroll from 'vue-mugen-scroll'
import Item from '@/components/Item.vue'

export default {
  name: 'project-list',

  components: {
    Item,
    MugenScroll
  },

  props: {
    type: String
  },

  data () {
    return {
      displayedItems: this.$store.getters.activeItems,

      search: '',
      searching: false,
      loading: false
    }
  },

  computed: {
    slice () {
      return this.$store.state.activeSlice
    },
    maxSlice () {
      const { itemsPerSlice, lists } = this.$store.state
      return Math.ceil(lists[this.type].length / itemsPerSlice)
    },
    hasMore () {
      return this.slice < this.maxSlice
    }
  },

  beforeMount () {
    if (this.$root._isMounted) {
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(this.loadItems())
    }
    // watch the current list for realtime updates
    this.unwatchList = watchList(this.type, ids => {
      this.$store.commit('SET_LIST', { type: this.type, ids })
      this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
        this.displayedItems = this.$store.getters.activeItems
      })
    })
  },

  beforeDestroy () {
    this.unwatchList()
  },

  methods: {
    loadItems () {
      this.$bar.start()
      this.loading = true
      this.displayedItems = [...this.displayedItems, ...this.$store.getters.activeItems]
      this.$store.commit('INCREMENT_ACTIVE_SLICE')
      this.loading = false
      this.$bar.finish()
    },
    sortItems (sort) {
      this.$store.commit('SET_ACTIVE_SORT', { sort })
      this.displayedItems = this.$store.getters.activeItems
    }
  }
}
</script>

<style lang='scss'></style>
