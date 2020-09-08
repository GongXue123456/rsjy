<template>
  <div class="notice">
    <van-nav-bar class="bgcfff"
                 title="消息"
                 left-arrow
                 @click-left="$router.back()" />
    <van-cell class="transparent f15 p15 pt50 mt10" title="今日消息"  />
        <van-row class="notice-list bgcfff p15">
        <van-col span="3"><img src="../../assets/images/jiedan.png"></van-col>
        <van-col span="21">
            <van-panel title="接单提醒" desc="您提交的订单客服已接单，请耐心等待！" status="19:00">
</van-panel>
        </van-col>
      </van-row>
      <van-row class="notice-list bgcfff p15">
        <van-col span="3"><img src="../../assets/images/peisong.png"></van-col>
        <van-col span="21">
            <van-panel title="配送提醒" desc="您提交的订单客服已接单，请耐心等待！" status="19:00">
</van-panel>
        </van-col>
      </van-row>
     <van-cell class="transparent f15 p15" title="历史消息"  />
        <van-row class="notice-list bgcfff p15">
        <van-col span="3"><img src="../../assets/images/pay.png"></van-col>
        <van-col span="21">
            <van-panel title="付款提醒" desc="您提交的订单客服已接单，请耐心等待！" status="19:00">
</van-panel>
        </van-col>
      </van-row>
      <van-row class="notice-list bgcfff p15">
        <van-col span="3"><img src="../../assets/images/recharge.png"></van-col>
        <van-col span="21">
            <van-panel title="充值提醒" desc="您的账户充值成功，本次充值￥10,000.00，余额 ￥15,000.00，祝您购物愉快！" status="19:00">
</van-panel>
        </van-col>
      </van-row>
  </div>
</template>
<style lang="scss" scoped>
.notice{.van-nav-bar{.van-nav-bar__title{color:#282828;font-weight: Bold;font-size: 18px}.van-icon{color: #282828}}
.notice-list{
  img{width: 32px;height: 32px;}
  .van-cell{position: relative;padding:0px;.van-cell__title{color: #282828;font-size: 16px}
.van-cell__value{color: #282828;font-size: 17px;display: contents;}.van-cell__label{color: #919191;font-size: 14px}}
.van-panel__content .content{position: absolute; right: 15px;bottom: 15px;color: #919191;font-size: 14px;}
.van-hairline--top-bottom::after {
    border-width: 0;
}
}}
</style>
