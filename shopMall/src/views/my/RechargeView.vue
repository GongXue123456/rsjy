<template>
  <div class="recharge bgcfff">
    <van-nav-bar class="bgcfff"
  title="充值"
  left-arrow
  @click-left="$router.back()"
/>
<div class="pt50">
   <van-cell class="c91  f14 p15"
                title="请选择充值金额(单位：元)" />
                <van-row gutter="20" class="tc p15" >
  <van-col span="8" ><div class="general_border general_color">500</div></van-col>
    <van-col span="8" ><div class="general_border general_color">1000</div></van-col>
      <van-col span="8" ><div class="general_border active">2000</div></van-col>
        <van-col span="8" ><div class="general_border general_color">5000</div></van-col>
          <van-col span="8" ><div class="general_border general_color">10000</div></van-col>
            <van-col span="8" ><div class="general_border general_color">其他金额</div></van-col>
</van-row>
  <van-cell class="c91  f14 p15"
                title="应付金额" value="￥1000.00" />
                
</div>
<div class="w tc"><van-button class="general_bgc cfff ">立即充值</van-button></div>
  </div>
</template>
<style lang="scss" scoped>
.recharge{height: 100vh;.van-nav-bar{.van-nav-bar__title{color:#282828;font-weight: Bold;font-size: 18px}.van-icon{color: #282828}}
.van-col{margin-bottom: 10px;div{padding: 15px 0px;border-radius: 4px}} 
.active{color: #fff;background-color: #45B7FF}
.van-cell__value{color: #45B7FF}
.van-button{width: 344px;margin: auto;border-radius: 20px;}}

</style>

