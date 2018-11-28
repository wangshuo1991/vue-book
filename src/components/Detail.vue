<template>
  <!-- detail 要遮住这个页面 css中实现 -->
  <div class="detail">
      <Top :back="true">图书详情</Top>
  </div>
</template>

<script>
import Top from '@/base/Top.vue'
export default {
  components:{Top},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){ // 页面已加载 根据id来加载数据

    

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
}
</style>