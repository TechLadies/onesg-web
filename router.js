import { createWebHistory, createRouter } from 'vue-router'

const Dashboard = () => import('./src/components/pages/Dashboard')
const SignIn = () => import('./src/components/pages/SignIn')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/signin', name: 'SignIn', component: SignIn },
  ],
})

export default router
