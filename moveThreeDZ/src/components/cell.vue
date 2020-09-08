<template>
    <div class="weui-cells" @click="myclick">
      <div :class="['weui-cell',{'jiantou':flag==true}]">
        <div class="weui-cell__bd">
          <p>{{title}}</p>
        </div>
        <div class="weui-cell__fl">{{content}}</div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'cell',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    myclick() {
      this.$emit('click')
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.weui-cells
  background-color #fff
  font-size 15px
  overflow hidden
  position relative
  .weui-cell
    padding 10px 15px
    position relative
    display flex
    align-items center
    line-height 26px
    &::before
      content: " "
      position: absolute
      left 0
      top 0
      right 0
      height 1px
      border-top 1px solid #e5e5e5
      color #e5e5e5
      transform-origin 0 0
      transform: scaleY(0.5)
      left 15px
      z-index 2
    .weui-cell__bd
      p
        width 105px
    .weui-cell__fl
      text-align left
      color #999
  .jiantou
    &::after
      content " "
      display inline-block
      height 6px
      width 6px
      border-width 2px 2px 0 0
      border-color #c8c8cd
      border-style solid
      -webkit-transform matrix(.71,.71,-.71,.71,0,0)
      transform matrix(.71,.71,-.71,.71,0,0)
      position absolute
      top 20px
      margin-top 0
      right 12px
</style>
