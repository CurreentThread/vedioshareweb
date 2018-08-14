import Vue from 'vue'
import Router from 'vue-router'
import type from '@/components/type'
import home from '@/components/HomePage'
import subscribe from '@/components/suscribe'
import slot from '@/components/slot'

import subs from '@/components/subs'

import detail from '@/components/vediodetail'

import collect from '@/components/collectList'
import history from '@/components/history'

import search from '@/components/search'

import list from '@/components/list'
import navigator from '@/components/common/navigator'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/subs',//设置默认指向的路径指向的是下面的MyHome组件
      component: subs,
      name: 'subs'
    },


    // {
    //   path: '/navigator',//设置默认指向的路径指向的是下面的MyHome组件
    //   component: navigator,
    //   name: 'navigator'
    // },


    {
      path: '/search/:fuzzyWord',//设置默认指向的路径指向的是下面的MyHome组件
      component: search,
      name: 'search'
    },


    {
      path: '/type',//设置默认指向的路径指向的是下面的MyHome组件
      component: type,
      name: 'type'
    },
    {
      path: '/list',//设置默认指向的路径指向的是下面的MyHome组件
      component: list,
      name: 'list'
    },

    // {
    //   path: '/subscribe',//设置默认指向的路径指向的是下面的MyHome组件
    //   component: subscribe,
    //   name: 'subscribe'
    // },
    {
      path: '/slot',//设置默认指向的路径指向的是下面的MyHome组件
      component: slot,
      name: 'slot'
    },

    {
      path: '/',
      component:home,
      children: [
        {
          path: 'home',//设置默认指向的路径指向的是下面的MyHome组件
          component: home,
          name: 'home'
        },


      ]
    },
    {
      path: '/subs',//设置默认指向的路径指向的是下面的MyHome组件
      component: subs,
      name: 'subs',
      children:[
        {
          path: 'subscribe',//设置默认指向的路径指向的是下面的MyHome组件
          component: subscribe,
          name: 'subscribe',

        },
        {
          path: '/collect/:listid/:isupdate/:isSelf',//设置默认指向的路径指向的是下面的MyHome组件
          component: collect,
          name: 'collect'
        },
        {
          path: '/detail/:vedioid',//设置默认指向的路径指向的是下面的MyHome组件
          component: detail,
          name: 'detail'
        },

        {
          path:'history',
          component:history,
          name:'history'
        }
      ]

    },

  ]
})
