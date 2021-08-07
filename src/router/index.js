import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
import layout from '@/views/layout/layout'
import home from '@/views/home/home'
import article from '@/views/article/article'
// 解决重复点击同一个导航出现报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: layout,
    meta:{
      breadcrumb: '首页'
    },
    children: [
      {
        path: '',
        component: home
      },
      {
        path: '/article',
        component: article,
        meta:{
          breadcrumb: '内容管理'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  const user = JSON.parse(localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
