import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';  // 增加默认的请求路径

// 获取 轮播图数据  return的是一个promise对象
export let getSliders = ()=>{
    return axios.get('/sliders')
};

// 获取热门图书接口
export let getHotBooks = ()=>{
    return axios.get('/hot')
};

// 获取全部图书

export let getBooks = ()=>{
    return axios.get('/book');
};

// 删除某一本图书

export let removeBooks = (id)=>{
    return axios.delete(`/book?id=${id}`);
}