<template lang='pug'>
  .comments
    spinner(:show='loading')
    .comments-header
      .comments-title COMMENTS
        span.comments-counter ({{ commentsCount }})
      a.comments-submit.material-icons(@click='showCommentForm = !showCommentForm'
        :class='{"comment-submit--active": showCommentForm}') add
    transition(name='fade')
      form.comments-form(v-if='showCommentForm')
        .comments-img
        .comments-input
          input.comments-name(placeholder='ex. Marty McFly')
          textarea.comments-message(placeholder='Dont panic')
        a.comments-send.material-icons send
    .comments-list(v-if='!loading')
      .comment(v-for='id in item.commentIds')
        .comment-img
        .comment-body
          .comment-info
            h2.comment-author {{ comment(id).by }}
            span.comment-date {{ comment(id).time }}
          p.comment-text {{ comment(id).text }}
</template>

<script>
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'comments',
  components: { Spinner },
  props: ['item'],

  data() {
    return {
      loading: true,
      showCommentForm: false
    }
  },

  beforeMount() {
    this.fetchComments()
  },

  watch: {
    item: 'fetchComments'
  },

  computed: {
    comment(id) {
      return this.$store.state.comments[id]
    },
    commentsCount() {
      return this.item.commentIds
      ? this.item.commentIds.length
      : 0
    }
  },

  methods: {
    fetchComments() {
      if (this.item.commentIds) {
        this.loading = true
        fetchComments(this.$store, this.item).then(() => {
          this.loading = false
        })
      }
    }
  }
}

function fetchComments(store, item) {
  if (item && item.commentIds) {
    return store.dispatch('FETCH_COMMENTS', {
      ids: item.commentIds
    })
  }
}
</script>

<style lang='scss'>
@import '~style';

.comments {
  position: relative;
  padding: 0 10%;
  background-color: #F8FCFF;
}
.comments-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;
}
.comments-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: darken($color-grey, 17%);
}
.comments-counter {
  margin-left: 1rem;
}
.comments-submit {
  position: relative;
  flex-basis: 5rem;
  height: 5rem;
  border-radius: 50%;
  font-size: 3rem;
  line-height: 5rem;
  margin-right: 4rem;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  cursor: pointer;
  background-color: $color-pink;
  transition: 0.3s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  &:hover {
    background-color: darken($color-pink, 10%);
    transition: 0.3s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
}
.comment-submit--active {
  transform: rotate(45deg);
  transition: 0.3s cubic-bezier(0.68, -0.15, 0.265, 1.35);
}
.comments-list {
  position: relative;
  display: flex;
  width: 100rem;
  top: 0rem;
  padding: 3rem 0;
  left: calc(50% - 100rem / 2);
  flex-direction: column;
  justify-content: space-between;
}
.comments-form {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem 0;
  margin-bottom: 4rem;
  height: 15rem;
  background-color: $color-lightblue;
  transition: 0.5s ease-in-out;
  &::after {
    display: block;
    content: '';
    top: -7rem;
    right: 4.5rem;
    border: solid transparent;
    height: 4rem;
    width: 0rem;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-width: 0rem 2rem 4rem 2rem;
    border-bottom-color: $color-lightblue;
    margin-bottom: -10px;
  }
  .comments-img {
    width: 10rem;
    height: 10rem;
    background-color: $color-pink;
  }
  .comments-input {
    flex-basis: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
  }
  .comments-name {
    font-size: 1.8rem;
    color: darken($color-grey, 10%);
    padding: 1rem;
    flex-basis: 2rem;
    width: 60%;
    appearance: none;
    outline-color: $color-blue;
    border: 0.2rem solid lighten($color-blue, 10%);
  }
  .comments-message {
    font-size: 1.8rem;
    color: darken($color-grey, 10%);
    padding: 1rem;
    flex-basis: 40%;
    appearance: none;
    outline-color: $color-blue;
    border: 0.2rem solid lighten($color-blue, 10%);
  }
  .comments-send {
    position: absolute;
    display: block;
    bottom: -2.5rem;
    right: 12rem;
    width: 12rem;
    height: 5rem;
    font-size: 3rem;
    text-align: center;
    color: $color-white;
    line-height: 5rem;
    cursor: pointer;
    border-radius: 5rem;
    background-color: $color-blue;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: darken($color-blue, 10%);
      transition: 0.3s ease-in-out;
    }
  }
}

.comment {
  width: 100rem;
  flex-basis: 16rem;
  position: relative;
  margin-bottom: 5rem;
}
.comment-img {
  position: absolute;
  top: calc(50% - 7rem / 2);
  left: 0;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background: $color-pink;
  background-position: center;
  background-size: cover;
}
.comment-body {
  position: absolute;
  right: 0;
  top: 0;
  width: 75rem;
  min-height: 10rem;
  padding: 2rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: $color-lightblue;
  &::after {
    display: block;
    content: '';
    top: calc(50% - 3rem / 2);
    left: -6rem;
    border: solid transparent;
    height: 0;
    width: 4rem;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-width: 2rem 4rem 2rem 0;
    border-right-color: $color-lightblue;
    margin-left: -10px;
  }
}
.comment-info {
  flex-basis: 5rem;
  width: 100%;
  position: relative;
  color: darken($color-grey, 17%);
}
.comment-author {
  position: absolute;
  top: 1rem;
  left: 0;
  font-size: 2rem;
  font-weight: bold;
}
.comment-date {
  position: absolute;
  top: 1rem;
  right: 0;
  font-size: 1.3rem;
  opacity: 0.8;
}
.comment-text {
  font-size: 1.8rem;
  color: darken($color-grey, 10%);
}
</style>
