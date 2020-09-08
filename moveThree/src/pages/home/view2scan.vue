
<template>
  <div>
    <Nav title="小作坊信息公示详情" />
    <div class="nav cfff">
        <i class="iconfont icondianpu-copy cfff f30"></i>
        <p class="name cfff fb ml15">{{company.company_name}}</p>
        <span v-if="company.filing_state<3" class="ml5 tag tag1 f15">待审批</span>
        <span v-if="company.filing_state==3">
           <span v-if="company.state ==1" class="ml5 tag tag1 f15">有效</span>
           <span v-if="company.state == 2" class="ml5 tag tag1 f15">已过期</span>
           <span v-if="company.state == 3" class="ml5 tag tag1 f15">已注销</span>
           <span v-if="company.state == 4" class="ml5 tag tag1 f15">即将过期</span>
        </span>
        <span v-if="company.filing_state==4" class="ml10 tag tag1 f15">已驳回</span>
        <div class="mt15  pl10">
          <van-rate readonly   :size="25" v-model="company.integrity_lvl_change_trend" allow-half color="#ffd21e" void-icon="star" void-color="#eee" />
        </div>
	</div>
	<div class="content m15">
        <div v-if="jcxxshow" class="card p15 bgcfff">
          <div class="title f18"><i class="iconfont iconrizhi mr5"></i>基础信息</div>
          <ul>
            <span v-for="(item, key) in pageconfig" :key="key">
              <span v-if="item.attr_en=='record_code' || item.attr_en=='unuseful_time' || item.attr_en=='record_time' || item.attr_en=='companytype_name' ">
                <li>
                  <span v-text="item.attr_ch + '：'" style="text-align: right;"></span>				      
                <span>{{company[item.attr_en]}}</span>
                </li>
              </span>
              <span v-if="item.attr_en=='companytag_code'">
                <li>
                  <span v-text="item.attr_ch + '：'" style="text-align: right;"></span>
                  <span :v-text="findc(company[item.attr_en])">{{typename}}</span>
                </li>
              </span>
            </span>
          </ul>
        </div>
        <div v-if="jyzxxshow" class="card p15 mt15 bgcfff">
          <div class="title f18"><i class="iconfont iconren-renyuan mr5"></i>经营者信息</div>
          <ul>
            <span v-for="(item, key) in pageconfig" :key="key">
              <span v-if="item.attr_en=='operator' || item.attr_en=='mobilephone'">
                <li>
                  <span v-text="item.attr_ch + '：'" style="text-align: right;"></span>				      
                <span>{{company[item.attr_en]}}</span>
                </li>
              </span>
            </span>
          </ul>
        </div>
        <div v-if="jyxxshow" class="card p15 mt15 bgcfff">
          <div class="title f18"><i class="iconfont iconren-renyuan mr5"></i>经营信息</div>
          <ul>
            <span v-for="(item, key) in pageconfig" :key="key">
              <span  v-if="item.attr_en=='business_form' || item.attr_en=='main_subject' || item.attr_en=='business_state' || item.attr_en=='produce_form' || item.attr_en=='producetype_codes'">
                <li>
                  <span v-text="item.attr_ch + '：'" style="text-align: right;"></span>		
                  <span v-if="item.attr_en=='business_state'">
                    <span v-if="company[item.attr_en]==1">正常营业</span>
                    <span v-if="company[item.attr_en]==2">暂停营业</span>
                    <span v-if="company[item.attr_en]==3">停止营业</span>
                  </span>	    
                  <span  v-if="item.attr_en!='business_state'">
                    <span>{{company[item.attr_en]}}</span>
                  </span>
                </li>
              </span>
            </span>
          </ul>
        </div>
        <div v-if="imgshow" class="card p15 mt15 bgcfff">
          <div class="title f18"><i class="iconfont icontupian mr5"></i>证照照片</div>
          <ul class="p0 imgs disib">
                  <span v-for="(item, key) in pageconfig"  :key="key" class="" >
                    <span class="" v-if="accessoryList[item.attr_ch]&&(item.attr_ch=='营业执照' || item.attr_ch=='备案证' || item.attr_ch=='经营者身份证' || item.attr_ch=='食品经营许可证' || item.attr_ch=='法人身份证' || item.attr_ch=='法人证书' || item.attr_ch=='批准设立文件或证件')">
                      <li>
                        <van-image v-if="accessoryList[item.attr_ch]"  fit="cover"  height="3.5rem" :src="imageUrl+accessoryList[item.attr_ch]" @click="open(imageUrl+accessoryList[item.attr_ch])"/>
                        <img v-else :src="img">
                     <p class="mt10">{{item.attr_ch}}</p>
                      </li>
                     
                    </span>
                  </span>
          </ul>
        </div>
        <div v-if="integrityLogList.length>0" class="card p15 mt15 bgcfff">
          <div class="title f18"><i class="iconfont iconpinglun mr5"></i>最新评价</div>
          <ul>
            <li class="bb pb15" v-for="(item,index) in integrityLogList" :key="index">
                <div class="f15">
            评分：<van-rate class="" readonly :size="25" v-model="item.integrity_lvl" allow-half color="#ffd21e" void-icon="star" void-color="#eee" />
          </div>
          <van-field class="p0 f15 mt15" v-model="item.remark"   label="评论：" type="textarea" rows="1" autosize  />
            </li>
           
          </ul>
        </div>
        <div class="card p15 mt15 bgcfff">
          <div class="title f18"><i class="iconfont iconpinglun mr5"></i>服务评价</div>
          <ul>
            <van-field class="p0 f15 mt15" v-model="form.user_name_add" label="联系方式：" placeholder="请输入联系方式(必填)"/>
            <div class="f15">
            请打分：<van-rate class="mt15" :size="25" v-model="form.integrity_lvl" allow-half color="#ffd21e" void-icon="star" void-color="#eee" />
          </div>
          <van-field class="p0 f15 mt15" v-model="form.remark" rows="3" autosize  label="请输入评论：" type="textarea"  placeholder="请输入评论" />
          </ul>
        </div>
        <div class="footer p15 bgcfff w"> 
        <van-row gutter="20">
          <van-col span="24"><van-button v-show="loadButton"  block type="primary" @click="submit"> 提交评论 </van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
        </van-row>
       </div>
    </div>	
  </div>
