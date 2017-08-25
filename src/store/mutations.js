import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
    state.activeSlice = 1
  },

  INCREMENT_ACTIVE_SLICE (state) {
    state.activeSlice++
  },

  SET_ACTIVE_SORT: (state, { sort }) => {
    state.activeSort = sort
    state.activeSlice = 1
  },

  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_COMMENTS: (state, { comments }) => {
    comments.forEach(comment => {
      if (comment) {
        Vue.set(state.comments, comment.id, comment)
      }
    })
  }
}
