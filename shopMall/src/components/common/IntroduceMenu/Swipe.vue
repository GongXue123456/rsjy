<template>
  <div class="introduce-swipe">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="w" v-lazy="image" />
      </van-swipe-item>

      <div class="custom-indicator borr10" slot="indicator">
        {{ current + 1 }}/{{images.length}}
      </div>
    </van-swipe>
  </div>

</template>
<script>
export default {
  props: {
    images: {
      type: Array
    }
  },
  data() {
    return {
      current: 0,
      total: 0
    }
  },
  created () {
    this.total = this.images.length;
  }
}
</script>
<style lang="scss" scoped>
.introduce-swipe{
  .custom-indicator{
        position: absolute;
    right: 0.5rem;
    bottom: 70px;
    padding: 5px 15px;
    color: #fff;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>
