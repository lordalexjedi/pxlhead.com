import ItemView from './ItemView.vue'
import ArticleView from './ArticleView.vue'

export default function createListView(type) {
  return {
    name: `${type}-view`,

    asyncData({ store, route: { params: { id }}}) {
      return store.dispatch('FETCH_ITEMS', { ids: [id] })
    },

    render(h) {
      return type === 'articles'
      ? h(ArticleView)
      : h(ItemView)
    }
  }
}
