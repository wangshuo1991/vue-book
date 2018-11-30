import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Collect from '@/components/Collect'
import Detail from '@/components/Detail'
import List from '@/components/List'
import Add from '@/components/Add'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',component: Home,meta: {keepAlive: true}
    },
    {
      path: '/list',component: List
    },
    {
      path: '/collect',component: Collect
    },
    {
      path: '/add',component: Add
    },
    {
      path: '/detail/:bid',component: Detail,name: 'detail'
    },
    {
      path: '/',redirect: '/home'
    }
  ]
})
