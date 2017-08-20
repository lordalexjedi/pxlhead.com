export default {
  activeIds (state) {
    const { activeType, activeSort, itemsPerPage, items, lists } = state

    if (!activeType) {
      return []
    }

    const page = Number(state.route.params.page) || 1
    const start = (page - 1) * itemsPerPage
    const end = page * itemsPerPage

    if (activeSort === 'new') {
      const newItems = Object.keys(items)
        .filter(id => items[id].type === activeType)
        .sort((aId, bId) => items[aId].time > items[bId].time ? -1 : 1)

      return newItems.slice(start, end)
    }

    return lists[activeType].slice(start, end)
  },

  activeItems (state, getters) {
    return getters.activeIds.map(id => state.items[id]).filter(_ => _)
  }
}
