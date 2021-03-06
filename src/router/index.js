import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    name: 'login',
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    name: 'register',
    hidden: true
  },
  /*
  {
    path:'/csv',
    component: () => import('@/views/csvupload/index.vue'),
    name:'csv',
    hidden: true
  },
  */
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '青椒农业',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/test',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'test',
  //       component: () => import('@/views/test/index'),
  //       meta: { title: 'test  ', icon: 'test' }
  //     }
  //   ]
  // },

  {
    path: '/order-inquire',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'order-inquire',
        component: () => import('@/views/order-inquire/index'),
        meta: { title: '订单查询  ', icon: 'form' }
      }
    ]
  },
  {
    path: '/farminfo',
    component: Layout,
    meta: { title: '农场信息', icon: 'example' },
    children: [
      {
        path: 'update',
        name: 'farm_update',
        component: () => import('@/views/farminfo/update/update.vue'),
        meta: { title: '信息更新', icon: 'example' }
      },
      {
        path: 'locate',
        name: 'farm_locate',
        component: () => import('@/views/farminfo/locate/index.vue'),
        meta: { title: '农场定位', icon: 'example' }
      }

    ]
  },
  {
    path: '/item-manage',
    component: Layout,
    redirect: '/item-manage/item-list',
    name: 'item-manage',
    meta: {
      title: '商品管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'item-list',
        component: () => import('@/views/item-manage/item-list/index'), // Parent router-view
        name: 'item-list',
        meta: { title: '商品列表' }
      },
      {
        path: 'item-upshelf',
        component: () => import('@/views/item-manage/item-upshelf/index'),
        meta: { title: '商品上架' }
      },
      {
        path: 'item-detail',
        name: 'item-detail',
        component: () => import('@/views/item-manage/item-detail/index'),
        meta: { title: '商品详情' }
      }
    ]
  },
  {
    path: '/video-manage',
    component: Layout,
    redirect: '/video-manage/video-list',
    name: 'video-manage',
    meta: {
      title: '视频管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'video-list',
        component: () => import('@/views/video-manage/video-list/index'), // Parent router-view
        name: 'video-list',
        meta: { title: '视频列表' }
      },
      {
        path: 'video-upload',
        component: () => import('@/views/video-manage/video-upload/index'),
        meta: { title: '视频上传' }
      },
      {
        path: 'video-item-map',
        name: 'video-item-map',
        component: () => import('@/views/video-manage/video-item-map/index'),
        meta: { title: '关联管理' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
