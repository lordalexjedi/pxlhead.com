import Vue from 'vue';
import Router from 'vue-router';

import Intro from '@/components/Intro';
import Experiments from '@/components/Experiments';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro,
    }, {
      path: '/experiments',
      name: 'Experiments',
      component: Experiments,
    },
  ],
});
