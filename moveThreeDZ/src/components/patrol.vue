<template>
  <div class="box" @click="go(data)">
    <div class="box_hd">
      <span class="green">{{patrol_type[data.patrol_type]}}</span>
      <i>{{data.work_order}} {{data.patrol_time}}</i>      
    </div>
    <div  class="box_bd">
      {{data.company_name}}
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'patrol',
  props: {
    data: Object
  },
  data() {
    return {
      patrol_type: ['', '普通巡查', '双随机抽查', '工单派发']
    }
  },
  methods: {
    go(v) {
      this.$emit("onClick", v)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.box
  padding: 15px;
  border-bottom: 1px solid #EBEBEB;
  background: #fff;
  position: relative;
  &:after
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
    transform: matrix(.71,.71,-.71,.71,0,0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 15px;
  .box_hd
    display : flex;
    padding-bottom: 10px;
    span
      line-height: 24px;
      padding: 0 10px;
      margin-right: 10px;
    i
      color #A6A6A6
      line-height 24px
      font-size 13px
      font-style initial
    .green
      font-size 14px
      color #1DB667
      background rgba(29,182,94,0.1)
      border-radius 1px
    .blue
      font-size 14px
      color #33B5E5
      background rgba(51,181,229,0.1)
      border-radius 1px
    .orange
      font-size 14px
      color #D09D62
      background rgba(208,157,98,0.1);
      border-radius 1px
  .box_bd
    colo :#323232
    font-size 16px
    width 65%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
