<template>
  <div id="app">
    <Tab></Tab>
    <!-- 这里是需要缓存的组件 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 这里是不需要缓存的组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Tab from '@/base/Tab.vue'

export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;

  ul,li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  button,input {
    border: 0;
    outline: none;
  }

  .content {
    position: fixed;
    width: 100%;
    top: 50px;
    bottom: 50px;
    overflow: auto;
  }
  

}
</style>
