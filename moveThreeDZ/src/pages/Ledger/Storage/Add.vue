<template>
  <div class="bigBox">
    <Nav v-if="form.storage_code" title="编辑成品入库记录" />
    <Nav v-else title="新增成品入库记录" />
    <div class="information bgcfff">
     <van-form validate-first @submit="onSubmit"  @failed="onFailed">  
        <div class="card1  p15 f16 pr">
          <van-field  v-model="form.product_name"  label="产品名称" placeholder="请输入产品名称" input-align="right" @input="form.product_name=form.product_name.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入产品名称' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入特殊符号' }]" />
          <van-field  v-model="form.product_specs"  label="规格" placeholder="请输入规格" input-align="right" />
          <van-field  v-model="form.storage_in_batch"  label="入库批次（生产日期）" placeholder="请输入入库批次（生产日期）" input-align="right"/>
          <van-field readonly clickable label="入库日期"  v-model="form.storage_in_time" placeholder="请选择入库日期" input-align="right" right-icon="arrow"  @click="showdate1Picker = true"/>
          <van-field  v-model="form.storage_in_num"  label="入库数量" placeholder="请输入入库数量" input-align="right"  />
          <van-field v-model="form.storage_out_batch"  label="出库批次（生产日期）" placeholder="请输入出库批次（生产日期）" input-align="right"  />
          <van-field readonly clickable label="出库日期"  v-model="form.storage_out_time" placeholder="请选择出库日期" input-align="right" right-icon="arrow"  @click="showdate2Picker = true"/>
          <van-field  v-model="form.storage_out_num"  label="出库数量" placeholder="请输入出库数量" input-align="right"  />
          <van-field  v-model="form.balance_num"  label="结存量" placeholder="请输入结存量" input-align="right"  />
          <van-field  v-model="form.note"  label="备注" type="textarea" rows="1" autosize placeholder="请输入备注" input-align="right"  />
          <van-field name="uploader" label="图片" input-align="right">
                <template #input> <van-uploader v-model="accessory_url" multiple :max-count="4" camera  :after-read="uploadPic"  :before-delete="handleDelete"
           /> </template>
          </van-field>
           <van-popup v-model="showdate1Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>  
          </van-popup>
          <van-popup v-model="showdate2Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>  
          </van-popup>
        </div>
       
       
      <div class="footer p15 bgcfff w"> 
        <van-row  gutter="20">
          <van-col v-if="form.storage_code" span="24"><van-button v-show="loadButton"  block type="primary" native-type="submit"> 编辑成品入库记录</van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
          <van-col v-else span="24"><van-button v-show="loadButton"  block type="primary" native-type="submit"> 新增成品入库记录</van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
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
      showdate2Picker:false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      form:{
        company_code:'',
        storage_code:'',
        product_name:'',
        product_specs:'',
        storage_in_batch:'',
        storage_in_time:'',
        storage_in_num:'',
        storage_out_batch:'',
        storage_out_time:'',
        storage_out_num:'',
        balance_num:'',
        note:'',
        accessoryList:[]
      },
      accessory_url:[],
      loadButton:true,
    };
  },
   created() {
     this.form.company_code=this.$route.query.id;
      this.form.storage_code=this.$route.query.id1;
     this.getDate()
  },
  methods: {
     onFailed(errorInfo) {
      this.$toast(errorInfo.errors[0].message);
    },
    getDate(){
      if(this.form.storage_code){
        axios.get('app/standingbook/storage/single', {storage_code:this.form.storage_code}).then(v => {
        this.form=v.data.storage;
        if(v.data.storage.accessoryList.length>0){
          v.data.storage.accessoryList.forEach(item=>{
           this.accessory_url.push({url:this.imageUrl+item.accessory_url})
          })
        }
      })
      }  
    },
     onSubmit() {
       this.loadButton=false;
       if(this.form.storage_code){
        axios.put('app/standingbook/storage/update', this.form).then(() => {
         this.loadButton=true;
         this.$router.back()
        })
       }else{
           axios.post('app/standingbook/storage/save', this.form).then(() => {
         this.loadButton=true;
        this.$router.back()
      })
       }
      
     
    },

    onConfirm(value){
      if(this.showdate1Picker===true){this.form.storage_in_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false}
      if(this.showdate2Picker===true){this.form.storage_out_time= formatDate(value, 'yyyy-MM-dd');this.showdate2Picker=false}
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