import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from 'firebase/auth'

        
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
        { path: '/Feed', component: () => import(/* webpackChunkName: "Feed" */ '../views/Feed.vue') },
        { path: '/register', component: ()  => import(/* webpackChunkName: "Register" */ '../views/Register.vue') },
        { path: '/login', component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue') },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if (getAuth().currentUser == null && to.path == '/Feed') {
    return { path: '/' }
  }
})

export default router
