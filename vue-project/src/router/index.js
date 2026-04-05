import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from 'firebase/auth'

        
const routes = [
  {
    path: '/',
    name: 'Catroom - Home',
    component: HomeView
  },
  {
    path: '/Feed',
    name: 'Catroom - Feed',
    component: () => import(/* webpackChunkName: "Feed" */ '../views/Feed.vue')
  },
  {
    path: '/register',
    name: 'Catroom - Register',
    component: ()  => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Catroom - Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if (getAuth().currentUser == null && to.path == '/Feed') {
    alert("Please Login or Register to access the feed.");
    return { path: '/' }
  }
  document.title = to.name;
})

export default router
