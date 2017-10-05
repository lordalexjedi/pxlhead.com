<template lang='pug'>
  .comments
    spinner(:show='loading')
    .comments-header
      .comments-title COMMENTS
        span.comments-counter ({{ ids.length }})
      a.comments-submit.material-icons(@click='showCommentForm = !showCommentForm'
        :class='{"comment-submit--active": showCommentForm}') add
    transition(name='fade')
      form.comments-form(v-show='showCommentForm' @submit.prevent='submitComment')
        .comments-img
        .comments-input
          input.comments-name(type='text' v-model.trim.lazy='newCommentBy' maxlength='30'
            pattern='[a-zA-Z0-9-\. ]+'  :placeholder='placeholder.by' required
            title='Only alphanumeric characters, dashes, dots and spaces should be here.')
          textarea.comments-message(v-model.trim.lazy='newCommentText'
            maxlength='250'  :placeholder='placeholder.text' required
            title='Brevity is the soul of wit')
        button.comments-send.material-icons(type='submit') send
    .comments-list(v-if='!loading && ids.length')
      transition-group(name='slide-down')
        .comment(v-for='id in ids'  :key='id')
          .comment-img
          .comment-body
            .comment-info
              h2.comment-author {{ commentById(id).by }}
              span.comment-date {{ commentById(id).time }}
            p.comment-text {{ commentById(id).text }}
</template>

<script>
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'comments',
  components: { Spinner },
  props: ['ids', 'postId'],

  data() {
    return {
      loading: false,
      showCommentForm: false,
      newCommentBy: '',
      newCommentText: '',

      placeholders: [
        { by: 'Buzz Lightyear', text: 'To infinity and beyond!' },
        { by: 'Marty McFly', text: 'Nobody calls me chicken.' },
        { by: 'Forrest Gump', text: 'Stupid is as stupid does.' },
        { by: 'Joker', text: 'If you gotta go, go with a smile.' },
        { by: 'Dory', text: 'Just keep swimming.' },
        { by: 'Terminator', text: 'Hasta la vista, baby.' },
        { by: 'Lord Vader', text: 'I am your father.' },
        { by: 'Joker', text: 'Why so serious?' },
        { by: 'Bond', text: 'Bond. James Bond.' },
        { by: 'Gollum', text: 'My precious.' },
        { by: 'Yoda', text: 'Do. Or do not. There is no try.' },
        { by: 'Neo', text: 'There is no spoon!' },
        { by: 'Morpheus', text: 'Free your mind.' }
      ],
      activePlaceholder: 0
    }
  },

  beforeMount() {
    if (this.ids.length) {
      this.fetchComments()
    } else {
      this.showCommentForm = true
    }
  },

  computed: {
    placeholder() {
      return this.placeholders[this.activePlaceholder]
    }
  },

  watch: {
    ids: 'fetchComments',
    showCommentForm() {
      if (this.showCommentForm) this.changePlaceholder()
    }
  },

  methods: {
    fetchComments() {
      this.loading = true
      this.$store.dispatch('FETCH_ITEMS', {
        ids: this.ids,
        type: 'comments'
      }).then(() => {
        this.loading = false
      })
    },
    submitComment() {
      this.loading = true
      this.$store.dispatch('UPLOAD_COMMENT', {
        comment: {
          postId: this.postId,
          by: this.newCommentBy,
          text: this.newCommentText
        }
      }).then(() => {
        this.fetchComments()
        this.showCommentForm = false
        this.newCommentBy = ''
        this.newCommentText = ''
      })
    },
    commentById(id) {
      return this.$store.state.comments[id]
    },
    changePlaceholder() {
      this.activePlaceholder = Math.ceil(Math.random() * (this.placeholders.length - 1))
    }
  }
}
</script>

<style lang='scss'>
@import '~style';

