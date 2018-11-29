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

// 获取某一本图书
export let findOneBook = (id) => {
    return axios.get(`/book?id=${id}`);
};

// 修改图书的接口

/*
*@params  id -> 编号
*@params  data -> 数据 请求体发送
*@return {AxiosPromise<T>}
*/
export let updateBook = (id,data)=> {
    return axios.put(`/book?id=${id}`,data)
}
