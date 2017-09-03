<template lang='pug'>
  .comment(v-if='comment')
    .comment-img
    .comment-body
      .comment-info
        h2.comment-author {{ comment.by }}
        span.comment-date {{ comment.time }}
      p.comment-text {{ comment.text }}
</template>

<script>
export default {
  name: 'comment',
  props: ['id'],
  data() {
    return {
      open: true
    }
  },
  computed: {
    comment() {
      return this.$store.state.comments[this.id]
    }
  },
  methods: {
    pluralize: n => n + (n === 1 ? ' reply' : ' replies')
  }
}
</script>

<style lang='scss'>
@import '~style';

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
