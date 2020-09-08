<template>
    <div class="showImgs">
      <div class="checkPhone">
        {{title}}
      </div>
      <ul class="clear-fix">
        <li v-for="(item, key) in items" :key="key">
          <img :src="imageUrl+item" alt="" @click="showBigmage(imageUrl+item)">
        </li>
      </ul>
    </div>
</template>
<script>
import {imageUrl} from '../config/index'
export default {
  name: 'showImages',
  data(){
    return {
      imageUrl: imageUrl
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '巡查照片'
    }
  },
  methods: {
    showBigmage(imgstr) {
      let imgs=[];
      imgs.push(imgstr);
      this.$createImagePreview({
        imgs: imgs,
        initialIndex: this.customIndex,
        loop: false,
        speed: 500,
        onChange: (i) => {
          this.customIndex = i
        },
        onHide: () => {}
      }, (h) => {
        return h('div', {
          class: {
            'image-preview-custom-header': true
          },
          slot: 'header'
        }, this.customIndex + 1)
      }).show()
    }
  }

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.showImgs
  padding 15px
  background #fff
  .checkPhone
    padding 14px 0
    font-size 17px
  ul
    li
      float left
      width 22.5%
      border 1px solid #eee
      margin-right 2.5%
      margin-bottom 9px
      position:relative
      height:0
      padding-top:22.5%
    :nth-child(4n+4)
        margin-right 0px
      img
        display block
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
</style>
