<template>
    <!-- 添加loading组件 同时也可以用一些css3的效果 -->
  <div class="load-container">
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.load-container {
    width: 160px;
    height: 120px;
    background: url('./timg.gif') no-repeat center center / 160px 120px; 
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 50;
    transform: translate(-50%,-50%);
}
</style>