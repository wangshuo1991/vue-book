# vue-book
- 移动端书城   
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Use Independences
```
npm install 

```

## Files constructor

- mock ——— contain data
- api ——— contain all Api
- base ——— contain all base components
- components ——— contain all page component

## Hot Books (Books) 实现功能 增加api 通过api取数据
- 先写服务端，确保数据能够正常返回
- 增加api方法，实现调取数据的功能
- 在哪个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级中调用这个方法，技术局传递给基础组件
- 写一个基础组件 
    - 创建一个.vue组件 
    - 在需要使用这个组件的父级中引用这个组件
  
## 实现页面的删除  list.vue (button)  


## 修改页面的数据
- api方面 通过url找到需要修改某一项 '/book?id=1',然后再通过主体传递需要修改的内容 比如 {bookName: 'one night',bookPrice: '88.9'}


## 添加 loading
- 在api中添加一个getAll方法，里边同时请求 getSliders 和 getHotBooks 连个方法 （axios.all([getSliders(),getHotBooks()])）
- 然后再home.vue 这个组件的methods中 只保留getAll 这一个方法，getAll方法主要是等到这个页面所有数据全部取过来
- 添加一个loading 组件，用 v-if 控制loading的显示隐藏，刚进入页面是显示，等到数据取过来，内容组件开始显示。loading隐藏；

## 实现页面的缓存
页面获取数据成功之后，切换页面不需要重新获取数据，浪费资源。要实现页面的缓存。
【路由元信息】
- 首先在路由配置中，在需要缓存组件的配置中，添加 "meta",比如在Home.vue中配置

```
{path: '/home',component: Home,meta: {keepAlive: true}} // 这个“meta”属性出现在$route中

```

- 然后找到home.vue 的坑 router-view ;也就是App.vue 中的 router-view 中，但是并不是每一个组件都需要缓存的 所以如下

```
<!-- 这里放的是需要被缓存的组件 -->

<keep-alive> 
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>

<!-- 这里是正常的组件 不需要被缓存的 -->
<router-view v-if="!$route.meta.keepAlive"></router-view>

```

## 切换组件之间的过渡动画
transition 是过渡动画的标签，但是这个标签是需要加在keep-alive组件

```

 <transition name="fadeIn">
    <keep-alive> 
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
 </transition>

 <transition name="fadeIn">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
 </transition>

```

## 下拉刷新

- 默认每次下拉，更新5条数据；前端要告诉后台，现在从第几条给数据；
- /page?offset=5  意思是从5开始取到10;
- 后台返回前端还要告诉是否有更多的数据 hasMore: false;
- 在server.js 开始写后台



## 图片懒加载 
- vue-lazyload 
- npm i vue-lazyload
- [具体使用方法](https://github.com/hilongjw/vue-lazyload) 



## 发布项目
- 
