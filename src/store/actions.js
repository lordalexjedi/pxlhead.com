import {
  fetchItems,
  fetchItemView,
  fetchIdsByType,
  fetchSearchedIds,
  fetchComments
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

  FETCH_ITEMS: ({ commit, state }, { ids }) => {
    const now = Date.now()
    ids = ids.filter(id => {
      const item = state.items[id]
      if (!item) {
        return true
      }
      if (now - item.__lastUpdated > 1000 * 60 * 3) {
        return true
      }
      return false
    })
    if (ids.length) {
      return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
    } else {
      return Promise.resolve()
    }
  },

  FETCH_ITEM_VIEW: ({ commit, dispatch, state }, { id }) => {
    return fetchItemView({ id, type: state.activeType, views: state.items[id].views })
  },

  FETCH_COMMENTS: ({ commit, state }, { ids }) => {
    return fetchComments(ids).then(comments => commit('SET_COMMENTS', { comments }))
  }
}
