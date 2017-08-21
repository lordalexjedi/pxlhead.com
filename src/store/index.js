import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      activeType: null,
      activeSort: 'top',
      itemsPerPage: 2,
      items: {/* [id: number]: Item */},
      comments: {/* [id: number]: Comment */},
      lists: {
        articles: [],
        projects: [],
        experiments: [],
        music: [],
        art: []
      }
    },
    actions,
    mutations,
    getters
  })
}
