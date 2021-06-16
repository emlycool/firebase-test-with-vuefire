import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Dashboard from '../views/dashboard/Dashboard.vue'
import TodoList from '../views/dashboard/todos/List.vue'
import Login from '../views/auth/Login.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component:()=> import(/* webpackChunkName: "DashboardLayout" */ '../views/layouts/DashboardLayout.vue'),
    children: [
      { path: '/', name: 'Dashboard', component: Dashboard},
      { path: '/todos', name: 'TodoList', component: TodoList},
    ],
    meta:{ auth: true}
  },
 
  {
    path: '/auth',
    component:()=> import(/* webpackChunkName: "Auth" */ '../views/layouts/Auth.vue'),
    children: [
      {path: 'login', name: 'Login', component: Login},
      {path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword},
    ],
    
    meta: {guest: true}
  },
  { path: '*', name: 'NotFound', component:()=> import(/* webpackChunkName: "404" */ '../views/error/404.vue')}

]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if(to.matched.some( record => record.meta.auth)){
    if(!store.getters['user/isAuthenticated']) next({name: 'Login'})
    else next()
  }
  if (to.matched.some( record => record.meta.guest)) {
    if(store.getters['user/isAuthenticated']){
      next({name: 'Dashboard'})
    }
    else next()
  }
  else{
    next()
  }
})


router.beforeResolve((to, from, next) => {
  if(to.path){
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
