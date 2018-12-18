const http = require('http');
const fs = require('fs');
let url = require('url');

// 获取轮播图 /sliders
let sliders = require('./sliders');

// 获取book.json
function read(cb){
    fs.readFile('./mock/book.json','utf8',function (err,data) {
        if(err || data.length ==0){ // 如果有错或者json为空
            //console.log(err);
            cb([]);
        }else{
            cb(JSON.parse(data));  // 读取出的内容转换成对象
        }
    })
};

let pageSize = 5; // 每次下拉刷新 5 数据
/* read(function (books) {
    console.log(books);
}); */

// 注意 取出的数据都是倒序的，因为默认最后边的数据是最新的，所以把最新的数据放在最前边
http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    if(req.method == "OPTIONS") return res.end(); /* 让 options请求 快速返回 */
    let {pathname,query} = url.parse(req.url,true); // true 把query转换成对象

    if(pathname === '/page'){ //下拉加载的后台
        let offset = parseInt(query.offset) || 0;// 拿到前端传递的值，page?offset=5
        read(function (books) {
            // 每次偏移量在原来的基础上 增加5 
            let result = books.reverse().slice(offset,offset+pageSize); // 比如是 0-5 ，5-10 ， 10 - 15
            let hasMore = true; // 默认有更多的数据
            if(books.length<=offset+pageSize){ // 如果没有更多数据了
                hasMore=false;
            }
            res.setHeader('Content-Type','application/json;charset=utf-8');
            res.end(JSON.stringify({hasMore,books:result}));
        });
        return;
    }
    
    if(pathname === '/sliders'){
        res.setHeader('Content-Type','application/json;charset=utf-8');
        res.end(JSON.stringify(sliders));
    }

    if(pathname === '/hot'){
        read(function (books) {
            let hot = books.reverse().slice(0,4);
            res.setHeader('Content-Type','application/json;charset=utf-8');// 注意编码
            setTimeout(() => {
                res.end(JSON.stringify(hot));
            }, 2000);
            
        });
        return
    }

    if(pathname === '/book') { // 对书的增删改查
        let id = parseInt(query.id);  // 取出的字符串
        switch (req.method) {
            case 'GET':
            if(id && id>=0){  //根据 id 查询数据 查询某一个
                read(function (books) {
                    let book = books.find((item)=>{return item.bookId==id}); // find 找出符合条件的第一项
                    //console.log(book);
                    if(!book) book={};
                    res.setHeader('Content-Type','application/json;charset=utf-8');// 注意编码
                    res.end(JSON.stringify(book));
                });

            } else { // 获取所有图书
                read(function(books){
                    res.setHeader('Content-Type','application/json;charset=utf-8');// 注意编码
                    res.end(JSON.stringify(books.reverse()));
                });
            }
            break;
            case 'POST':
            break;
            case 'PUT':
                if(id){ // 获取要修改的id
                    let str = '';
                    req.on('data',chunk=>{
                        str+=chunk;
                    });
                    req.on('end',()=>{
                        let book = json.parse(str);// book 要改为什么样子
                        read(function (books) {
                            books = books.map(item=>{
                                if(item.bookId == id){ // 找到id相同的数据  
                                    return book;
                                }
                                return item; // 其他书正常返回即可
                            });
                        });
                    });
                }
            break;
            case 'DELETE':
            //console.log(id);
            read(function (books) {
                books = books.filter((item)=>{item.bookId!==id});
            })
            break;
        }
    } 
}).listen(3000);