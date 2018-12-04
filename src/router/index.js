import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const Home = ()=>import("../components/Home.vue");
const List = ()=>import("../components/List.vue");
const Collect = ()=>import("../components/Collect.vue");
const Add = ()=>import("../components/Add.vue");
const Detail = ()=>import("../components/Detail.vue");

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {keepAlive: true}
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/collect',
      component: Collect
    },
    {
      path: '/add',
      component: Add
    },
    {
      path: '/detail/:bid',
      component: Detail,
      name: 'detail'
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
