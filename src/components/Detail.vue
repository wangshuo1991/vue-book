<template>
  <!-- detail 要遮住这个页面 css中实现 -->
  <div class="detail">
      <Top :back="true">图书详情</Top>
      <ul>
        <li>
          <label for="bookName">图书名称</label>
          <input type="text" id="bookName" v-model="book.bookName">
        </li>
        <li>
          <label for="bookInfo">图书信息</label>
          <input type="text" id="bookInfo" v-model="book.bookInfo">
        </li>
        <li>
          <label for="bookPrice">图书价格</label>
          <input type="text" id="bookPrice" v-model.number="book.bookPrice">
        </li>
        <li>
          <button @click.stop="update">确认修改</button>
        </li>
      </ul>
  </div>
</template>

<script>
import Top from '@/base/Top.vue'
import {findOneBook,updateBook} from '../api'
export default {
  components:{Top},
  props:{},
  data(){
    return {
      book: {}
    }
  },
  watch:{},
  computed:{
    bid(){
      return this.$route.params.bid;
    }
  },
  methods:{
    async getData(){  // 通过某个id找到某一个book  主要是列表页面的跳转 
      let {data:book} = await findOneBook(this.bid);
      this.book = book;
    },
    async update(){
      await updateBook(this.bid,this.book);
      this.$route.push('/list'); // 修改完成后跳转页面
    }
  },
  created(){ // 页面已加载 根据id来加载数据
    this.getData();
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 10;

  ul {
    margin: 50px 20px 0 20px;

    li {
      line-height: 2.2;

      label {
        font-size: 16px;
        color: #888;
      }

      input {
        font-size: 16px;
        color: #333;
        height: 26px;
        line-height: 26px;
      }
    }
  }
}
</style>