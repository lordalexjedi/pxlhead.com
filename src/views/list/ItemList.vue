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
  name: 'item-list',

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

<style lang='scss'>
@import '~style';

.view {
  background-color: $color-white;
}
.toolbox {
  background-color: $color-main;
  padding: 3rem 5rem;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.sorter {
  display: flex;
}
.sort-item {
  width: 8rem;
  height: 4rem;
  border-radius: 40px;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: $color-white;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background-color: $color-blue;
  &:hover {
    background-color: darken($color-blue, 10%);
  }
}
.sort-item--on {
  opacity: 0.2;
  transition: 0.3s ease-in-out;
}
.search-box {
  position: relative;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5rem;
    height: 5rem;
    background: url('~@/assets/icons/search.svg') no-repeat center / 60%;
  }
}
.search {
  appearance: none;
  background-color: $color-white;
  color: $color-main;
  padding: 0 2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 40px;
  border-style: none;
  outline-style: none;
  font-size: 1.6rem;
  transition: all .5s;
}
.search--active {
  width: 30rem;
  padding: 0 5rem;
}
.search--active ::placeholder {
  display: block;
}
.gallery {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 6rem 5rem;
}
.btn-back {
  position: fixed;
  bottom: 2rem;
  right: 5rem;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: $color-pink;
  transition: 0.3s ease-in-out;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  &:after {
    position: absolute;
    display: block;
    content: '';
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    background: url('~@/assets/icons/arrow-small.svg') no-repeat center / 100%;
  }
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s ease-in-out;
  }
}

.item-move, .item-enter-active, .item-leave-active {
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}
</style>
