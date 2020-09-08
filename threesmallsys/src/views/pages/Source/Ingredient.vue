<template>
  <el-container class="recorddetail container">
    <el-header class="box add bb">
         <h5  class="mb10"><span class="lines"></span>食材溯源</h5>
        <div><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main>
    <div class="box mt20 f14">
        <div class="tl c333 flex" >
           <img v-if="list.product_logo==='undefined'||list.product_logo===''||list.product_logo==='null'"  src="../../../assets/image/source.png"  />
            <img v-else class="el-image" :src="user.qyurl+list.product_logo">
            <div class="ml15"><p class="title mb20">{{list.product_name}}</p><p class="f16">追溯码：{{list.foodsource_code}}</p></div>
            </div>
     </div>
       <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">产品信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品名称：</span><span class="c333">{{list.product_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">种类：</span><span class="c333">{{list.category_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品规格：</span><span class="c333">{{list.product_spec}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">品牌：</span><span class="c333">{{list.product_brand}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">来源信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">供应商：</span><span class="c333">{{foodSource.supplier_name}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">供应商地址：</span><span class="c333">{{foodSource.supplier_address}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">供应商电话：</span><span class="c333">{{foodSource.suppliertel}}</span>
        </el-col>
     </el-row>
      <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">订单信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">订单编号：</span><span class="c333">{{list.ordercode}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">下单时间：</span><span class="c333">{{list.ordertime}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配送时间：</span><span class="c333">{{list.deliverytime}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配送站点：</span><span class="c333">{{list.distributionstation}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配送厨师：</span><span class="c333">{{list.distributionname}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">采购信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">采购时间：</span><span class="c333">{{foodSource.sell_time}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">采购人员：</span><span class="c333">{{foodSource.sell_person}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">联系电话：</span><span class="c333">{{foodSource.tel}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">分拣信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">分拣人员：</span><span class="c333">{{list.sortingpersonnel}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">联系电话：</span><span class="c333">{{list.tel1}}</span>
        </el-col>
     </el-row>
      <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">配送信息</el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">配送地址：</span><span class="c333">{{list.deliveryaddress}}</span>
        </el-col>
     </el-row>
     
      <el-row class="box mt20  f14">
      <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">检验信息</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl" v-for="fit in fits" :key="fit">
    <el-image
      :src="user.qyurl+list.product_logo"
       :preview-src-list="[user.qyurl+list.product_logo]"
      :fit="fit"></el-image>
      <p class="demonstration tc p15">{{ fit }}</p>
  </div>
      </el-col>
     </el-row>
    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local} from '../../../util/util'
export default {
  data () {
    return {
       page: {
      //  company_code:'',
       foodsourcedetail_code:''

      },
      activeName: 'first',
       fits: ['检验报告'],
        url: '',
      currentPage: 1,
      total: 0,
      code:"",
       list: '',
       list1:'',
        user:'',
        company:'',
        foodSource:''
    }
  },
     created () {
        this.user = local.get('user');
            this.page.foodsourcedetail_code=this.$route.query.code;
     this.init(this.page)
  },
  methods: {
     init (params) {
      axios.get('/api/foodsource/fsdetail', params).then((v) => {
       this.list=v.foodSourceDetail;
       this.company=v.company;
       this.foodSource=v.foodSource;
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.recorddetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
.flex{display: flex;align-items: center;
.title{font-size: 22px;}}
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recorddetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}

}

</style>
