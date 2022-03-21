import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeTabs from '../views/HomeTabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeTabs,
    children: [
      {
        path: '',
        redirect: 'library',
      },
      {
        path: 'log',
        component: () => import('@/views/LogIn.vue'),
      },
      {
        path: 'createAccount',
        component: () => import('@/views/CreateAccount.vue'),
      },
      {
        path: 'library',
        component: () => import('@/views/HomeLibrary.vue'),
      },
      {
        path: 'explorer',
        component: () => import('@/views/HomeExplorer.vue'),
      },
      {
        path: 'news',
        component: () => import('@/views/HomeNews.vue'),
      },
      {
        path: 'plus',
        component: () => import('@/views/HomePlus.vue'),
      },
    ],
  },
  {
    path: '/message/:id',
    component: () => import('../views/ViewMessagePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
