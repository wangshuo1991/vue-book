<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <img :src="slide" alt="" width="100%">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
          autoplay:true,
          setWrapperSize: true,
           pagination: {
            el: '.swiper-pagination'
          },
          observeParents: true,
          scrollable: false,
        },
        
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    props: ['swiperSlides']
  }
</script>