export default {
  activeIds (state) {
    const { activeType, activeSort, itemsPerPage, items, lists } = state

    if (!activeType) {
      return []
    }

    const page = Number(state.route.params.page) || 1
    const start = (page - 1) * itemsPerPage
    const end = page * itemsPerPage

    if (Object.keys(items).length) {
      const sortKey = activeSort === 'top' ? 'views' : 'time'
      return lists[activeType].slice(start, end).sort((aId, bId) => {
        return items[aId][sortKey] - items[bId][sortKey]
      })
    }

    return lists[activeType].slice(start, end)
  },

  activeItems (state, getters) {
    return getters.activeIds.map(id => state.items[id]).filter(_ => _)
  }
}
