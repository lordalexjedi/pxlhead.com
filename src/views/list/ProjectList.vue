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
      .item(v-for='item in displayedItems'  :key='item.id')
        .item-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
        .item-text
          h3.item-name {{ item.title }}
          p.item-description {{ item.description }}
          .item-info
            span.item-views {{ item.views }}
            span.item-comment 21
    a.btn-back(@click='scrollTop')
</template>

<script>
import { TweenLite } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export default {
  name: 'project-list',

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
    },
    scrollTop() {
      TweenLite.to(window, 0.5, { scrollTo: 0 })
    }
  }
}
</script>

<style lang='scss'></style>
