<template>
  <div class="my">
    <van-row class="my-nav">
      <van-col span="12">
        <img src="../../assets/images/touxiang.png">
        <div v-if="c_name=='登录'" class="name ml20 cfff" @click="toLogin()">{{c_name}}</div>
         <div v-else class="name ml20 cfff">{{c_name}}</div>
      </van-col>
      <van-col span="12"
               class="tr">
               <span v-if="c_name!='登录'" class="ml10 f14 cfff" @click="loginout()">退出登录</span>
               <span v-if="user.c_type==5" class="ml10 f14 cfff" @click.stop="$router.push('/login?id=0')">代登录</span>
        <!-- <div class="f14 edit cfff">设置昵称</div> -->
      </van-col>
    </van-row>
    <!-- <van-row class="my-wallet borr10 ">
      <van-col span="24">
        <img src="../../assets/images/qianbao.png">
        <div class="price ml10 cfff f16">我的账户:<span class="num num1" v-if="price === 'minus'">￥-4980.00</span>
        <span class="num" v-if="price === 'plus'">￥12800.00</span></div>
        <div class="fr f14 recharge c000 tc" @click="$router.push('/account')">立即充值</div>
      </van-col>
    </van-row> -->
    <div class="bgcfff my-order pb10">
      <van-cell class="c28 mt20 f15"
                title="我的订单"
                 />
                 <!-- is-link
                 @click.stop="$router.push('/myorder')"
                value="查看全部订单" -->
      <van-row class="tc c91 f15">
        
        <van-col span="8"><img src="../../assets/images/fukuan.png"  @click.stop="$router.push('/myorder?id=0')"><br />待付款</van-col>
       
        <van-col span="8"><img src="../../assets/images/wancheng.png"  @click.stop="$router.push('/myorder?id=1')"><br />已付款</van-col>
         <van-col span="8"><img src="../../assets/images/shouhuo.png" @click.stop="$router.push('/myorder?id=2')"><br />全部订单</van-col>
      </van-row>
      <div class="cb"></div>
      <div v-if="orderList.o_send_state==1" class="distribute c91 borr10">
        <p class="f12">订单配送信息</p>
        <van-card  class="transparent"
                  desc="您的商品已从白家站点送出，尽快进行配送"
                  title="待发货"
                  thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" />
       </div>
        <div v-else-if="orderList.o_send_state==2" class="distribute c91 borr10">
        <p class="f12">订单配送信息</p>
        <van-card  class="transparent"
                  desc="您的商品已从白家站点送出，尽快进行配送"
                  title="配送中"
                  thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" />
       </div>
        <div  v-else-if="orderList.o_send_state==3" class="distribute c91 borr10">
        <p class="f12">订单配送信息</p>
         <van-card class="transparent"
                  desc="您的商品已经完成，请尽快确认收货"
                  title="已完成"
                  thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" />
       </div>
       
       
     
    </div>
    <div class="bgcfff my-service pb10">
      <van-cell class="c28 mt20 f15"
                title="我的服务"
                />
      <van-row class="tc c91 f15">
        <van-col span="8" class="mb15"><a href="tel:19130635440"><img src="../../assets/images/kefu.png"><br />联系客服</a></van-col>
        <van-col span="8" class="mb15"><a><img src="../../assets/images/dizhi.png" @click="toAddress()"><br />地址管理</a></van-col>
        <van-col v-if="company_code" span="8" class="mb15"><a><img src="../../assets/images/erweima.png" @click="toCompany"><br />企业资质</a></van-col>
          <!-- <van-col span="8" class="mb15"><a><img src="../../assets/images/xiaoxi.png" ><br />消息</a></van-col>
        <van-col span="8" class="mb15"><a><img src="../../assets/images/zhanghu.png"><br />我的账户</a></van-col> -->
      </van-row>

    </div>
     <p class="tc genge f15">————&nbsp;&nbsp;<span class="c91">猜你喜欢</span>&nbsp;&nbsp;————</p>
      <Like></Like>
  </div>
</template>
<script>
import Like from '../../components/common/Cart/like'
import {local} from '../../until/data'
import {getOrderList,loginOut} from '@/api/index'
export default {
  name:'my',
  components:{Like},
  data(){
    return{
      price:'plus',
      c_name: '登录',
      orderList:[],
      user:'',
      company_code:''
    }
  },
  created () {
    this.user = local.get('userinfo');
    this.company_code= local.get('userinfo').company_code
    if (this.user) {
      this.c_name = this.user.c_name
    } else {
      this.c_name = '登录';
      this.toLogin()
    }
    this.getData()
  },
  methods:{
    getData() {
      let data = {
        o_customer_id:local.get('userinfo').c_id,
        pager_offset: 1,
        o_pay_state: '',
      };
      getOrderList(data).then(response => {
        if (response.code == 200) {
            this.orderList = response.data;
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    toLogin(){
        this.$router.push({
        name: "LoginView",
      });
    },
    loginout(){
       let data = {
        loginname:local.get('userinfo').c_loginname,
      };
      loginOut(data).then(response => {
        if (response.code == 477) {
            this.c_name = '登录';
             this.$toast("退出登录成功");
              window.localStorage.clear();
            local.set("userinfo", response.data);
          this.$cookies.set("token", '');
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    toAddress(){
        local.set('backto','a')
       this.$router.push({
        name: "AddressListView",
         query: {
         id:1
      }
      });

    },
    toCompany(){
        window.location.href = 'http://sx.rsjykj.com.cn:9992/#/view2scan?company_code='+this.company_code
    }
  }
  
}
</script>

<style lang="scss" scoped>
.my{margin-bottom: 60px;.genge{color: rgba($color: #000000, $alpha: 0.12);padding: 20px 0 15px 0px;}}
.my-nav {
  min-height: 140px;
    /* background: url("../../assets/images/my_bg.png") no-repeat 0px 0px; */
  background: url("../../assets/images/jingdong-bg.png") no-repeat 0px 0px;
  background-size: cover;
  position: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
  img {
    width: 52px;
    height: 52px;
    vertical-align: middle;
  }
  .name {
    font-size: 19px;
    display: inline-block;
  }
  .edit {
    opacity: 0.6;
  }
}
.my-wallet {
  width: 344px;
  height: 63px;
  background-color: #42434b;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 0px 15px;
  margin-top: -20px;
  img {
    width: 26px;
    height: 26px;
    vertical-align: middle;
  }
  .price {
    font-size: 16px;
    color: #be9663;
    display: inline-block;
    .num {
      font-size: 21px;
    }
    .num1{ color: #e1613f;}
  }
  .recharge {
    display: inline-block;
    width: 83px;
    height: 31px;
    line-height: 31px;
    background: url("../../assets/images/chongzhi.png") no-repeat 0px 0px;
    background-size: cover;
  }
}
.my-order,.my-service {
  .van-cell__title {
    font-weight: bold;
  }
  img {
    width: 35px;
    height: 35px;
  }
  .distribute {
    background-color: #f5f5f5;
    width: 323px;
    margin: 15px auto 0px;
    padding: 8px 10px;
  }
  .van-card{
    padding: 0px;
    .van-card__title{
          max-height: 40px;
      font-size: 15px;
      color: #407EB3;
    }
.van-card__thumb{
width: 35px;
height: 35px;
  }
  .van-card__content{
    min-height: initial;
    .van-card__desc {
      font-size: 13px;
      color: #919191;
      max-height:initial;
    }
  }

  }

}
</style>

