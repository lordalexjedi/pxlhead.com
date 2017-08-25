import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/list/CreateListView').then(m => m.default(id))
const ItemView = () => import('../views/single/ItemView.vue')

const ArticleView = () => import('../views/single/ArticleView.vue')
const PlaylistView = () => import('../views/single/PlaylistView.vue')

const Intro = () => import('../views/Intro.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/intro', component: Intro },
      { path: '/articles', component: createListView('articles') },
      { path: '/projects', component: createListView('projects') },
      { path: '/experiments', component: createListView('experiments') },
      { path: '/music', component: createListView('music') },
      { path: '/art', component: createListView('art') },
      { path: '/item/:id', component: ItemView },
      { path: '/article/:id', component: ArticleView },
      { path: '/playlist/:id', component: PlaylistView },
      { path: '/', redirect: '/articles' }
    ]
  })
}
