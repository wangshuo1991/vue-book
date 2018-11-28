<template>
  <div>
      <Top>图书列表</Top>
      <div class="content">
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
      </div>
  </div>
</template>

<script>
import Top from '@/base/Top.vue'
import {getBooks,removeBooks} from '../api'
export default {
  components:{Top},
  props:{},
  data(){
    return {
      books: []
    }
  },
  watch:{},
  computed:{},
  methods:{
    async getData(){
      let {data:books} = await getBooks();
      this.books = books;
    },
    async removeBook(id){ // 删除图书
      await removeBooks(id);  
    }
  },
  created(){
    this.getData();// 获取全部图书
  },
  mounted(){}
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
}
</style>