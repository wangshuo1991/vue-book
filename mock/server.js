let http = require('http');
let fs = require('fs');
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
/* read(function (books) {
    console.log(books);
}); */
http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    if(req.method == "OPTIONS") return res.end(); /* 让 options请求 快速返回 */
    let {pathname,query} = url.parse(req.url,true); // true 把query转换成对象
    if(pathname === '/sliders'){
        res.setHeader('Content-Type','application/json;charset=utf-8');
        res.end(JSON.stringify(sliders));
    }

    if(pathname === '/hot'){
        read(function (books) {
            let hot = books.reverse().slice(0,4);
            res.setHeader('Content-Type','application/json;charset=utf-8');// 注意编码
            res.end(JSON.stringify(hot));
        });
        return
    }

    if(pathname === '/book') { // 对书的增删改查
        let id = parseInt(query.id);  // 取出的字符串
        switch (req.method) {
            case 'GET':
            if(id){  //根据 id 查询数据
                read(function (books) {
                    let book = books.filter((item)=>{return item.bookId==id});
                    console.log(book);
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