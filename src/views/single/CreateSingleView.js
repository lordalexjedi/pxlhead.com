import ItemView from './ItemView.vue'
import ArticlesView from './ArticlesView.vue'
import MusicView from './MusicView.vue'

function getComponent (type) {
  if (type === 'articles') {
    return ArticlesView
  } else if (type === 'music') {
    return MusicView
  }
  return ItemView
}

export default function createListView (type) {
  return {
    name: `${type}-view`,

    asyncData ({ store, route: { params: { id }}}) {
      return store.dispatch('FETCH_ITEMS', { ids: [id] })
    },

    render (h) {
      return h(getComponent(type))
    }
  }
}
