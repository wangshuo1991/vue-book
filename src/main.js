// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// import swiper plugins
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
// Use swiper plugins
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// 使用懒加载插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img4.imgtn.bdimg.com/it/u=3079257199,3885354259&fm=214&gp=0.jpg',// 图片错误地址
  loading: 'http://img2.imgtn.bdimg.com/it/u=1686986137,1394237728&fm=214&gp=0.jpg', //图片loading加载
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
