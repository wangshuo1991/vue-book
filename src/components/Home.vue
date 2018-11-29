<template>
  <div class="home">
      <Top>爱文书城</Top>
      <div class="content">
          <!-- 这里用 v-if v-else 实现loading 注意template是没有意义的 -->
          <div v-if="loading" class="loading"></div>
          <!-- 为了不增加标签 用template包裹起来内容 -->
          <template v-else>
            <MSwiper :swiperSlides="sliders"></MSwiper>
            <div class="container">
                <h3 class="hot-book-title">热门图书</h3>
                <div class="book-list">
                    <ul>
                        <li v-for="(book,index) in hotBooks" :key="index">
                            <img :src="book.bookCover" alt="" width="100%">
                            <h4>{{book.bookName}}</h4>
                            <p class="book-info">{{book.bookInfo}}</p>
                            <p class="book-price">￥<span>{{book.bookPrice}}</span></p>  
                        </li>
                    </ul>
                </div>
            </div>  
          </template>
          
      </div>      
  </div>
</template>

<script>

import Top from '@/base/Top.vue'
import MSwiper from '@/base/MSwiper.vue'

import {getAll} from '../api'
export default {
  components:{Top,MSwiper},
  props:{},
  data(){
    return {
        sliders: [],
        hotBooks: [],
        loading: true
    }
  },
  watch:{},
  computed:{},
  created(){
      /* this.getSlide(); // 获取轮播图
      this.getHot(); // 获取热门图书  这两个方法就不用了 直接用getall代替*/
      this.getData();
  },
  methods: {
    /* async getSlide () { // 异步请求 api - 轮播图    
        let {data:sliders} = await getSliders(); // 发送请求   {data:sliders} 这样写属性名必须和获取的内容的属性名一致 {data:sliders} = {data: [1,2,3,4,5]}  sliders = [1,2,3,4,5]
        this.sliders = sliders;
    },
    async getHot () {  // 异步请求 api - 热门图书
        let {data:hot} = await getHotBooks();
        this.hotBooks = hot;
    } */

    async getData() {  // ---- 主要是为了实现loading效果 
        let [sliders,hotbooks] = await getAll(); // 返回的数组 [sliders,hotBooks]
        //console.log([sliders,hotbooks]); //{data: Array}
        this.sliders = sliders.data;
        this.hotBooks = hotbooks.data;

        // 到这里 轮播图和热门图书已经获取完成了
        
        this.loading = false;

    }
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
    .content {
        background: #f1f1f1;

        .loading {
           width: 160px;
           height: 120px;
           background: url('./timg.gif') no-repeat center center / 160px 120px; 
           position: fixed;
           top: 50%;
           left: 50%;
           transform: translate(-50%,-50%);
        }

        .container {
            padding: 20px;
            width: 100%;
            box-sizing: border-box;
            background: #fff;

            .hot-book-title {
                font-size: 24px;
                color: #333;
                font-weight: bold;
            }

            .book-list {
                width: 100%;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    
                    li {
                        width: 50%;
                        padding: 10px;
                        box-sizing: border-box;

                        .book-info {
                            font-size: 14px;
                            color: #888;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        .book-price {
                            color: #f40;

                            span {
                                font-weight: bold;
                            }
                        }
                    }
                }
                
            }
        }
    }
</style>