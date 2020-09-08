<template>
  <div>
    <Nav  title="完善备案"/>
     <div class="card1 p15 pr">
          <div class="cardInfo power bgcfff p15 f16">
            <p class="f16">人员信息</p>
            <div class="bgf5 mt15" v-for="(item, index) in formList" :key="index">
              <van-field v-if="item.employ_flag" v-model="item.employ_name" name="姓名" label="姓名" placeholder="姓名" input-align="right" :rules="[{ required: true, message: '请填写姓名' }]" />
              <van-field v-else readonly v-model="item.employ_name" name="姓名" label="姓名"  input-align="right" />
              <van-field v-if="item.employ_flag" readonly clickable label="健康证有效期"  v-model="item.user_health_datedue" placeholder="请选择健康证有效期" input-align="right" :rules="[{ required: true, message: '请选择健康证有效期' }]"  right-icon="arrow"  @click="showdatePicker(index)"/>
              <van-field v-else readonly clickable label="健康证有效期"  v-model="item.user_health_datedue" placeholder="请选择健康证有效期" input-align="right" />
              <van-field  v-if="item.employ_flag" name="uploader" label="健康证上传" input-align="right">
                <template #input><van-uploader v-if="item.employ_flag" v-model="item.employ_health_url" camera multiple :max-count="1" :before-read='beforeRead(index)' :after-read="afterRead"  :before-delete="handleDelete"/> 
                </template>
              </van-field>
              <van-field v-else name="uploader" label="健康证上传" input-align="right">
                <template #input>
                <van-image  width="80" height="80" fit="cover" :src="item.employ_health_url[0].url" @click="open(item.employ_health_url[0].url)"/>
                </template>
               
              </van-field>
              <van-button v-if="item.employ_flag"  type="primary"  class="ml15 mt5 mb15" size="small" @click="save(item, index)">保存</van-button>
              <van-button v-else class="ml15 mt5 mb15"  size="small" type="primary"  @click="handleEdit(item, index)">编辑</van-button>   
              <van-button type="danger"  class="ml15 mt5 mb15" size="small" @click="deleteRules(item, index)">删除</van-button>
             </div>
             <div class="tc mt15 add"><van-button color="#E8F8F0" icon="plus" @click="Add">添加人员</van-button></div>
             <van-popup v-model="showdate3Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="maxDate" :max-date="maxDate1" @confirm="onConfirm"/>  
          </van-popup>
          </div>
        </div>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import {formatDate,uploadImg,dataURLtoFile} from '../../utils/index';
import axios from '../../axios/index.js';
import {imageUrl} from '../../config/index'
import { ImagePreview } from 'vant';
export default {
   components:{
    Nav
  },
  data(){
    return{
       index:'',
       formList: [],
       imageUrl: imageUrl,
       showdate3Picker:false,
       minDate: new Date(2010, 0, 1),
       maxDate: new Date(),
       maxDate1:new Date(2030,0,1),
       currentDate: new Date(),
       form:{
         company_code:'',
         employ_code:'',
         employ_name:'',
         employ_health_url:'',
         user_health_datedue:''
       },
    }
  },
  created(){
    this.form.company_code=this.$route.query.company_code
      this.getDate(this.form.company_code)
  },
  methods:{
    getDate(params){
      this.formList=[]
       axios.get('app/companyEmploy/list',{company_code:params}).then((res)=>{
       res.data.map(item=>{
        this.formList.push({
            employ_code:item.employ_code,
            user_health_datedue:item.user_health_datedue,
            employ_health_url:[{url:this.imageUrl+item.employ_health_url}],
            employ_name:item.employ_name,
            employ_flag:item.employ_flag
            }); 
       })
     })
    },
    open(data){
          ImagePreview({images:[data]})
     },
     showdatePicker(index){
      this.showdate3Picker=true;
      this.index=index
    },
    
    save(item){
      if(!item.employ_name){
        this.$toast('请输入姓名');return false;
      }else if(!item.user_health_datedue){
        this.$toast('请选择健康证有效期');return false;
      }else if(!item.employ_health_url[0]){
        this.$toast('请上传健康证');return false;
      }
         this.form.employ_code=item.employ_code;
         this.form.employ_name=item.employ_name;
        this.form.employ_health_url=item.employ_health_url[0].url.substring(item.employ_health_url[0].url.indexOf("resources"))   ;
        this.form.user_health_datedue=item.user_health_datedue;
        
         if(this.form.employ_code){
            axios.put('app/companyEmploy/update',this.form).then(()=>{
              item.employ_flag=false;
               this.getDate(this.form.company_code)
            })
         }else{
            axios.post('app/companyEmploy/save',this.form).then(()=>{
            item.employ_flag=false;
             this.getDate(this.form.company_code)
            })
         }
      
    },
    handleEdit(item){
      item.employ_flag=true
    },
    beforeRead(index){
      this.index=index;
    },
    afterRead (file) {
    if(/\/(?:jpeg|png|jpg|bmp)/i.test(file.file.type)&&file.file.size>2*1024*1024) {
      let canvas =  document.createElement('canvas')  
      let context = canvas.getContext('2d') 
      let img = new Image()
      img.src = file.content
      let width = 512   
      img.onload = () => {
        let height = width / (img.naturalWidth / img.naturalHeight)
        canvas.width = width
        canvas.height = height
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        file.content = canvas.toDataURL(file.file.type, 1) 
        file.file = dataURLtoFile(file.content, file.file.name)
        this.uploadPic(file)
      }                       
  }else{
    this.uploadPic(file)
  }
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
          this.form.employ_health_url=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"));
        this.formList[this.index].employ_health_url[0].url=this.imageUrl+response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))      
      });
    },
     handleDelete(){
        this.formList[this.index].employ_health_url=[]
    },
    Add() {
      this.formList.push({
            employ_name:'',
           user_health_datedue:'',
            employ_health_url:[],
            employ_flag:true
      })
    },
    deleteRules(item, index) {
      this.$dialog.confirm({message: '确认删除人员？',}).then(() => {
        axios.delete('app/companyEmploy/delete',{employ_code:item.employ_code}).then(()=>{
          this.formList.splice(index, 1)
            })
      }).catch(() => {});
       
      
    },
    onConfirm(value){
      if(this.showdate3Picker===true){this.formList[this.index].user_health_datedue= formatDate(value, 'yyyy-MM-dd');this.showdate3Picker=false;}
      },
  }
}
</script>
<style scoped lang="less">
.card1{
  margin-top: 55px;
}
.p15{
  border-radius: 8px;
  background: #f5f5f5;
   /deep/ .van-button__icon{
      color: #1db667 !important;
    }
}
.add{
    .van-button__text{
      color:#1db667;
    }
  }
/deep/ .van-button{
  margin-top: 15px !important;
}
</style>