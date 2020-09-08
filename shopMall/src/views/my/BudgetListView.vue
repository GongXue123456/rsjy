<template>
  <div class="budgetlist">
    <van-row class="bgcfff">
      <van-col span="3" >
        <div style="height:50px;line-height: 55px;text-align: center;font-size: 16px">
          <div class="iconfont icon-arrowleft" @click="$router.back()"></div>
        </div>
      </van-col>
      <van-col span="18">
          <van-dropdown-menu>
  <van-dropdown-item v-model="value1" :options="option1" />
</van-dropdown-menu>
      </van-col>
    </van-row>
  <div class="pr">
      <van-panel title="微信充值" desc="2019-07-22  15:06" status="+1000.00">
    <div class="content">余额：￥4980.00</div>
    </van-panel>
  </div>
   <div class="pr">
      <van-panel title="微信充值" desc="2019-07-22  15:06" status="+1000.00">
    <div class="content">余额：￥4980.00</div>
    </van-panel> 
    <div class="pr minus">
      <van-panel title="微信充值" desc="2019-07-22  15:06" status="-1000.00">
    <div class="content">余额：￥4980.00</div>
    </van-panel>
  </div>
  </div>

  </div>
</template>
<script>
export default {
   data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '收支明细', value: 0 },
        { text: '收入明细', value: 1 },
        { text: '支出明细', value: 2 }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
 .van-dropdown-menu__title::after{top: 0px !important;right: -20px !important;border: 8px solid !important;}
.van-cell{padding: 15px;position: relative;.van-cell__title{color: #282828;font-size: 16px}
.van-cell__value{color: #282828;font-size: 17px}.van-cell__label{color: #919191;font-size: 14px;margin-top: 8px}}
.van-panel__content .content{position: absolute; right: 15px;bottom: 15px;color: #919191;font-size: 14px;}
.minus .van-cell__value{color: #45B7FF;}
</style>

