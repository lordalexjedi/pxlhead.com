<template lang='pug'>
  .view
    .toolbox
      .sorter
        a.sort-item(@click='sortItems("views")') Top
        a.sort-item(@click='sortItems("time")') New
      .search-box(@click='searching = true')
        input.search(type='search' name='search' placeholder='droids u r looking for...' v-model='search'
          :class='{ "search--active": searching }'
          @blur='searching = false')
    transition-group.gallery(name='item' tag='div')
      item(v-for='item in displayedItems'  :key='item.id'  :item='item')
    mugen-scroll(:handler='loadItems'  :should-handle='!loading && hasMore')
    a.btn-back
</template>

<script>
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

  data() {
    return {
      displayedItems: this.$store.getters.activeItems,

      search: '',
      searching: false,
      loading: false
    }
  },

  computed: {
    slice() {
      return this.$store.state.activeSlice
    },
    maxSlice() {
      const { itemsPerSlice, lists } = this.$store.state
      return Math.ceil(lists[this.type].length / itemsPerSlice)
    },
    hasMore() {
      return this.slice < this.maxSlice
    }
  },

  beforeMount() {
    if (this.$root._isMounted) {
      this.sortItems('views')
    }
  },

  methods: {
    loadItems() {
      this.$bar.start()
      this.loading = true
      this.$store.commit('INCREMENT_ACTIVE_SLICE')
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(() => {
        this.displayedItems = this.$store.getters.activeItems
      })
      this.loading = false
      this.$bar.finish()
    },
    sortItems(sort) {
      this.$bar.start()
      this.$store.commit('SET_ACTIVE_SORT', { sort })
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(() => {
        this.displayedItems = this.$store.getters.activeItems
      })
      this.$bar.finish()
    }
  }
}
</script>

<style lang='scss'></style>
