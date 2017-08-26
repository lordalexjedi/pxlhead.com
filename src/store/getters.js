export default {
  activeIds (state) {
    const { activeType, activeSort, activeSlice, itemsPerSlice, items, lists } = state

    if (!activeType) {
      return []
    }

    const start = (activeSlice - 1) * itemsPerSlice
    const end = activeSlice * itemsPerSlice
    const ids = lists[activeType].slice(start, end)

    if (Object.keys(items).length) {
      const sortKey = activeSort === 'top' ? 'views' : 'time'
      return ids.sort((aId, bId) => items[aId][sortKey] - items[bId][sortKey])
    }

    return ids
  },

  activeItems (state, getters) {
    return getters.activeIds.map(id => state.items[id]).filter(_ => _)
  }
}
