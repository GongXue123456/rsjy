<template>
  <div class="bigBox">
    <Nav v-if="!form.sample_code" title="新增留样" />
    <Nav v-else title="再次留样" />
    <div class="information ">
     <van-form validate-first @submit="onSubmit"  @failed="onFailed">  
       <div  class="mb50">
         <div v-if="!form.sample_code" class="card1  p15 f16 pr">
           <p class="f18 mb15">供应商</p>
           <van-field readonly clickable label="供应商" type="textarea" rows="1" autosize v-model="form.supplier_name" placeholder="请选择食材种类" :rules="[{ required: true, message: '请选择食材种类' }]" input-align="right"  right-icon="arrow" @click="showRadio(1)"/>
            <radioModel  v-if="showModel" @closeTip="show1(1)"  @closeTip1='show2(1,$event)'  :content='supplier_list' :val='1' :checked='form.supplier_name'/>
        </div>
         <div class="card1  p15 f16 pr">
           <p class="f18 mb15">基础信息</p>
          <van-field  v-model="form.sample_name"  label="留样食品" placeholder="请输入留样食品" input-align="right" @input="form.sample_name=form.sample_name.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入留样食品' }]" />
          <van-field  v-model="form.sample_num"  label="留样量" placeholder="请输入留样量" input-align="right" :rules="[{ required: true, message: '请输入留样量' }]" >
            <template #button>
             <span class="c000 f15">g</span>
            </template>
          </van-field>
          <van-field v-model="form.sample_person"  label="留样人" placeholder="请输入留样人" input-align="right" :rules="[{ required: true, message: '请输入留样人' }]"/>
          <van-field readonly clickable label="留样时间"  v-model="form.sample_time" placeholder="请选择留样时间" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择留样时间' }]" @click="showdate1Picker = true"/>
          <van-field name="uploader" label="留样图片" :rules="[{ required: true, message: '请选择留样图片' }]" input-align="right">
          <template #input> <van-uploader v-model="accessory_url" camera multiple :max-count="1" :before-read='beforeRead(index)' :after-read="uploadPic"  :before-delete="handleDelete" 
          /> </template>
          </van-field>
          <van-popup v-model="showdate1Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>  
          </van-popup>
        </div>
       </div>
      <div class="footer p15 bgcfff w"> 
        <van-row  gutter="20">
          <van-col span="24"><van-button  v-show="loadButton"  block type="primary" native-type="submit"> 提交 </van-button>
          <van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." />
          </van-col>
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
import radioModel from "../../../components/radioModel";
import axios from '../../../axios/index.js';
import {formatDate,uploadImg } from '../../../utils/index';
export default {
  components: {
    Nav,radioModel
  },
  data() {
    return {
      id1:'',
      imageUrl: imageUrl,
      maxnum:0,
      index:'',
      show:false,
      showModel: false,
      showdate1Picker:false,
      activeName: 'a',
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      supplier_list:[],
      imgUrlListValue:'',
      form:{
        sample_code:'',
        foodsource_code:'',
        sample_num:'',
        sample_name:'',
        sample_person:'',
        sample_time: formatDate(new Date(), 'yyyy-MM-dd'),
        company_code:'',
        sample_img:''
      },
      accessory_url:[],
      showPicker: false,
      loadButton:true,
    };
  },
   created() {
      this.form.sample_code=this.$route.query.id;
      this.form.company_code=this.$route.query.company_code;
      this.getDate()
      this.init()
  },
  methods: {
     getDate(){
      if(this.form.sample_code){
        axios.get('app/foodsample/single', {sample_code:this.form.sample_code}).then(v => {
          console.log(v.data.foodSourceSample)
        this.form=v.data.foodSourceSample;
        this.form.sample_time=formatDate(new Date(), 'yyyy-MM-dd');
        this.accessory_url.push({url:this.imageUrl+this.form.sample_img})
      })
      } 
    },
     onFailed(errorInfo) {
      this.$toast(errorInfo.errors[0].message);
    },
    init() {
      axios.get('app/foodsource/supplier/list', {company_code:this.form.company_code}).then(v => {
        this.supplier_list=v.data.pager_list
      })
    },
     onSubmit() {
       this.loadButton=false;
       this.form.sample_img=this.accessory_url[0].url.substring(this.accessory_url[0].url.indexOf("resources")),
       console.log(this.form)
      axios.post('app/foodsample/save', this.form).then(() => {
         this.loadButton=true;
        this.$router.back()
      })
        
    },
    showRadio(val){
      if(val==1){this.showModel=!this.showModel}
    },
    show1(val){
      if(val==1){this.showModel=false;}
    },
    show2(index,val){
           this.form.supplier_name=val.supplier_name;
    },
    onConfirm(value){
      if(this.showdate1Picker===true){this.form.sample_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false}
      },

    beforeRead(index){
      this.index=index
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
           this.accessory_url[0].url=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))      

      });
    },
    handleDelete(){
           this.accessory_url[0].url=''
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
//  { margin-bottom: 50px;}
  /deep/ .van-field__error-message{
    display: none ;
  }
  .card {background: #f5f5f5;margin: 15px;border-radius: 5px;
    .van-cell{background-color: transparent;padding:10px 0px}
    img {top: 50px;right: 20px;width: 75px;height:75px;}
    .cardInfo { border-radius:5px;p:nth-child(1) {  color: #9a9a9a; }
    .change{right: 10px;top: 10px;border-radius: 4px;}}
  }
  .power{
    .van-cell{background-color: #f5f5f5;margin-bottom: 0 !important;}
  }
  .card1 {
    background: #f5f5f5;
    .van-cell{margin-bottom: 15px;}
    .van-button--default{.van-button__content{color: #1DB667;}}
    
  }
  .card1:first-child {.van-cell{margin-bottom: 0px;}}
.footer{
  position: fixed;bottom: 0px;left: 0px;
  span{
    font-size: 18px;
  }
  }
.van-button--default{color: #fff;
    background-color: #C7C7C7;
    border: 0.026667rem solid #C7C7C7;
        display: block;
    width: 100%;
            padding: 0 8px;
    font-size: 14px;
        box-sizing: border-box;
    height: 44px;
    margin: 0;
    padding: 0;
    line-height: 44px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
    -webkit-appearance: none;
}
.van-button--primary{
      background-color: #07c160;
    border: 0.026667rem solid #07c160;
}
/deep/ .dialog{
  .van-field__control{background-color: #F0F0F0;padding: 10px;font-size: 16px;}
}
}

</style>