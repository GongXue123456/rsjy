<template>
  <div>
    <Nav  title="备案详情" :val="id1" />
    <div class="information bgcfff">
     <van-form >  
      <van-tabs  v-model="activeName" :class="form.filing_state===2&&id1!=1?'mb50':(form.filing_state===3&&(form.state===1||form.state===4) ? 'mb100' : 'mb0')">
        <van-tab title="证照信息" name="c">
          <div class="card1 certificates p15 f16 pr mb10">
           <div v-for="(item,index) in form.accessoryList" :key="index" >
             <van-image v-if="item.url"  fit="cover" :src="imageUrl+item.url" @click="open(imageUrl+item.url)"/>
             <img v-else :src="img">
             <div class="mt5 mb20 p10 bgcfff f14 tc">{{item.name}}</div>
           </div>
        </div>
       </van-tab>
      
        <van-tab title="经营信息" name="b">
         <div class="card1  p15 f16 pr">
          <van-field  readonly v-if="form.companytag_code==='1001574645421581111111101'||form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'" v-model="form.record_code"  label="备案证号"  input-align="right"  />
          <van-field readonly v-if="form.companytag_code==='1001574645421581111111103'||form.companytag_code==='1001574645421581111111105'" v-model="form.credit_code"  label="统一社会信用代码" placeholder="请输入统一社会信用代码" input-align="right" />
          <van-field readonly v-if="form.companytag_code==='1001574645421581111111103'||form.companytag_code==='1001574645421581111111105'" v-model="form.record_code"  label="食品经营许可证号" placeholder="请输入食品经营许可证号" input-align="right" />
          <van-field readonly v-if="form.companytag_code==='1001574645421581111111101'"  clickable label="加工形式" type="textarea" rows="1" autosize v-model="options1_1[1]" placeholder="请选择加工形式"  input-align="right"  />
           <van-field readonly v-if="form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'"   label="主营项目" type="textarea" rows="1" autosize v-model="options1_1[1]"  input-align="right" />
           <van-field readonly v-if="form.companytag_code==='1001574645421581111111101'"  clickable label="加工类别" type="textarea" rows="1" autosize v-model="options2_1[1]" placeholder="请选择加工类别"  input-align="right" />
           <van-field readonly v-if="form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'"   label="兼营项目" type="textarea" rows="1" autosize v-model="options2_1[1]"  input-align="right" />
           <van-field readonly v-if="form.companytag_code==='1001574645421581111111105'||form.companytag_code==='1001574645421581111111103'"   label="经营范围" type="textarea" rows="1" autosize  v-model="options1_1[1]"  input-align="right" />
           <van-field readonly  label="发证日期"  v-model="form.issue_time"  input-align="right" />
           <van-field readonly  label="有效期至"  v-model="form.unuseful_time"  input-align="right" />
          <van-field readonly v-model="form.place_area"  label="营业面积(㎡)"  input-align="right" />
          <van-field readonly v-model="form.employ_num"  label="从业人数"  input-align="right"  />

        </div>
        <div class="card1 p15 pr" style="margin-top:-30px">
          <div class="cardInfo power bgcfff p15 f16" >
            <p class="f16">人员信息</p>
             <div class="bgf5 mt15" v-for="(item, index) in formList" :key="index">
              <van-field readonly v-model="item.employ_name" name="姓名" label="姓名"  input-align="right"  />
              <van-field readonly clickable label="健康证有效期"  v-model="item.user_health_datedue" input-align="right" />
              <van-field name="uploader" label="健康证" input-align="right">
                <template #input><van-image v-if="item.employ_health_url" width="80" height="80" fit="cover" :src="item.employ_health_url" @click="open(item.employ_health_url)"/> <img v-else :src="img"> 
                 </template>
          
              </van-field>
             </div>
          </div>
        </div>
        </van-tab>

       <van-tab title="基础信息" name="a">
         <div class="card p15 pr">
          <img class="pa" v-if="form.filing_state===2" src="../../assets/img/waitExamine.png" alt />
          <span v-else-if="form.filing_state===3">
            <img class="pa" v-if="form.state===1" src="../../assets/img/guidang.png" alt />
            <img class="pa" v-else-if="form.state===2" src="../../assets/img/guoqi.png" alt />
            <img class="pa" v-else-if="form.state===3" src="../../assets/img/shixiao.png" alt />
            <img class="pa" v-else-if="form.state===4" src="../../assets/img/guidang.png" alt />
          </span>
          
          <img class="pa" v-else-if="form.filing_state===4" src="../../assets/img/bohui.png" alt />
          <div class="cardInfo  f16">
            <p class="f15">证照类型</p>
            <p class="pt20"><span v-if="form.companytype_code==='1001574645421581000000001'">食品加工</span><span v-else-if="form.companytype_code==='1001574645421581000000002'">食品流通</span><span v-else-if="form.companytype_code==='1001574645421581000000003'">食品餐饮</span></p>
            <p class="pt20"><span v-if="form.companytag_code==='1001574645421581111111101'">四川省小作坊备案证</span><span v-else-if="form.companytag_code==='1001574645421581111111102'">四川省小经营店备案证（流通）</span><span v-else-if="form.companytag_code==='1001574645421581111111103'">食品经营许可（餐饮）</span><span v-else-if="form.companytag_code==='1001574645421581111111104'">四川省小经营店备案证（餐饮）</span><span v-else-if="form.companytag_code==='1001574645421581111111105'">食品经营许可证（流通）</span></p>
            <p class="pt20">{{form.business_form}}</p>
          </div>
        </div>
        <div class="card2 p15 pr" v-if="form.filing_state===4" >
          <div class="cardInfo  f16">
            <p class="f15">驳回原因</p>
            <p class="pt15">{{form.unpass_cause}}</p>
          </div>
        </div>
        <div class="card p15 pr" >
          <div class="cardInfo  f16">
            <p class="f15">责任落实</p>
             <van-cell title="所属市场监管所" :value="form.department_name!=null?form.department_name:'无'" />
             <van-cell title="所属村" :value="form.region_name!=null?form.region_name:'无'" />
             <van-cell title="监管人员" :value="form.user_name_manage!=null?form.user_name_manage:'无'" />
             <van-cell title="网格信息员" :value="form.user_name_info!=null?form.user_name_info:'无'" />
          </div>
        </div>
         <div class="card1  p15 pb30 f16 pr">
          <van-field  v-model="form.company_name" readonly label="小作坊名称"  input-align="right" />
          <van-field  v-model="form.operator" readonly label="经营者姓名" input-align="right"/>
          <van-field  v-model="form.idcard" readonly label="身份证号"  input-align="right" />
          <van-field  v-model="form.mobilephone" readonly label="联系电话"  input-align="right"/>
          <van-field readonly clickable label="小作坊所在地" type="textarea" rows="1" autosize v-model="form.place_operate"  input-align="right" />
          <van-field  v-model="form.address" readonly label="详细地址" type="textarea" rows="1" autosize  input-align="right" />
        </div>
       </van-tab>

      </van-tabs>
      <div  class="footer bgcfff w" :class="id1!=1?'p15':''"> 
        <van-row gutter="20">
          <van-col v-if="form.filing_state===2||form.filing_state===4&&id1!=1" span="24"><van-button   block type="primary" @click="backChange" class="changeExamine"> 修改备案 </van-button></van-col>
          <van-col v-if="form.filing_state===3&&form.state===3" span="24"><van-button   block type="primary" @click="backChange" class="changeExamine"> 重新备案 </van-button></van-col>
          <van-col v-if="form.filing_state===3&&(form.state===1||form.state===4)" span="24"><van-button   block type="primary" @click="administration" class="administration"> 管理从业人员 </van-button></van-col>
          <van-col  v-if="form.filing_state===3&&(form.state===1||form.state===4)" span="12"><van-button   block type="primary" @click="update"> 变更备案 </van-button></van-col>
          <van-col  v-if="form.filing_state===3&&(form.state===1||form.state===4)" span="12"><van-button v-show="loadButton" block type="default" @click="logout(form.company_code)"> 注销备案 </van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
        </van-row>
       </div>
     </van-form>
    </div>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import {imageUrl} from '../../config/index'
