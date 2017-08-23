import ItemList from './ItemList.vue'
import ProjectList from './ProjectList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView (type) {
  return {
    name: `${type}-view`,

    asyncData ({ store }) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    title: camelize(type),

    render (h) {
      const list = type === 'projects' ? ProjectList : ItemList
      return h(list, { props: { type }})
    }
  }
}
