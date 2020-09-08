<template>
    <div class="head" >
       <div class="left pl5" >
          <div  v-show="val!=2"  @click="myclick"><i class="cfff iconfont iconxiangzuo"></i>返回</div>
       </div>
      <div class="center tc">
          <p>{{title}}</p>
      </div>
      <div class="right" @click="oninput">{{name}}</div>
    </div>
</template>
<script>
export default {
  name: 'Nav',
  props: {
    title: {
      type: String,
      default: ''
    },
    val:{
      type:String
    },
     name: {
      type: String,
      default: ''
    },
  },
  methods: {
    myclick() {
      if(this.val==0){
         this.$router.push({
          path: "/home",
        });
      }else if(this.val==1){
         this.$router.push({
          path: "/UserList",
        });
      }else{
        this.$router.back();
      }
    },
    oninput(){
       this.$emit('myvalue')
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.head
  width 100%
  position fixed
  top 0px
  left 0px
  z-index 999
  display flex
  justify-content space-between
  align-items center
  background-color #35495e
  color #fff
  font-size 19px
  height 54px
  line-height 54px
  .right
    width 20%
    height 50px
    text-align right 
    margin-right 10px
    font-size 16px
  .center
    width 60%
  .left
    height 50px
    width 20%
    line-height 50px
    font-size 16px
    i
      font-size 17px
    img 
      width 20px
      padding 0px 0px 0px 10px 
      vertical-align sub 
  
</style>
