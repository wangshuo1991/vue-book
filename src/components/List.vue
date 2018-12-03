<template>
  <div>
      <Top>图书列表</Top>
      <!-- 这个元素是内容的容器 往下边滑动 滑到底部就自动加载 （也就是下拉加载） -->
      <div class="content" ref="content" @scroll.stop="pullDownLoadMore">
        <ul>
          <router-link 
          v-for="(book,index) in books" 
          :key="index"
          :to="{name:'detail',params:{bid:book.bookId}}"
          tag="li">
            <img :src="book.bookCover" alt="">
            <div class="book">
              <h4>{{book.bookName}}</h4>
              <p class="book-info">{{book.bookInfo}}</p>
              <p class="book-price">￥{{book.bookPrice}}</p>
              <button class="btn" @click.stop="removeBook(book.bookId)">删除</button>
            </div>
          </router-link>
        </ul>
        <div class="load-more" @click.stop="loadMore">
          加载更多
        </div>
      </div>
  </div>
</template>

<script>
import Top from '@/base/Top.vue'
import {removeBooks,pagination} from '../api'
export default {
  components:{Top},
  props:{},
  data(){
    return {
      books: [],
      offset: 0,     // 代表的是偏移量
      hasMore: true,  // 代表的是 是否有数据
      isLoading: false // 避免多次点击“加载更多”，如果数据返回比较慢，那么重复点击会出问题
    }
  },
  watch:{},
  computed:{
    
  },
  methods:{

    // 【注意】 getbooks接口是一下子把所有的数据取过来，如果做数据下拉加载的话，这个方法不合适
    // 要用 pagination 

    // 这里是 *** 下拉刷新 *** 
    async getData(){
      /* let {data:books} = await getBooks();
      this.books = books; */

      // ***下拉刷新 **** 的缘故 用api -- pagination
      if(this.hasMore && !this.isLoading){ // 有更多的时候 才去获取

        //正在加载 ，状态改变
        this.loading = true;
        let {data:books} = await pagination(this.offset);
        this.books = [...this.books,...books.books]; // 【注意】这里 已经获取的数组必须和最新取出的数据合并，而不是替换
        this.hasMore = books.hasMore; // 获取数据之后还要获取数据中的hasMore 可能之后就是false

        // 数据取出完毕，当前状态不加载 ，状态再次改变

        this.loading = false; // 数据正在加载的时候 不能执行再取数据，如果数据取出来之后，这个状态就是false

        this.offset = this.books.length; // 维护偏移量就是总书的长度 
      }
      
    },
    async removeBook(id){ // 删除图书
      await removeBooks(id);  
    },

    // 【加载更多】 按钮事件
    loadMore(){
      this.getData();
    },

    // 【下拉刷新】
    // *** 下拉加载 *** 
    // scrollTop + 容器的可视高度（this.$refs.content.clientHeight）+ 50 == 容器的全部高度 (this.$refs.content.scrollHeight)
    //
    pullDownLoadMore () {

      // 【节流】 这里一旦滚动就会出现很多次的不必要的重新获取，浪费性能，这里用到节流
      // 【节流】 -> 设置 settimeout 进入开一个定时器，下次触发时将上一次的定时器清除掉 
      //  settimeout 
      // 【注意】 这个符合条件
      clearTimeout(this.timer);
      this.timer = setTimeout(() => { 
        let {scrollHeight,clientHeight,scrollTop} = this.$refs.content; 
        if(clientHeight+scrollTop+50>scrollHeight){
          this.getData(); // 下拉 符合上述条件后 获取数据
        }
      }, 10);
      
    }
      

  },
  created(){
    this.getData();  // 获取全部图书
  },
  mounted(){

  }
}
</script>
<style lang="scss" scoped>
.content {
  position: fixed;
  top: 50px;
  bottom: 50px;

  ul {
    padding: 0 20px;
    overflow: hidden;

    li{
      display: flex;
      padding: 8px 0;

      img {
        width: 105px;
        height: 140px;
      }

      .book {
        flex: 1;
        padding-left: 20px;
        overflow: hidden;
        position: relative;

        h4 {
          margin-top: 15px;
        }

        .book-info {
          width: 100%;
          margin-top: 15px;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .book-price {
          position: absolute;
          bottom: 15px;
          color: #f40;
          font-weight: 600;
        }

        .btn {
          border: 1px solid #d7d7d7;
          padding: 5px 10px;
          position: absolute;
          right: 20px;
          bottom: 12px;
        }
      }
    }
  }

  .load-more {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #888;
    background: #f0f0f0;
  }
}
</style>