<template>
      <div class="coupon" id="coupon">
        <div class="coupon_head">
          <span>优惠</span>
        </div>
        <!--优惠券-->
        <div>
          <div class="low_sell">促销</div>
          <div class="points">
            <span
              style="padding: 0px 8px;font-size: 12px;background-color: #fcf1e8;border-radius: 10px;color: #eb592a;-webkit-transform: scale(0.90);display: inline-block"
            >积 分</span>
            <span style="color: #111;-webkit-transform: scale(0.90);display: inline-block">购买可得43积分</span>
          </div>
          <van-row>
            <van-col span="12">
              <div class="low_sell">领券</div>
            </van-col>
            <van-col span="12">
              <div class="low_sell" style="text-align: right;padding-right: 10px">已有积分：1740</div>
            </van-col>
          </van-row>
          <div>
            <van-row class="coupon_all">
              <van-col span="17">
                <div
                  class="coupon_detail"
                  style="border-top-right-radius:0;border-bottom-right-radius:0;border-right: 1px dashed"
                >
                  <div class="small_font">
                    ￥
                    <span class="coupon_price">45</span> 元店铺优惠券
                  </div>
                  <div class="small_font">满46使用</div>
                  <div class="small_font">有效期 12234</div>
                  <div id="top_radius"></div>
                  <div id="bottom_radius"></div>
                </div>
              </van-col>
              <van-col span="7">
                <div
                  class="coupon_detail"
                  style="line-height: 65px;text-align: center;border-top-left-radius:0;border-bottom-left-radius:0"
                >立即领取</div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="coupon_foot" @click="closeTalion">
          <span class="finished">完成</span>
        </div>
      </div>
</template>
<script>
export default {
    name:'coupon',
    data(){
        return{
           
        }
    },
   methods: {
    closeTalion: function () {
      this.$emit('closeTalion')
    },
    }
}
</script>
<style lang="scss" scoped>

#coupon {
  height: 380px;
  position: relative;
  overflow-y: auto;
}
#coupon .coupon_head {
  text-align: center;
  font-size: 14px;
  line-height: 45px;
  height: 45px;
  width: 100%;
  z-index: 2;
}
#coupon .coupon_foot {
  text-align: center;
  font-size: 14px;
  line-height: 45px;
  height: 45px;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: 2px;
  background-color: white;
  z-index: 100;
}
#coupon .coupon_foot .finished {
  padding: 3% 42%;
  background: linear-gradient(left, #eb9c42, #e8632d);
  border-radius: 25px;
  color: white;
}
#coupon .low_sell {
  text-indent: 10px;
  color: grey;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  font-weight: bolder;
}
#coupon .points {
  padding-left: 10px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
}
#coupon .coupon_detail {
  height: 65px;
  background-color: #fcf1e8;
  color: #eb592a;
  border-radius: 5px;
  padding: 5px 0;
  position: relative;
}
#coupon .coupon_detail .coupon_price {
  font-size: 24px;
}
#coupon .coupon_detail .small_font {
  font-size: 12px;
}
#coupon .coupon_all {
  padding: 0 10px;
  margin-bottom: 20px;
}
#coupon .parm .goods_param {
  padding: 15px 5px 10px 5px;
  text-align: center;
}
</style>

