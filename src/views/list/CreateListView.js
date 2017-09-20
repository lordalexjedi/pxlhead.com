import ItemList from './ItemList.vue'
import ProjectList from './ProjectList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView(type) {
  return {
    name: `${type}-list`,

    asyncData({ store }) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    title: camelize(type),

    render(h) {
      return type === 'projects'
      ? h(ProjectList, { props: { type }})
      : h(ItemList, { props: { type }})
    }
  }
}
