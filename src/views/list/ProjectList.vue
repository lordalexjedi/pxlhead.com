<template lang='pug'>
  transition-group.project(name='item' tag='div')
    .project-view(v-for='item in displayedItems'  :key='item.id')
      .search-box
        input.search(type='search' name='search' placeholder='droids u r looking for...')
      .project-view-body
        .project-view-text
          h1.project-view-title {{ item.title }}
          p.project-view-description {{ item.description }}
            a.project-view-link VIEW
        .project-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
        .project-view-social
          a.social-link.link-twitter
          a.social-link.link-facebook
          a.social-link.link-dribbble
        .project-view-tag
          a.tag-link(v-for='n in 3') #CSS
        span.project-view-watch 4242
      .project-view-nav
        a.project-view-arrow(v-for='item in displayedItems')
</template>

<script>
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
    }
  }
}
</script>

<style lang='scss'>
@import '~style';

.project {
  position: relative;
  width: 100%;
}
.project-view {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    width: 55%;
    height: 100%;
    background: #f2f2f2;
  }
}
.search-box {
  @extend %search;
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
.project-view-img {
  position: absolute;
  top: -5rem;
  right: 0;
  width: 90rem;
  height: 65rem;
  @extend %img;
}
.project-view-body {
  position: absolute;
  top: 20%;
  background-position: center;
  background-size: cover;
  left: calc(50% - 75% / 2);
  width: 75%;
  height: 60%;
  z-index: 100;
}
.project-view-text {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 95%;
  z-index: 101;
}
.project-view-title {
  @extend %heading;
  max-width: 50rem;
  flex-basis: 30%;
  text-align: left;
  color: #4f4f4f;
  max-width: 80rem;
}
.project-view-watch {
  position: absolute;
  display: block;
  bottom: -9rem;
  right: 70rem;
  font-size: 1.7rem;
  color: $color-grey;
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 2rem;
    height: 2rem;
    top: 0;
    left: -4rem;
    background: url('~@/assets/icons/eye-black.svg') no-repeat center / 100%;
  }
}
.project-view-description {
  @extend %paragraph;
  position: relative;
  overflow: visible;
  width: 80%;
  max-width: 50rem;
  flex-basis: 20%;
  max-height: 2rem * 6 + 2.5rem / 2;
  color: darken($color-grey, 10%);
  background-color: #fff;
  opacity: 1;
  padding: 5rem;
}
.project-view-link {
  @extend %btn-text;
  position: absolute;
  bottom: -3rem;
  right: 20%;
}
.project-view-nav {
  position: absolute;
  top: calc(50% - 20% / 2);
  right: 5rem;
  width: 7rem;
  height: 20%;
  display: flex;
  color: transparentize($color-grey, 0.2);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 2rem;
    text-align: center;
    align-self: center;
  }
}
.project-view-arrow {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #f2f2f2;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: darken(#f2f2f2, 20%);
    transition: 0.3s ease-in-out;
  }
}
.arrow-active {
  background-color: $color-blue;
}
.project-view-tag {
  position: absolute;
  bottom: -10rem;
  right: 5rem;
  width: 44rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.tag-link {
  @extend %btn-text;
  flex-basis: 12rem;
  height: 5rem;
  background-color: $color-blue;
  line-height: 5rem;
  &:hover {
    background-color: darken($color-blue, 10%);
  }
}
.project-view-social {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 6rem;
  height: 25rem;
  top: calc(50% - 25rem / 2);
  right: -3rem;
}
.social-link {
  @extend %btn-icon;
  position: relative;
  flex-basis: 5rem;
  &::after {
    @include center-pos(2rem);
  }
}
.link-twitter {
  &::after {
    background: url('~@/assets/icons/twitter.svg') no-repeat center / 100%;
  }
}
.link-facebook {
  &::after {
    background: url('~@/assets/icons/facebook.svg') no-repeat center / 100%;
  }
}
.link-dribbble {
  &::after {
    background: url('~@/assets/icons/link.svg') no-repeat center / 120%;
  }
}
</style>
