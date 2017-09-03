export default {
  activeIds (state) {
    const { activeType, activeSlice, itemsPerSlice, lists } = state

    if (!activeType) {
      return []
    }

    const end = activeSlice * itemsPerSlice
    return lists[activeType].slice(0, end)
  },

  activeItems (state, getters) {
    return getters.activeIds.map(id => state.items[id])
  }
}
