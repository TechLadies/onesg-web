import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Dashboard = () => import('./components/pages/Dashboard')
const SignIn = () => import('./components/pages/SignIn')

const router = new VueRouter({
  mode: 'history',
  hash: 'hash',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/signin', component: SignIn },
  ],
})

export default router
