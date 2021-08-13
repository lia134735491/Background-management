import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
import layout from '@/views/layout/layout'
import home from '@/views/home/home'
import article from '@/views/article/article'
import image from '@/views/image/image'
import fans from '@/views/fans/fans'
import publish from '@/views/publish/publish'
import comment from '@/views/comment/comment'
import setting from '@/views/setting/setting'
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
      },
      {
        path: '/image',
        component: image,
        meta:{
          breadcrumb: '素材管理'
        }
      },
      {
        path: '/fans',
        component: fans,
        meta:{
          breadcrumb: '素材管理'
        }
      },
      {
        path: '/publish',
        component: publish,
        meta:{
          breadcrumb: '发布文章'
        }
      },
      {
        path: '/comment',
        component: comment,
        meta:{
          breadcrumb: '评论管理'
        }
      },
      {
        path: '/settings',
        component: setting,
        meta:{
          breadcrumb: '个人设置'
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
