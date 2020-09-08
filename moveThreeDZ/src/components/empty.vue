<template>
   <div class="nodata" >
          <img style="width:70%" src="../assets/img/no-data.png">
          <p>{{title}}</p>
      </div>
</template>
<script>
export default {
  name: 'empty',
  props: {
    title: {
      type: String,
      default: ''
    },
  },
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.nodata
  width 100%
  text-align:center
  display flex
  flex-direction column
  align-items center
  overflow hidden
  justify-content center
  margin-top: 30%;
  img
    width 70%
  p
    font-size 16px
  
</style>
