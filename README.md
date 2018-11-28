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