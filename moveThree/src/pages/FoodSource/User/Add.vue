<template>
  <div class="bigBox">
    <Nav title="新增溯源" />
    <div class="information ">
     <van-form validate-first @submit="onSubmit"  @failed="onFailed">  
       <div v-if="form1.foodsource_code=='undefined'||form1.foodsource_code==''||form1.foodsource_code==null" class="mb50">
           <div class="card1  p15 f16 pr">
           <p class="f18 mb15">基础信息</p>
           <van-field readonly clickable label="购买时间"  v-model="form.sell_time" placeholder="请选择购买时间" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择购买时间' }]"  @click="showdate1Picker = true"/>
          <van-field  v-model="form.sell_person"  label="购买人" placeholder="请输入购买人" input-align="right" @input="form.sell_person=form.sell_person.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入购买人' }]" />
          <van-field  v-model="form.supplier_name"  label="供应商/店铺" placeholder="请输入供应商/店铺" input-align="right" />
          <van-field v-model="form.supplier_address"  label="购买地址" placeholder="请输入购买地址" input-align="right" />
           
         
        
          <van-popup v-model="showdate1Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>  
          </van-popup>
          
            
        </div>

        <div class="card1 p15 pr" style="margin-top:-30px">
          <div class="cardInfo power bgcfff p15 f16">
            <p class="f16">食材明细</p>
             <div class="bgf5 mt15" v-for="(item, index) in formlist" :key="index">
               <van-field readonly clickable label="食材种类" type="textarea" rows="1" autosize v-model="item.category_name" placeholder="请选择食材种类" input-align="right" :rules="[{ required: true, message: '请选择食材种类' }]" right-icon="arrow" @click="showRadio(1)"/>
              <van-field v-model="item.product_name" label="名称" placeholder="名称" input-align="right" :rules="[{ required: true, message: '请输入名称' }]" />
              <van-field v-model="item.product_brand" label="品牌" placeholder="品牌" input-align="right" />
              <van-field v-model="item.product_spec" label="规格" placeholder="规格" input-align="right" />
              <van-field v-model="item.product_unit" label="单位" placeholder="单位" input-align="right" />
              <van-field v-model="item.sell_count" label="数量" placeholder="数量" input-align="right" />
              <van-field v-model="item.sale_product_name" label="产品名称" placeholder="产品名称" input-align="right" />
              <van-field v-model="item.sale_company_name" label="产品接收单位" placeholder="产品接收单位" input-align="right" />
              
              <van-field name="uploader" label="票据" input-align="right">
                <template #input> <van-uploader v-model="item.accessory_url" camera multiple :max-count="1" :before-read='beforeRead(index)' :after-read="uploadPic"  :before-delete="handleDelete"
           /> </template>
              </van-field>
              <van-button type="danger"  class="ml15 mt5 mb15" size="small" @click="deleteRules(item, index)">删除</van-button>
             </div>
             <div class="tc mt15"><van-button color="#E8F8F0" icon="plus" @click="Add">添加食材</van-button></div>
             <radioModel  v-if="showModel" @closeTip="show1(1)"  @closeTip1='show2(1,$event)'  :content='category_list' :val='1' :checked='form.category_code'/>
          </div>
          
        </div>
       </div>
       <div v-else class="mb50">
           <div class="card1  p15 f16 pr">
           <p class="f18 mb15">食材明细</p>
           <van-field readonly clickable label="食材种类" type="textarea" rows="1" autosize v-model="form1.category_name" placeholder="请选择食材种类" input-align="right" :rules="[{ required: true, message: '请选择食材种类' }]" right-icon="arrow" @click="showRadio(1)"/>
              <van-field v-model="form1.product_name" label="名称" placeholder="名称" input-align="right" :rules="[{ required: true, message: '请输入名称' }]" />
              <van-field v-model="form1.product_brand" label="品牌" placeholder="品牌" input-align="right" />
              <van-field v-model="form1.product_spec" label="规格" placeholder="规格" input-align="right" />
              <van-field v-model="form1.product_unit" label="单位" placeholder="单位" input-align="right" />
              <van-field v-model="form1.sell_count" label="数量" placeholder="数量" input-align="right" />
              <van-field v-model="form1.sale_product_name" label="产品名称" placeholder="产品名称" input-align="right" />
              <van-field v-model="form1.sale_company_name" label="产品接收单位" placeholder="产品接收单位" input-align="right" />
              
              <van-field name="uploader" label="票据" input-align="right">
                <template #input> <van-uploader v-model="accessory_url" camera multiple :max-count="1" :before-read='beforeRead(index)' :after-read="uploadPic"  :before-delete="handleDelete"
              /> </template>
              </van-field>
            <radioModel  v-if="showModel" @closeTip="show1(1)"  @closeTip1='show2(1,$event)' @event1="change(1,$event)" :content='category_list' :val='1' :checked='form.category_code'/>
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
      category_list:[],
      imgUrlListValue:'',
      form:{
        company_code:'',
        sell_time:'',
        sell_person:'',
        supplier_name:'',
        supplier_address:'',
        foodSourceDetailList: [],
      },
      form1:{
        foodsource_code:'',
        sell_count:'',
        userset_name:'',
        category_code:'',
        category_name: '',
        product_name: '',
        product_brand:'',
        product_spec: '',
        product_unit:'',
        accessory_url:'',
        product_logo:'',
        sale_product_name:'',
        sale_company_name:'',
      },
      accessory_url:[],
      formlist:[],
      showPicker: false,
      loadButton:true,
      foodsource_code:''
    };
  },
   created() {
      this.form.company_code=this.$route.query.company_code;
      this.form1.foodsource_code=this.$route.query.id;
      this.init()
  },
  methods: {
     onFailed(errorInfo) {
      this.$toast(errorInfo.errors[0].message);
    },
    init() {
      axios.get('app/category/all', '').then(v => {
        this.category_list=v.data.category_list
      })
    },
     onSubmit() {
       this.loadButton=false;
        if(this.form1.foodsource_code=='undefined'||this.form1.foodsource_code==''||this.form1.foodsource_code==null){
            if(this.formlist[0].accessory_url.length==0){
               this.formlist.forEach(item=>{
          this.form.foodSourceDetailList.push({
            category_name:item.category_name,
            category_code:item.category_code,
            product_name:item.product_name,
            product_brand:item.product_brand,
            product_spec:item.product_spec,
            product_unit:item.product_unit,
            sell_count:item.sell_count,
            sale_product_name:item.sale_product_name,
            sale_company_name:item.sale_company_name,
             });
       })
            }else{
         this.formlist.forEach(item=>{
          this.form.foodSourceDetailList.push({
            category_name:item.category_name,
            category_code:item.category_code,
            product_name:item.product_name,
            product_brand:item.product_brand,
            product_spec:item.product_spec,
            product_unit:item.product_unit,
            sell_count:item.sell_count,
            sale_product_name:item.sale_product_name,
            sale_company_name:item.sale_company_name,
            accessory_url:item.accessory_url[0].url.substring(item.accessory_url[0].url.indexOf("resources")),
            product_logo:item.accessory_url[0].url.substring(item.accessory_url[0].url.indexOf("resources"))
             });
       })
      }
       axios.post('app/foodsource/save', this.form).then(() => {
         this.loadButton=true;
        this.$router.back()
      })
         }else{
          this.form1.product_logo=this.accessory_url[0].url.substring(this.accessory_url[0].url.indexOf("resources"));
          this.form1.accessory_url=this.accessory_url[0].url.substring(this.accessory_url[0].url.indexOf("resources"));
      axios.post('app/foodsource/detail/save', this.form1).then(() => {
         this.loadButton=true;
        this.$router.back()
      })
         }
        console.log(this.formlist)
    },
    showRadio(val){
      if(val==1){this.showModel=!this.showModel}
    },
    show1(val){
      if(val==1){this.showModel=false;}
    },
    show2(index,val){
      console.log(index,val)
       if(index==1){
         if(this.form1.foodsource_code=='undefined'||this.form1.foodsource_code==''||this.form1.foodsource_code==null){
           this.formlist[this.index].category_code=val.category_code;
           this.formlist[this.index].category_name=val.category_name;
         }else{
           this.form1.category_code=val.category_code;
           this.form1.category_name=val.category_name;
         }
        
       }
    },
    onConfirm(value){
      if(this.showdate1Picker===true){this.form.sell_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false}
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
         if(this.form1.foodsource_code=='undefined'||this.form1.foodsource_code==''||this.form1.foodsource_code==null){
          this.formlist[this.index].accessory_url[0].url=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))      
         }else{
           this.accessory_url[0].url=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))      
         }
      });
    },
    handleDelete(){
       if(this.form1.foodsource_code=='undefined'||this.form1.foodsource_code==''||this.form1.foodsource_code==null){
          this.formlist[this.index].accessory_url=[]
         }else{
           this.accessory_url=[]
         }
    },
    Add() {
       this.maxnum++
       this.formlist.push({
           category_name:'',
           category_code:'',
           product_name:'',
           product_brand:'',
           product_spec:'',
           product_unit:'',
           sell_count:'',
           sale_product_name:'',
           sale_company_name:'',
           accessory_url:[],
      })
    },
    deleteRules(item, index) {
      this.maxnum--
      this.index = this.formlist.indexOf(item)
      if (index !== -1) {
        this.formlist.splice(index, 1)
      }
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