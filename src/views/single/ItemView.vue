<template lang='pug'>
  transition(name='slide-up' appear)
    .item-view(v-if='item')
      .item-view-body
        .item-view-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
        playlist(v-if='item.type === "music"')
        .item-view-text
          h1.item-view-title {{ item.title }}
          p.item-view-description {{ item.description }}
          .item-view-infobar
            .item-view-stats
              .item-view-watch
                i.material-icons remove_red_eye
                span.watch-counter {{ item.views }}
              .item-view-date
                i.material-icons date_range
                span.view-date {{ item.time }}
            .item-view-social
              a.social-link.link-twitter
              a.social-link.link-facebook
              a.social-link.link-dribbble
          .item-view-tag
            a.tag-link(v-for='tag in item.tags') {{ tag }}
          .item-view-action
            a.item-view-link VIEW
            a.item-view-comment.material-icons(@click='toggleComments') comment
            a.item-view-share.material-icons(@click='showSocial = !showSocial') share
            .tooltip-social(v-if='showSocial')
              a.social-link.link-twitter-white
              a.social-link.link-facebook-white
              a.social-link.link-dribbble-white
      comments(v-show='showComments' ref='comments'
        v-bind='{ ids: item.commentIds ? Object.keys(item.commentIds) : [], postId: id }')
</template>

<script>
import Comments from '@/components/Comments.vue'
import Playlist from '@/components/Playlist.vue'

export default {
  name: 'item-view',

  components: {
    Comments,
    Playlist
  },

  props: {
    id: String
  },

  watch: {
    id() {
      this.showComments = false
    }
  },

  data() {
    return {
      showComments: false,
      showSocial: false
    }
  },

  computed: {
    item() {
      return this.$store.state.items[this.id]
    }
  },

  methods: {
    toggleComments() {
      this.showComments = !this.showComments
      if (this.showComments) this.$emit('scroll')
    }
  }
}
</script>

<style lang='scss'>
@import '~style';

.item-view {
  position: absolute;
  top: 5%;
  left: 25%;
  width: 50%;
  min-height: 95%;
  background: $color-white;
  z-index: 1001;
  @include screen-style(ipadPro) {
    left: 5%;
    width: 90%;
  };
  @include screen-style(ipadAir) {
    left: 5%;
    width: 90%;
  };
  @include screen-style(iphone7) {
    left: 0;
    width: 100%;
    top: 0;
    min-height: 100%;
  };
  @include screen-style(iphoneSE) {
    left: 0;
    width: 100%;
    top: 0;
    min-height: 100%;
  };
}
.item-view-img {
  width: 100%;
  flex-basis: 55vh;
  @extend %img;
}
.item-view-body {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  padding: 5%;
}
.item-view-text {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem 0rem;
  @include screen-style(iphone7) {
    padding: 0rem 2rem;
  };
  @include screen-style(iphoneSE) {
    padding: 0rem 2rem;
  }
}
.item-view-title {
  font-size: 3rem;
  text-align: left;
  color: #4f4f4f;
  margin: 1rem 0;
}

