import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeTabs from '../views/HomeTabs.vue'
import * as Realm from "realm-web";
const app = Realm.getApp("application-habu-wbdom");

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeTabs,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: 'library',
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
        path: 'options',
        component: () => import('@/views/HomeOptions.vue'),
      },
    ],
  },
  {
    path: '/createAccount',
    name: 'CreateAccount',
    component: () => import('@/views/CreateAccount.vue'),
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import('@/views/LogIn.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  if (!app.currentUser && to.meta.requiresAuth) {
    return router.push({ name: "Log" });
  }
})

export default router
