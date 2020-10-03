import { createWebHistory, createRouter } from 'vue-router'

const Dashboard = () => import('/src/pages/Dashboard.vue')
const SignIn = () => import('/src/pages/SignIn.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/signin', name: 'SignIn', component: SignIn },
  ],
})

export default router
