<template lang='pug'>
  .view
    .toolbox
      .sorter
        a.sort-item(@click='sortItems("views")') Top
        a.sort-item(@click='sortItems("time")') New
      form.search-box(@click='searching = true' @submit.prevent='findItems')
        input.search(type='search' placeholder='Droids you\'re looking for...'
          v-model.lazy='searchedTags'  :class='{ "search--active": searching }'
          @blur='clearSearch' @keyup.esc='clearSearch'
          pattern='[a-zA-Z0-9 ]+' maxlength='50' required
          title='These aren\'t the Droids you\'re looking for')
    transition-group.gallery(name='item' tag='div')
      item(v-for='item in displayedItems'  :key='item.id'  :item='item')
    mugen-scroll(:handler='loadItems'  :should-handle='!loading && hasMore'
      :threshold='0.5') {{ loadingText }}
    a.btn-back(@click='scrollTop')
</template>

<script>
import { TweenLite } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
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

  data() {
    return {
      displayedItems: this.$store.getters.activeItems,

      searchedTags: '',
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
    },
    loadingText() {
      return this.hasMore ? 'searching for cookies' : 'no more cookies left'
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
      this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
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
    clearSearch() {
      this.searching = false
      this.searchedTags = ''
    },
    findItems() {
      const tags = this.searchedTags.split(' ')
      this.$bar.start()
      this.$store.dispatch('FETCH_SEARCHED_LIST', {
        type: this.type,
        tags
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
  @include screen-style(fullHd) {
    height: 5rem;
    width: 10rem;
  };
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
    top: calc(50% - 2.5rem / 2);
    left: 1.3rem;
    width: 2.5rem;
    height: 2.5rem;
    background: url('~@/assets/icons/search.svg') no-repeat center / 100%;
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
  cursor: pointer;
  @include screen-style(fullHd) {
    width: 30rem;
    padding: 0 5rem;
  };
}
.search--active {
  width: 32rem;
  padding: 0 5rem;
  cursor: text;
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
