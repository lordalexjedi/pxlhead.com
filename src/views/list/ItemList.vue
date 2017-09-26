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
      item(v-for='(item, index) in displayedItems'  :key='item.id'
        @click.native='fetchItemView(item.id, index)'  :item='item')
    mugen-scroll(:handler='loadItems'
      :should-handle='!loading && hasMore') {{ loadingText }}
    btn-top

    transition(name='fade' appear)
      div(v-if='activeId')
        .item-view-overlay(@click='activeId = ""')
        a.item-view-esc.material-icons(@click='activeId = ""') close
        a.item-view-arrow.material-icons.arrow-prev(@click='changeActiveId(-1)'
          v-show='activeIndex > 0') keyboard_arrow_left
        a.item-view-arrow.material-icons.arrow-next(@click='changeActiveId(1)'
          v-show='activeIndex < displayedItems.length') keyboard_arrow_right
    item-view(:id='activeId')
</template>

<script>
import MugenScroll from 'vue-mugen-scroll'
import Item from '@/components/Item.vue'
import ItemView from '../single/ItemView.vue'
import BtnTop from '@/components/BtnTop.vue'

export default {
  name: 'item-list',

  components: {
    Item,
    ItemView,
    BtnTop,
    MugenScroll
  },

  props: {
    type: String
  },

  data() {
    return {
      displayedItems: this.$store.getters.activeItems,
      activeId: '',
      activeIndex: -1,
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
      return this.hasMore ? 'keep searching...' : 'the end of the road'
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
    fetchItemView(id, index) {
      this.$store.dispatch('FETCH_ITEM_VIEW', { id }).then(() => {
        if (this.type === 'articles') {
          this.$router.push(`/articles/${id}`)
        } else {
          this.activeIndex = index
          this.activeId = id
        }
      })
    },
    changeActiveId(direction) {
      const newIndex = this.activeIndex + direction
      this.activeId = this.displayedItems[newIndex].id
      this.activeIndex = newIndex
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
  position: relative;
  background-color: $color-main;
  padding: 3rem 5rem;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include screen-style(iphone7) {
    padding: 3rem 2rem;
  };
  @include screen-style(iphoneSE) {
    padding: 3rem 2rem;
  };
}
.sorter {
  display: flex;
  @include screen-style(iphone7) {
    position: absolute;
    width: 100%;
    justify-content: center;
    left: 0;
    bottom: -5rem;
    background-color: #fff;
  };
  @include screen-style(iphoneSE) {
    position: absolute;
    width: 100%;
    justify-content: center;
    left: 0;
    bottom: -5rem;
    background-color: #fff;
  };
}
.sort-item {
  @extend %btn-text;
  width: 10rem;
  height: 5rem;
  margin-right: 2rem;
  color: $color-white;
  line-height: 5rem;
  background-color: $color-blue;
  @include screen-style(iphone7) {
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    margin-right: 0;
    color: $color-blue;
  };
  &:hover {
    background-color: $color-white;
  }
  @include screen-style(iphoneSE) {
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    margin-right: 0;
    color: $color-blue;
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
.search::placeholder {
  opacity: 0;
}
.search--active {
  width: 30rem;
  padding: 0 5rem;
  cursor: text;
  @include screen-style(iphone7) {
    width: 27rem;
  };
  @include screen-style(iphoneSE) {
    width: 22rem;
  };
}
.search--active::placeholder {
  opacity: 1;
}
.gallery {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 6rem 5rem 0rem 5rem;
  @include screen-style(iphone7) {
    padding: 8rem 2rem;
  };
  @include screen-style(iphoneSE) {
    padding: 8rem 2rem;
  };
}
.mugen-scroll {
  display: block;
  text-align: center;
  text-transform: capitalize;
  height: 5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: darken($color-grey, 20%);
}
.item-view-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(51, 51, 51, 0.8);
}
.item-view-esc {
  position: absolute;
  width: 5rem;
  height: 5rem;
  z-index: 1001;
  font-size: 4rem;
  color: $color-white;
  right: 2rem;
  top: 2rem;
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background: transparent;
  &:hover {
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
}
.item-view-arrow {
  position: absolute;
  top: 30rem;
  width: 7rem;
  height: 7rem;
  z-index: 1001;
  font-size: 4rem;
  color: $color-white;
  opacity: 0.8;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
}
.arrow-prev {
  left: 20rem;
}
.arrow-next {
  right: 20rem;
}

.item-move, .item-enter-active, .item-leave-active {
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.item-enter {
  opacity: 0;
  transform: translateY(30px);
}
.item-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
