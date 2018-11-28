<template>
  <div class="top">
      <slot></slot> 
      <i class="iconfont icon-fanhui" v-if="back" @click="goback"></i>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
      back: {
          type: Boolean,
          default: false
      }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
      goback(){
          this.$router.go(-1);
      }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.top {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    position: fixed;
    background: rgb(36, 135, 235);
    top: 0;
    left: 0;

    i {
        position: absolute;
        left: 20px;
        font-style: 20px;
    }
}
</style>