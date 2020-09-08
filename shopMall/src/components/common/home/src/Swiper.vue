<template>
    <van-swipe class="swiper" :autoplay="3000">
    <van-swipe-item v-for="(image, index) in images" :key="index">
    <img v-lazy="image.n_url" />
  </van-swipe-item>
</van-swipe>
</template>
<script>
import {getHomeSwiper } from "../../../../api/index";
export default {
  name:'swiper',
    data() {
    return {
      images: []
    }
   },
    created() {
     this.getImgList();
  },
  methods:{
     getImgList(){
              getHomeSwiper().then(response=>{
                  this.images = response.data
              })
          },
  }
}
</script>
<style lang="scss" scoped>

</style>
