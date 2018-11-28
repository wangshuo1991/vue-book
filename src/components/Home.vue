<template>
  <div class="home">
      <Top>爱文书城</Top>
      <div class="content">
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
      </div>      
  </div>
</template>

<script>

import Top from '@/base/Top.vue'
import MSwiper from '@/base/MSwiper.vue'

import {getSliders,getHotBooks} from '../api'
export default {
  components:{Top,MSwiper},
  props:{},
  data(){
    return {
        sliders: [],
        hotBooks: []
    }
  },
  watch:{},
  computed:{},
  created(){
      this.getSlide(); // 获取轮播图
      this.getHot(); // 获取热门图书
  },
  methods: {
    async getSlide () { // 异步请求 api - 轮播图    
        let {data:sliders} = await getSliders(); // 发送请求   {data:sliders} 这样写属性名必须和获取的内容的属性名一致 {data:sliders} = {data: [1,2,3,4,5]}  sliders = [1,2,3,4,5]
        this.sliders = sliders;
    },
    async getHot () {  // 异步请求 api - 热门图书
        let {data:hot} = await getHotBooks();
        this.hotBooks = hot;
    }
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
    .content {
        background: #f1f1f1;

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