import { createWebHistory, createRouter } from 'vue-router'
import store from './store.js'

const authGuard = (to, from, next) => {
  const loggedIn = !!store.state.user
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (loggedIn === requiresAuth) {
    next()
  } else if (!loggedIn && requiresAuth) {
    next('/signin')
  } else if (loggedIn && !requiresAuth) {
    next('/case')
  } else {
    // should not get here
    console.log(loggedIn, requiresAuth)
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/case',
      name: 'Case',
      component: () => import('/src/pages/Case.vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: true, layout: 'layout-secure' },
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('/src/pages/SignIn.vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: false, layout: 'layout-public' },
    },
    {
      path: '/requestsAll',
      name: 'RequestsAll',
      component: () => import('/src/pages/Requests(All).vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: false, layout: 'layout-secure' },
    },
    { path: '/:catchAll(.*)', name: 'catchAll', redirect: { name: 'SignIn' } },
  ],
})

export default router