.item-view-description {
  padding: 0.5rem 0 0.5rem 0;
  flex-basis: 50%;
  font-size: 2rem;
  line-height: 2.5rem;
  color: darken($color-grey, 10%);
  text-align: justify;
  margin: 1rem 0;
}
.item-view-action {
  position: absolute;
  top: -2.5rem;
  right: 4rem;
  width: 22rem;
  display: flex;
  justify-content: space-between;
  @include screen-style(iphone7) {
    position: relative;
    top: auto;
    width: 100%;
    margin: 1rem 0;
    right: auto;
  };
  @include screen-style(iphoneSE) {
    position: relative;
    top: auto;
    width: 100%;
    margin: 1rem 0;
    right: auto;
  }
}
.item-view-link {
  @extend %btn-text;
  box-shadow: none;
  width: 14rem;
  height: 5rem;
  line-height: 5rem;
  &:hover {
    box-shadow: $shadow;
  }
}
.item-view-comment {
  width: 5rem;
  height: 5rem;
  color: $color-white;
  font-size: 2rem;
  text-align: center;
  line-height: 5rem;
  background-color: $color-pink;
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: $shadow;
    background-color: darken($color-pink, 10%);
    transition: all 0.3s ease-in-out;
  }
}
.item-view-share {
  width: 5rem;
  height: 5rem;
  display: none;
  color: $color-white;
  font-size: 2rem;
  text-align: center;
  line-height: 5rem;
  background-color: $color-pink;
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: $shadow;
    background-color: darken($color-pink, 10%);
    transition: all 0.3s ease-in-out;
  }
  @include screen-style(iphone7) {
    display: block;
  };
  @include screen-style(iphoneSE) {
    display: block;
  }
}
.item-view-infobar {
  display: flex;
  width: 100%;
  padding: 0.5rem 0 0.5rem 0;
  margin: 1rem 0;
  justify-content: space-between;
  align-items: center;
  @include screen-style(iphone7) {
    display: none;
  };
  @include screen-style(iphoneSE) {
    display: none;
  }
}
.item-view-stats {
  flex-basis: 30%;
  margin-left: 2rem;
  display: flex;
  justify-content: space-between;
  @include screen-style(iphone7) {
    display: none;
  };
  @include screen-style(iphoneSE) {
    display: none;
  };
}
.item-view-watch {
  position: relative;
  display: block;
  font-size: 1.7rem;
  margin-left: 2rem;
  color: $color-grey;
  i {
    position: absolute;
    display: block;
    left: -4rem;
    line-height: 1.7rem;
  }
  .view-counter {
    position: absolute;
    display: block;
    left: 0rem;
  }
}
.item-view-date {
  position: relative;
  display: block;
  width: 5rem;
  height: 2rem;
  font-size: 1.7rem;
  margin-left: 4rem;
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
.item-view-tag {
  position: relative;
  margin: 1rem 0;
  display: flex;
  @include screen-style(iphone7) {
    order: -1;
    margin: 2rem 0;
  };
  @include screen-style(iphoneSE) {
    order: -1;
    margin: 2rem 0;
  };
}
.tag-link {
  @extend %btn-text;
  flex-basis: 10rem;
  height: 4rem;
  margin: 0 1rem;
  background-color: $color-blue;
  line-height: 4rem;
  box-shadow: none;
  &:hover {
    box-shadow: $shadow;
    background-color: darken($color-blue, 10%);
  }
}
.item-view-social {
  display: flex;
  justify-content: space-around;
  width: 18rem;
  height: 4rem;
  @include screen-style(iphone7) {
    display: none;
  };
  @include screen-style(iphoneSE) {
    display: none;
  }
}
.tooltip-social {
  position: absolute;
  top: -8rem;
  right: -2rem;
  display: flex;
  justify-content: space-around;
  width: 18rem;
  height: 4rem;
  padding: 1rem;
  border-radius: 3rem;
  background-color: $color-pink;
  &::after {
    position: absolute;
    display: block;
    content: '';
    bottom: -1.5rem;
    right: 3rem;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 2rem 1rem 0 1rem;
    border-color: $color-pink transparent transparent transparent;
  }
}
.social-link {
  position: relative;
  flex-basis: 4rem;
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(200, 200, 200, 0.8);
    transition: all 0.3s ease-in-out;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    @include center-pos(2rem);
  }
}
.link-twitter {
  &::after {
    background: url('~@/assets/icons/twitter-black.svg') no-repeat center / 100%;
  }
}
.link-facebook {
  &::after {
    background: url('~@/assets/icons/facebook-black.svg') no-repeat center / 100%;
  }
}
.link-dribbble {
  &::after {
    background: url('~@/assets/icons/link-black.svg') no-repeat center / 120%;
  }
}
.link-twitter-white {
  &::after {
    background: url('~@/assets/icons/twitter.svg') no-repeat center / 100%;
  }
}
.link-facebook-white {
  &::after {
    background: url('~@/assets/icons/facebook.svg') no-repeat center / 100%;
  }
}
.link-dribbble-white {
  &::after {
    background: url('~@/assets/icons/link.svg') no-repeat center / 120%;
  }
}

</style>
