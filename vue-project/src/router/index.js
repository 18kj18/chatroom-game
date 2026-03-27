import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
        
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    redirect:"/about/us",  //重新定向
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    children: [
      { 
        //二级导航的路径不要加斜杠！！
        path:"us",
        component:() => import("../views/AboutSub/AboutUs.vue")
      },
      {
        path:"info",
        component: () => import("../views/AboutSub/Information.vue")
      }
     ]
  },
  {
    path: '/More',
    name: 'More',
    component: () => import( /* webpackChunkName: "More" */ '../views/MoreView.vue')
  },
  {
    path: '/News/:name',
    name: 'News',
    component: () => import(/* webpackChunkName: "details" */ '../views/News.vue')
  },
        { path: '/Feed', component: () => import(/* webpackChunkName: "Feed" */ '../views/Feed.vue') },
        { path: '/register', component: ()  => import(/* webpackChunkName: "Register" */ '../views/Register.vue') },
        { path: '/login', component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue') },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