import axios from '../../axios/index.js';
import { ImagePreview } from 'vant';
export default {
  components: {
    Nav
  },
  data() {
    return {
      id1:'',
      id:'1',
      loadButton:true,
      name:'',
      imageUrl: imageUrl,
      img:require('../../assets/img/moren.png'),
      items:[],
      activeName: 'a',
      showPicker: false,
       form:{
        company_code:'',
        companytag_code:'',
        accessoryList:[],
        filing_state:'',
        place_operate:'',
        province:'',
        city:'',
        area:'',
        vill:'',
        town:'',
      },
       formList:[],
    }
  },
    created() {
     this.form.company_code=this.$route.query.id
     this.id1=String(this.$route.query.id1);
     this.getDate()
  },
  methods:{
    getDate(){
      if(this.form.company_code){
        axios.get('app/company/drafts', {company_code:this.form.company_code}).then(v => {
          console.log(v.data)
        this.company_code=v.data.company_code
        this.form.companytag_code=v.data.companytag_code
        this.form=v.data;
        this.form.accessoryList=v.data.accessoryReturnList;
        this.form.province=v.data.province!=null?v.data.province:'';
        this.form.city=v.data.city!=null?v.data.city:'';
        this.form.area=v.data.area!=null?v.data.area:'';
        this.form.town=v.data.town!=null?v.data.town:'';
        this.form.vill=v.data.vill!=null?v.data.vill:'';
        this.form.place_operate=this.form.province+this.form.city+this.form.area+this.form.town+this.form.vill;
        console.log(this.form.place_operate)
             if(this.form.companytag_code==='1001574645421581111111101'){
              this.options1_1=['',v.data.produce_form]
            this.options2_1=['',v.data.producetype_codes]
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
             this.options1_1=['',v.data.main_subject]
            this.options2_1=['',v.data.sub_subject]
            }else if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){
              this.options1_1=['',v.data.business_range]
            }
         v.data.companyEmployReturnList.forEach(item=>{
          this.formList.push({
             user_health_datedue:item.user_health_datedue,
             employ_health_url:this.imageUrl+item.employ_health_url,
             employ_name:item.employ_name
             }); 
       })
      })
      }
     
       
    },
    open(data){
          ImagePreview({images:[data]})
     },
      update() {
        this.$router.push({
          path: "/update",
          query: {
            companytag_code:this.form.companytag_code,
            company_code:this.form.company_code,
          }
        });
    },
    administration(){
      this.$router.push({
        path:'/administration',
        query:{
          company_code:this.form.company_code
        }
      })
    },
    backChange(){
      this.$router.push({
        path:'/bodyType',
        query:{
          company_code:this.form.company_code,
        }
      })
    },
    logout(index){
     this.$dialog.confirm({
  title: '',
  message: '确定注销?',
})
  .then(() => {
    axios.post('/app/company/examine', {company_code:index,examine:'1'}).then(() => {
               this.$router.back()
       })
  })
  .catch(() => {
    // on cancel
  });
  },
  }
}
</script>
<style lang="less" scoped>
.information {
  width: 100%;
  height: 100%;
  padding-top: 54px;
  box-sizing: border-box;
  /deep/ .van-tabs{
     
    .van-tab{font-size: 17px;}
    .van-tab--active{color: #1DB667;font-weight:bold;}
    .van-tabs__line{display: none;}
    .van-cell{font-size:16px;
    .van-cell__value{color: #426EB8;}}
    .van-tabs__wrap{position: fixed;width: 100%;z-index: 999;height: 70px;}
    .van-tabs__content{padding-top: 70px;}
    .van-field__label{width: 3.5rem;}
    .van-field__error-message{text-align: right;}
  
    .certificates .van-image,.certificates img{width: 100%;  background-color: #fff; height:4.7rem;margin: 0;
    .van-image__img{border-radius: 10px;}}
  }

  .card {background: #f5f5f5;margin: 15px;border-radius: 8px;
    .van-cell{background-color: transparent;padding:10px 0px}
    img {position:absolute;top: 10px;left:250px;width: 75px;height:75px;}
    .cardInfo { border-radius:5px;p:nth-child(1) {  color: #9a9a9a; }}
  }
  .card2 {background: #F9F3EA;margin: 15px;border-radius: 5px;
    .cardInfo {p:nth-child(1) {  color: #9a9a9a; }p:nth-child(2) {  color: #A4865C; }}
  }
  .power{
    margin-bottom:30px;border-radius:8px;
    .van-cell{background-color: #f5f5f5;margin-bottom: 0 !important;}
  }
  .card1 {
    background: #f5f5f5;
    .van-cell{margin-bottom: 15px;}
    .van-button--default{.van-button__content{color: #1DB667;}}
     img {top: 10px;right: 20px;width: 75px;height:75px;}
  }
  .footer{
    position: fixed;bottom: 0px;left: 0px;background: #f5f5f5 !important;
    span{
    font-size: 18px;
    }
    }

.van-button--default{color: #fff;
    background-color: #C7C7C7;
    border: 0.026667rem solid #C7C7C7;
}
}
/deep/ .van-field {
  border-radius: 8px;
  .van-field__label{width: 3.5rem;}
   .van-uploader{
    border: 1px solid #F5F5F5;
  }
  .van-field__value{
    textarea{overflow: hidden;}
  }
}
.van-button::before {
  padding: 1px;
}
.changeExamine{
 span{
   font-size: 18px;
 }
}
.administration{
  margin-bottom: 10px;
}
</style>