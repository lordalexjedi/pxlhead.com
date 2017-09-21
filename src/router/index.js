import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/list/CreateListView').then(m => m.default(id))
const createSingleView = id => () => import('../views/single/CreateSingleView').then(m => m.default(id))

const Intro = () => import('../views/Intro.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/intro', component: Intro },
      { path: '/articles', component: createListView('articles') },
      { path: '/projects', component: createListView('projects') },
      { path: '/experiments', component: createListView('experiments') },
      { path: '/music', component: createListView('music') },
      { path: '/art', component: createListView('art') },

      { path: '/articles/:id', component: createSingleView('articles') },
      { path: '/projects/:id', component: createSingleView('projects') },
      { path: '/experiments/:id', component: createSingleView('experiments') },
      { path: '/music/:id', component: createSingleView('music') },
      { path: '/art/:id', component: createSingleView('art') },

      { path: '/', redirect: '/intro' }
    ]
  })
}
