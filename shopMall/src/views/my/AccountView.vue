<template>
  <div class="account">
<van-nav-bar class="f18"
  title="账户余额"
  left-arrow
  @click-left="$router.push('/my')"
/>
  <van-row class="my-account account-nav p15">
      <van-col span="12">
        <div class="ml10 f14 mb10">余额</div>
        <div class="price">
          <span class="num num1" v-if="price === 'minus'">￥-4980.00</span>
        <span class="num" v-if="price === 'plus'">￥12800.00</span>
        </div>
      </van-col>
       <van-col span="12" class="">
        <div class="fr f14 recharge c000 tc" @click="$router.push('/recharge')">立即充值</div>
      </van-col>
    </van-row>
    <div class="cb"></div>
     <div class="my-list borr10 bgcfff">
      <van-cell class="c28  f15 borr10 p15"
                title="余额明细"
                is-link @click="$router.push('/budgetlist')" />
                 <van-cell class="c28 f15 borr10 p15"
                title="绑定银行卡"
                is-link />
    </div>
  </div>
</template>
<script>
export default {
  name:'account',
  data(){
    return{
      price:'minus'
    }
  }
}
</script>
<style lang="scss" scoped>
.van-nav-bar{background-color: #1F2026;.van-nav-bar__title{color:#fff}.van-icon{color: #fff}}
.account-nav{background-color: #1F2026;height: 160px;  display: flex;align-items: center;color:#BE9663;.price {font-size: 16px;color: #be9663;display: inline-block;.num {font-size: 35px;}.num1{ color: #e1613f;}}.recharge {display: inline-block;width: 83px;height: 31px;line-height: 31px;background: url("../../assets/images/chongzhi.png") no-repeat 0px 0px;background-size: cover;}}
.my-list{width:344px;margin:-20px auto;}
</style>