</template>
<script>

import Nav from "../../components/Nav";
import axios from "../../axios/index.js";
import {imageUrl} from '../../config/index'
import { ImagePreview } from 'vant';
export default {
  components: {
    Nav
  },
  data() {
    return {
    value:2.5,
    imageUrl: imageUrl,
    img:require('../../assets/img/moren.png'),
		accessoryList: {},
		company: {},
    pageconfig: [],
    integrityLogList:[],
		flag: false,
		imgshow: false,
		jyxxshow: false,
		jyzxxshow: false,
		jcxxshow: false,
    lengthshow: true,
    loadButton:true,
    typename: '',
    form:{
      company_code:'',
      user_name_add:'',
      integrity_lvl:0,
      remark:'',
      mete_type:1,
    }
    };
  },
  created(){
        this.form.company_code = this.$route.query.company_code
		this.init()
	},
  methods: {
       init(){
         var self=this;
             axios.get('app/company/announce', {company_code:this.form.company_code}).then(v => {
              self.company = v.data.company;
              let lengthshownum = 0;
              v.data.company.accessoryList.forEach(item=>{
               
                self.accessoryList[item.accessory_type] = item.accessory_url
                 console.log(self.accessoryList[item.accessory_type])
                if(item.accessory_url){
                  self.imgshow = true
                  lengthshownum ++
                }

              })
              window.console.log(self.accessoryList)
              if(lengthshownum > 2){self.lengthshow = false}
              if(v.data.pageconfig.indexOf("record_code") >= 0 || v.data.pageconfig.indexOf("companytag_code") >= 0 || v.data.pageconfig.indexOf("unuseful_time") >= 0 || v.data.pageconfig.indexOf("record_time") >= 0 || v.data.pageconfig.indexOf("companytype_name") >= 0){
                self.jcxxshow = true
              }
              if(v.data.pageconfig.indexOf("operator") >= 0 || v.data.pageconfig.indexOf("mobilephone") >= 0){
                self.jyzxxshow = true
              }
              if(v.data.pageconfig.indexOf("business_form") >= 0 || v.data.pageconfig.indexOf("business_state") >= 0 || v.data.pageconfig.indexOf("main_subject") >= 0|| v.data.pageconfig.indexOf("produce_form") >= 0|| v.data.pageconfig.indexOf("producetype_codes") >= 0){
                self.jyxxshow = true
              }
               self.pageconfig =  v.data.pageconfig ? JSON.parse(v.data.pageconfig) : []
               window.console.log(self.pageconfig)
             })
             axios.get('app/company/integritylog/search', {company_code:this.form.company_code,user_name_add:'',pager_openset:'5'}).then(v => {
               self.integrityLogList=v.data.integrityLogList
             })
       },
       findc: function(code) {
         if(code=='1001574645421581111111101'){
           this.typename = "四川省小作坊备案证"
         }else if(code=='1001574645421581111111102'){
           this.typename = "四川省小经营店备案证（流通）"
         }else if(code=='1001574645421581111111103'){
           this.typename = "食品经营许可证（餐饮）"
         }else if(code=='1001574645421581111111104'){
           this.typename = "四川省小经营店备案证（餐饮）"
         }else {
           this.typename = "食品经营许可证（流通）"
         }
        },
      open(data){
          ImagePreview({images:[data]})
      },
      submit(){
        this.loadButton=false;
        if(!this.form.user_name_add || this.form.user_name_add.length != 11 || !(/^1(3|4|5|6|7|8|9){1}\d{9}$/.test(this.form.user_name_add))){
          this.$toast('请输入正确的联系方式');
          this.loadButton=true;
          return false;
        }
         axios.post('app/company/integritylog/save', this.form).then(() => {
           this.form.user_name_add=''
           this.form.integrity_lvl=0
           this.form.remark=''
           this.loadButton=true
            this.init()
         })
      }
  }
};
</script>
<style lang="less" scoped>
.nav{
   margin-top: 54px;
   padding: 40px 20px 0px 20px;
   height: 190px;
   background: url("../../assets/img/scan.png") no-repeat 0px 0px;
   background-size: cover;
   .name{
        display: inline-block;
  white-space: nowrap; 
  font-size: 20px;
  max-width: 40%;
  overflow: hidden;
  text-overflow:ellipsis;
   }
   i{font-size: 30px !important;}
   .tag{padding: 6px 10px;border-radius:3px;display: inline-block;
    vertical-align:bottom;}
   .tag1{background-color: #31BCF0;}
   .tag2{background-color: #38CD85;}
}
.content{
    margin-top: -50px;
    padding-bottom: 70px;
    .card{
        border-radius:10px;
      .title{
          color: #239FE1;
          i{font-size: 23px !important;vertical-align: text-bottom; color: #239FE1;}
      }
      /deep/ .van-field{padding-bottom: 5px;
      .van-field__label{width: initial;}}
       ul{
  color:#636363; 
  font-size: 15px;
  padding:0px 10px;
}
 ul li{
  padding-top: 15px;
}
 ul li span:nth-of-type(1){
	flex: 0 0 100px;
}
.imgs{
   padding:0px !important;
li{
  width: 50%;
  padding: 10px;
  float: left;
  text-align: center;
  /deep/ .van-image__img{border-radius: 5px !important;}
}
} 
.van-rate{vertical-align: text-bottom;}
    }
}
.footer{position: fixed;bottom: 0px;left: 0px;}
</style>