<template lang='pug'>
  .comment(v-if='comment')
    .comment-header
      .comment-title COMMENTS
        span.comment-counter (42)
      a.comment-submit
    .comment-item
      .comment-img
      .comment-body
        h2.comment-author elliepooh
          span.comment-date 23.12.2017
        p.comment-text
    a.comment-up
</template>

<script>
export default {
  name: 'comment',
  props: ['id'],
  data () {
    return {
      open: true
    }
  },
  computed: {
    comment () {
      return this.$store.state.items[this.id]
    }
  },
  methods: {
    pluralize: n => n + (n === 1 ? ' reply' : ' replies')
  }
}
</script>

<style lang='scss'>
@import '~style';

.comment{
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: $color-white;
}


</style>
