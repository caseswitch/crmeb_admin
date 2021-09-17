import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout/index'

/* Router Modules */
// import componentsRouter from './modules/components'
import storeRouter from './modules/store'
import orderRouter from './modules/order'
import userRouter from './modules/user'
import distributionRouter from './modules/distribution'
import marketingRouter from './modules/marketing'
import financialRouter from './modules/financial'
import contentRouter from './modules/content'
import operationRouter from './modules/operation'
import appSettingRouter from './modules/appSetting'
import maintainRouter from './modules/maintain'
import mobileRouter from './modules/mobile'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 商品
  storeRouter,
  // 订单
  orderRouter,
  // 会员
  userRouter,
  // 分销
  distributionRouter,
  // 营销
  marketingRouter,
  // 财务
  financialRouter,
  // 内容
  contentRouter,
  // 设置
  operationRouter,
  // 应用
  appSettingRouter,
  // 维护
  maintainRouter,
  // 移动端管理
  mobileRouter,
  // 数据
  {
    path: '/login',
    name: 'Home',
    hidden: true,
    component: () => import('@/views/login/index')
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  }
]
export const asyncRoutes = []

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
