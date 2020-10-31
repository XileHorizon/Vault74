import Vue from 'vue';
import Router from 'vue-router';
import ChatComponent from '@/components/Chat';
import StoreComponent from '@/components/Store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: window.location.pathname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChatComponent,
    },
    {
      path: '/store',
      name: 'store',
      alias: '/vuex',
      component: StoreComponent,
    },
    {
      path: '*',
      component: {
        functional: true,
        render(h) {
          return h('h1', 'Page not found!');
        },
      },
    },
  ],
});

export default router;
