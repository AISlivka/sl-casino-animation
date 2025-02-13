import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/pages/HomePage.vue';
import Page404 from '@/components/pages/Page404.vue';
import { ROUTE_NAMES } from '@/constants/RouteNames';

const routes = [
  {
    path: '/',
    component: Home,
    name: ROUTE_NAMES.HOME_PAGE,
    meta: {
      title: 'Sl Casino Animation',
      description: 'Sl Casino Animation',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: ROUTE_NAMES.PAGE_404,
    component: Page404,
    meta: {
      title: 'Sl Casino Animation',
      description: 'Sl Casino Animation',
      hideHeader: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return {
        top: 0,
      };
    }
  },
});

export default router;
