<template>
  <div class="bigBox">
    <Nav v-if="form.check_code" title="编辑产品检验记录" />
    <Nav v-else title="新增产品检验记录" />
    <div class="information bgcfff">
     <van-form validate-first @submit="onSubmit"  @failed="onFailed">  
        <div class="card1  p15 f16 pr">
          <van-field  v-model="form.product_name"  label="产品名称" placeholder="请输入产品名称" input-align="right" @input="form.product_name=form.product_name.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入产品名称' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入特殊符号' }]" />
          <van-field  v-model="form.product_specs"  label="规格" placeholder="请输入规格" input-align="right" />
          <van-field  v-model="form.product_batch"  label="批次（生产日期）" placeholder="请输入批次（生产日期）" input-align="right"/>
          <van-field  v-model="form.check_company_name"  label="承验单位" placeholder="请输入承验单位" input-align="right"  />
          <van-field v-model="form.check_project"  label="检验项目" placeholder="请输入检验项目" input-align="right"  />
          <van-field  v-model="form.check_relust"  label="检验结果" placeholder="请输入检验结果" input-align="right"  />
          <van-field readonly clickable label="报告日期"  v-model="form.report_time" placeholder="请选择报告日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择销售日期' }]"  @click="showdate1Picker = true"/>
          <van-field  v-model="form.report_no"  label="检验报告单编号" placeholder="请输入检验报告单编号" input-align="right" />
          <van-field  v-model="form.quality_report"  label="质检报告" placeholder="请输入质检报告" input-align="right"/>
          <van-field  v-model="form.note"  label="备注" type="textarea" rows="1" autosize placeholder="请输入备注" input-align="right"  />
          <van-field name="uploader" label="图片" input-align="right">
                <template #input> <van-uploader v-model="accessory_url" multiple :max-count="4" camera  :after-read="uploadPic"  :before-delete="handleDelete"
           /> </template>
          </van-field>
           <van-popup v-model="showdate1Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>  
          </van-popup>
        </div>
       
       
      <div class="footer p15 bgcfff w"> 
        <van-row  gutter="20">
          <van-col v-if="form.check_code" span="24"><van-button v-show="loadButton"  block type="primary" native-type="submit"> 编辑产品检验记录</van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
          <van-col v-else span="24"><van-button v-show="loadButton"  block type="primary" native-type="submit"> 新增产品检验记录 </van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
        </van-row>
       </div>
      
     </van-form>
      <div>
        
      </div>
     
    </div>
  </div>
</template>
<script>
import {imageUrl} from '../../../config/index'
import Nav from "../../../components/Nav";
import axios from '../../../axios/index.js';
import {formatDate,uploadImg } from '../../../utils/index';
export default {
  components: {
    Nav
  },
  data() {
    return {
      id1:'',
      imageUrl: imageUrl,
      showdate1Picker:false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      form:{
        company_code:'',
        check_code:'',
        report_time:'',
        product_name:'',
        product_specs:'',
        product_batch:'',
        check_company_name:'',
        check_project:'',
        check_relust:'',
        report_no:'',
        quality_report:'',
        note:'',
        accessoryList:[]
      },
      accessory_url:[],
      loadButton:true,
    };
  },
   created() {
     this.form.company_code=this.$route.query.id;
      this.form.check_code=this.$route.query.id1;
     this.getDate()
  },
  methods: {
     onFailed(errorInfo) {
      this.$toast(errorInfo.errors[0].message);
    },
    getDate(){
      if(this.form.check_code){
        axios.get('app/standingbook/productcheck/single', {check_code:this.form.check_code}).then(v => {
        this.form=v.data.productCheck;
        if(v.data.productCheck.accessoryList.length>0){
          v.data.productCheck.accessoryList.forEach(item=>{
           this.accessory_url.push({url:this.imageUrl+item.accessory_url})
          })
        }
      })
      }  
    },
     onSubmit() {
          console.log(this.form)
       this.loadButton=false;
       if(this.form.check_code){
        axios.put('app/standingbook/productcheck/update', this.form).then(() => {
         this.loadButton=true;
         this.$router.back()
        })
       }else{
           axios.post('app/standingbook/productcheck/save', this.form).then(() => {
         this.loadButton=true;
        this.$router.back()
      })
       }
      
     
    },

    onConfirm(value){
      if(this.showdate1Picker===true){this.form.report_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false}
     
      },
    uploadPic(file){
       let param = new FormData();
      param.append("uploadFile", file.file);
      const loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0
      });
      uploadImg(param).then(response => {
        loading.clear();
         this.form.accessoryList.push({accessory_url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))})
        console.log(this.accessory_url)
      });
    },
    handleDelete(file, detail){
      this.form.accessoryList.splice(detail.index, 1);
      this.accessory_url.splice(detail.index, 1);
       
    },
    
    
  }
};
</script>
<style lang="less" scoped>
.information {
  width: 100%;
  height: 100%;
  padding-top: 54px;
  box-sizing: border-box;
  margin-bottom: 60px;
 /deep/ .card1 {
    background: #f5f5f5;
    .van-cell{margin-bottom: 15px;
     .van-field__label{width: 3.5rem;}
     .van-field__error-message{display: none;}}
    .van-button--default{.van-button__content{color: #1DB667;}}
    
  }
.footer{position: fixed;bottom: 0px;left: 0px;}
.van-button--primary{
      background-color: #07c160;
    border: 0.026667rem solid #07c160;
}
/deep/ .dialog{
  .van-field__control{background-color: #F0F0F0;padding: 10px;font-size: 16px;}
}
}

</style>