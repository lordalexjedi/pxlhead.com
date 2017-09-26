import {
  fetchItems,
  fetchItemView,
  fetchIdsByType,
  fetchSearchedIds,
  fetchComments,
  uploadComment
} from '../api'

export default {
  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return fetchIdsByType(type, state.activeSort)
      .then(ids => commit('SET_LIST', { type, ids }))
      .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
  },

  FETCH_SEARCHED_LIST: ({ commit, dispatch, state }, { type, tags }) => {
    commit('RESET_ACTIVE_SLICE')
    return fetchSearchedIds(type, tags)
      .then(ids => commit('SET_LIST', { type, ids }))
      .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
  },

  // ensure all active items are fetched
  ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
    return dispatch('FETCH_ITEMS', {
      ids: getters.activeIds
    })
  },

  FETCH_ITEMS: ({ commit, state }, { ids, type = 'posts', refresh = false }) => {
    const now = Date.now()
    ids = ids.filter(id => {
      const item = state.items[id]
      return !item || refresh || now - item.__lastUpdated > 1000 * 60 * 3
    })
    if (ids.length) {
      return type === 'posts'
      ? fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
      : fetchComments(ids).then(comments => commit('SET_COMMENTS', { comments }))
    } else {
      return Promise.resolve()
    }
  },

  FETCH_ITEM_VIEW: ({ commit, dispatch, state }, { id }) => {
    return fetchItemView({ id, type: state.activeType, views: state.items[id].views })
  },

  UPLOAD_COMMENT: ({ commit, dispatch, state }, { comment }) => {
    return uploadComment(comment).then(comment => {
      commit('SET_COMMENTS', { comments: [ comment ] })
      return dispatch('FETCH_ITEMS', { ids: [ comment.postId ], refresh: true })
    })
  }
}
