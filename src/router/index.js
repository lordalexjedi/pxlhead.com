import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/list/CreateListView').then(m => m.default(id))

const Intro = () => import('../views/Intro.vue')
const ArticleView = () => import('../views/single/ArticleView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/intro', component: Intro },
      { path: '/articles', component: createListView('articles') },
      { path: '/articles/:id', component: ArticleView },
      { path: '/projects', component: createListView('projects') },
      { path: '/experiments', component: createListView('experiments') },
      { path: '/music', component: createListView('music') },
      { path: '/art', component: createListView('art') },
      { path: '/', redirect: '/intro' }
    ]
  })
}