.comments {
  position: relative;
  padding: 0 5%;
  min-height: 40rem;
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
  @include screen-style(iphoneSE) {
    flex-basis: 4rem;
    height: 4rem;
    font-size: 2.5rem;
    line-height: 4rem;
    margin-right: 0;
  };
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
  width: 100%;
  padding: 3rem 0;
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
  @include screen-style(ipadAir) {
    flex-direction: column;
    height: auto;
  };
  @include screen-style(iphone7) {
    flex-direction: column;
    height: auto;
  };
  @include screen-style(iphoneSE) {
    flex-direction: column;
    height: auto;
  };
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
    @include screen-style(iphoneSE) {
      display: none;
    };
  }
  .comments-img {
    width: 10rem;
    height: 10rem;
    background-color: $color-pink;
    @include screen-style(ipadAir) {
      margin-bottom: 1rem;
    };
    @include screen-style(iphone7) {
      margin-bottom: 1rem;
    };
    @include screen-style(iphoneSE) {
      margin-bottom: 1rem;
    };
  }
  .comments-input {
    flex-basis: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
    @include screen-style(ipadAir) {
      flex-direction: column;
      width: 90%;
      flex-basis: 90%;
    };
    @include screen-style(iphone7) {
      flex-direction: column;
      width: 90%;
      flex-basis: 90%;
    };
    @include screen-style(iphoneSE) {
      flex-direction: column;
      width: 90%;
      flex-basis: 90%;
    };
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
    @include screen-style(ipadAir) {
      width: calc(100% - 2rem);
      flex-basis: 50%;
      margin-bottom: 1rem;
    };
    @include screen-style(iphone7) {
      width: calc(100% - 2rem);
      flex-basis: 50%;
      margin-bottom: 1rem;
    };
    @include screen-style(iphoneSE) {
      width: calc(100% - 2rem);
      flex-basis: 50%;
      margin-bottom: 1rem;
    };
  }
  .comments-message {
    font-size: 1.8rem;
    color: darken($color-grey, 10%);
    padding: 1rem;
    flex-basis: 40%;
    appearance: none;
    outline-color: $color-blue;
    border: 0.2rem solid lighten($color-blue, 10%);
    @include screen-style(ipadAir) {
      width: calc(100% - 2rem);
      flex-basis: 50%;
      margin-bottom: 1rem;
    };
    @include screen-style(iphone7) {
      width: calc(100% - 2rem);
      flex-basis: 50%;
      margin-bottom: 1rem;
    };
    @include screen-style(iphoneSE) {
      width: calc(100% - 2rem);
      flex-basis: 50%;
      margin-bottom: 1rem;
    };
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
    border: none;
    outline: none;
    line-height: 5rem;
    cursor: pointer;
    border-radius: 5rem;
    background-color: $color-blue;
    transition: 0.3s ease-in-out;
    @include screen-style(ipadAir) {
      right: calc(50% - 12rem / 2);
    };
    @include screen-style(iphone7) {
      right: calc(50% - 12rem / 2);
    };
    @include screen-style(iphoneSE) {
      right: calc(50% - 12rem / 2);
    };
    &:hover {
      background-color: darken($color-blue, 10%);
      transition: 0.3s ease-in-out;
    }
  }
}

.comment {
  width: 100%;
  position: relative;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
  align-self: center;
  @include screen-style(iphone7) {
    flex-direction: column;
  };
  @include screen-style(iphoneSE) {
    flex-direction: column;
  };
}
.comment-img {
  position: relative;
  width: 7vh;
  height: 7vh;
  align-self: center;
  border-radius: 50%;
  background: $color-pink;
  background-position: center;
  background-size: cover;
  @include screen-style(iphone7) {
    position: absolute;
    top: 0vh;
    width: 7vh;
    height: 7vh;
    right: 5vh;
    z-index: 1002;
  };
  @include screen-style(iphoneSE) {
    position: absolute;
    top: 0vh;
    width: 7vh;
    height: 7vh;
    right: 5vh;
    z-index: 1002;
  };
}
.comment-body {
  position: relative;
  flex-basis: 75%;
  min-height: 10rem;
  padding: 2rem 5%;
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: $color-lightblue;
  &::after {
    display: block;
    content: '';
    top: calc(50% - 3rem / 2);
    left: -4rem;
    border: solid transparent;
    height: 0;
    width: 3rem;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-width: 2rem 3rem 2rem 0;
    border-right-color: $color-lightblue;
    margin-left: -10px;
  }
  @include screen-style(iphone7) {
    margin-left: 0;
    margin-top: 3.5vh;
    &::after {
      display: none;
    }
  };
  @include screen-style(iphoneSE) {
    margin-left: 0;
    margin-top: 3.5vh;
    &::after {
      display: none;
    }
  };
}
.comment-info {
  flex-basis: 5rem;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  color: darken($color-grey, 17%);
  @include screen-style(iphone7) {
    flex-direction: column;
  };
  @include screen-style(iphoneSE) {
    flex-direction: column;
  };
}
.comment-author {
  font-size: 2rem;
  font-weight: bold;
}
.comment-date {
  font-size: 1.3rem;
  opacity: 0.8;
}
.comment-text {
  font-size: 1.8rem;
  color: darken($color-grey, 10%);
}
</style>
