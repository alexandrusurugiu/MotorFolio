import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      component: () => import('../views/MaintenanceView.vue')
    },
    {
      path: '/tunning',
      name: 'tunning',
      component: () => import('../views/TunningView.vue')
    },
    {
      path: '/restoration',
      name: 'restoration',
      component: () => import('../views/RestorationView.vue')
    }
  ],
})

export default router