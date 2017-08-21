import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const ItemView = () => import('../views/ItemView.vue')
const Intro = () => import('../views/Intro.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/intro', component: Intro },
      { path: '/articles/:page(\\d+)?', component: createListView('articles') },
      { path: '/projects/:page(\\d+)?', component: createListView('projects') },
      { path: '/experiments/:page(\\d+)?', component: createListView('experiments') },
      { path: '/music/:page(\\d+)?', component: createListView('music') },
      { path: '/art/:page(\\d+)?', component: createListView('art') },
      { path: '/item/:id', component: ItemView },
      { path: '/', redirect: '/intro' }
    ]
  })
}
