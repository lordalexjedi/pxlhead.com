<template lang='pug'>
  .project
    .project-view
      .project-view-body
        transition-group.project-view-text(name='item' tag='div')
          h1.project-view-title(key='title') {{ item.title }}
          p.project-view-description(key='description') {{ item.description }}
            a.project-view-link VIEW
        transition(name='item' tag='div')
          .project-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
        .project-view-social
          a.project-social-link(v-for='(link, social) in socialLinks'  :href='link'
            :class='`link--${social}`' target='_blank' rel='noopener noreferrer')
        .project-view-date
          i.material-icons date_range
          span.view-date {{ item.time }}
        .project-view-tag
          a.tag-link(v-for='tag in item.tags') {{ tag }}
        span.project-view-watch {{ item.views }}
      .project-view-nav
        a.project-view-arrow(v-for='n in displayedItems.length'
          :class='{ "arrow-active": n === activeIndex }'
          @click='activeIndex = n')
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
      loading: false,
      activeIndex: 1,

      socialLinks: {
        twitter: `https://twitter.com/intent/tweet?text=${this.url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
        share: this.url
      }
    }
  },

  computed: {
    item() {
      return this.displayedItems[this.activeIndex - 1]
    },
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
    url() {
      return this.$router.fullPath
    }
  },

  beforeMount() {
    if (this.$root._isMounted) {
      // sort projects by time
      this.$bar.start()
      this.$store.commit('SET_ACTIVE_SORT', { sort: 'time' })
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(() => {
        this.displayedItems = this.$store.getters.activeItems
      })
      this.$bar.finish()
    }
  },

  mounted() {
    window.addEventListener('wheel', this.onWheel)
    document.documentElement.classList.add('hide-scrollbar')
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
    onWheel(event) {
      if (!this.delay) {
        if (event.deltaY > 0 && this.activeIndex < this.displayedItems.length) {
          this.activeIndex++
        } else if (event.deltaY < 0 && this.activeIndex > 1) {
          this.activeIndex--
        }
      }
    }
  },

  watch: {
    activeIndex() {
      this.delay = true
      if (this.activeIndex === this.displayedItems.length && this.hasMore) {
        this.loadItems()
      }
      setTimeout(() => this.delay = false, 1000)
    }
  },

  beforeDestroy() {
    window.removeEventListener('wheel', this.onWheel)
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
  background-color: $color-main;
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
  color: $color-white;
  max-width: 80rem;
}
.project-view-watch {
  position: absolute;
  display: block;
  bottom: -9rem;
  right: 80rem;
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
  background-color: $color-blue;
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
  background-color: darken($color-blue, 10%);
  line-height: 5rem;
  &:hover {
    background-color: darken($color-blue, 20%);
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
.project-social-link {
  @extend %btn-icon;
  position: relative;
  flex-basis: 5rem;
  &::after {
    @include center-pos(2rem);
  }
}
.link--twitter {
  &::after {
    background: url('~@/assets/icons/twitter.svg') no-repeat center / 100%;
  }
}
.link--facebook {
  &::after {
    background: url('~@/assets/icons/facebook.svg') no-repeat center / 100%;
  }
}
.link--share {
  &::after {
    background: url('~@/assets/icons/link.svg') no-repeat center / 120%;
  }
}
.project-view-date {
  position: absolute;
  display: block;
  width: 5rem;
  height: 2rem;
  bottom: -9rem;
  right: 65rem;
  font-size: 1.7rem;
  color: $color-grey;
  i {
    position: absolute;
    display: block;
    left: -4rem;
    line-height: 1.7rem;
  }
  .view-date{
    position: absolute;
    display: block;
    left: 0rem;
  }
}
</style>
