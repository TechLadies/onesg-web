import { createWebHistory, createRouter } from 'vue-router'
import store from './store.js'

const authGuard = (to, from, next) => {
  const loggedIn = !!store.state.user
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (loggedIn === requiresAuth) {
    next()
  } else if (!loggedIn && requiresAuth) {
    next('/login')
  } else if (loggedIn && !requiresAuth) {
    next('//home')
  } else {
    // should not get here
    console.log(loggedIn, requiresAuth)
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'LogIn',
      component: () => import('/src/pages/LogIn.vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: false, layout: 'layout-public' }, // renu
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('/src/pages/Home.vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: true, layout: 'layout-secure' },
    },
    {
      path: '/cases',
      name: 'Cases',
      component: () => import('/src/pages/Cases.vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: true, layout: 'layout-secure' },
    },
    {
      path: '/requests',
      name: 'Requests',
      component: () => import('/src/pages/Requests.vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: true, layout: 'layout-secure' },
    },
    {
      path: '/newcase',
      name: 'New Case',
      component: () => import('/src/pages/NewCase.vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: true, layout: 'layout-secure' },
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('/src/pages/Account.vue'),
      beforeEnter: authGuard,
      meta: { requiresAuth: true, layout: 'layout-secure' },
    },
    { path: '/:catchAll(.*)', name: 'catchAll', redirect: { name: 'LogIn' } },
  ],
})

export default router
