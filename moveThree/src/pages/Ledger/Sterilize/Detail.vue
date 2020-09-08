<template>
  <div class="bigBox">
    <Nav title="场所清洁消毒记录详情" />
    <div class="information bgcfff">
     <van-form >  
        <div class="card1  p15 f16 pr">
          <van-field readonly clickable label="日期"  v-model="form.sterilize_time" input-align="right"  />
          <van-field readonly v-model="form.sterilize_addr"  label="场所" input-align="right" />
          <van-field readonly v-model="form.sterilize_mode"  label="清洁（消毒）方式" input-align="right"/>
          <van-field readonly v-model="form.operate_time"  label="操作时间" input-align="right"/>
          <van-field readonly v-model="form.operate_name"  label="操作人员" input-align="right"/>
          <van-field readonly v-model="form.confirm_name"  label="确认人员" input-align="right"/>
          <van-field readonly v-model="form.note"  label="备注"  input-align="right"/>
          <van-field name="uploader" v-if="form.accessoryList&&form.accessoryList.length>0" label="图片" input-align="right">
                <template #input><van-image class="ml10" v-for="(item,index)  in form.accessoryList" :key="index" width="80" height="80" fit="cover" :src="imageUrl+item.accessory_url" @click="open(imageUrl+item.accessory_url)"/>  
                 </template>
         </van-field>
         <van-field  v-else name="uploader"  label="图片" input-align="right">
                <template #input> <img width="80" height="80"  :src="img">  
                 </template>
         </van-field>
        
        </div>
       
       
      <div v-if="user_type=='食品经营者'" class="footer p15 bgcfff w"> 
        <van-row  gutter="20">
          <van-col span="12"><van-button   block type="primary" native-type="submit" @click="$router.push('/sterilize/add?id='+company_code+'&id1='+sterilize_code)"> 编辑 </van-button></van-col>
           <van-col span="12"><van-button   block type="danger" native-type="submit" @click="onDelete"> 删除 </van-button></van-col>
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
import { local } from '../../../utils';
import { ImagePreview } from 'vant';
export default {
  components: {
    Nav
  },
  data() {
    return {
      imageUrl: imageUrl,
      company_code:'',
     sterilize_code:'',
     form:'',
     user_type:'',
     img:require('../../../assets/img/moren.png'),
    };
  },
   created() {
      this.user_type=local.get("user").user_type
     this.company_code=this.$route.query.id;
      this.sterilize_code=this.$route.query.id1;
     this.getDate()
  },
  methods: {
    getDate(){
      axios.get('app/standingbook/sterilize/single', {sterilize_code:this.sterilize_code}).then(v => {
        this.form=v.data.sterilize
      })
    },
    onDelete(){
        this.$dialog.confirm({message: '确认删除？',}).then(() => {
         axios.delete('app/standingbook/sterilize/delete', {sterilize_code:this.sterilize_code}).then(() => {
        this.$router.back()
      })
     }).catch(() => {});  
    },
    open(data){
          ImagePreview({images:[data]})
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
     .van-field__label{width: 3.5rem;}}
    .van-button--default{.van-button__content{color: #1DB667;}}
    
  }
.footer{position: fixed;bottom: 0px;left: 0px;}
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
/deep/ .van-field__control--custom{display: initial;}
/deep/ .dialog{
  .van-field__control{background-color: #F0F0F0;padding: 10px;font-size: 16px;}
}
}

</style>