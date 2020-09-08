<template>
    <van-swipe class="swiper" :autoplay="3000" @change="onChange">
    <van-swipe-item v-for="(image, index) in items" :key="index">
    <van-image  width="100%" height="100%" fit="cover"  :src="image.img_ori"/>
    <div class="van-image-desc">图片仅供参考</div>
  </van-swipe-item>
  <div class="custom-indicator" slot="indicator">
    {{ current + 1 }}/{{items.length}}
  </div>
</van-swipe>
</template>
<script>
export default {
  name:'swiper',
   props: {
    items: {
      type: Array,
      required: true
    }
  },
    data() {
    return {
      current: 0
    }
   },
  methods:{
    onChange(index) {
      this.current = index;
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .van-swipe__track{
  height: 350px;
}
.van-image-desc{position: absolute;left: 15px;bottom: 20px;color:#fff;opacity:0.4;font-size: 12px;background:rgba(0,0,0,.4);padding: 3px 12px;border-radius:10px;}
.custom-indicator{position: absolute;right: 15px;bottom: 20px;background:rgba(0,0,0,.4);padding: 3px 12px;
border-radius:10px;color: #fff;font-size:14px;letter-spacing: 2px;}
</style>
