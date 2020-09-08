<template>
  <div class="bigBox">
    <Nav title="进货记录详情" />
    <div class="information bgcfff">
     <van-form >  
        <div class="card1  p15 f16 pr">
          <van-field readonly clickable label="进货日期"  v-model="form.purchase_time" input-align="right"  />
          <van-field readonly v-model="form.batching_name"  label="原辅料名称" input-align="right" />
          <van-field readonly v-model="form.batching_specs"  label="规格" input-align="right"/>
          <van-field readonly v-model="form.batching_num"  label="数量" input-align="right"/>
          <van-field readonly v-model="form.produce_unit"  label="原辅料加工单位" input-align="right"/>
          <van-field readonly v-model="form.produce_licence"  label="加工许可证编号" input-align="right"/>
          <van-field readonly v-model="form.produce_batch"  label="加工日期（批号）"  input-align="right"/>
          <van-field readonly v-model="form.batching_bzj"  label="保质期" input-align="right" />
          <van-field readonly v-model="form.supplier_name"  label="供货商名称" input-align="right"/>
          <van-field readonly v-model="form.contact_name"  label="供货商联系人"  input-align="right"/>
          <van-field readonly v-model="form.contact_phone"  label="供货商联系电话" input-align="right"/>
          <van-field readonly v-model="form.check_name"  label="验货人员" input-align="right"/>
          <van-field readonly v-model="form.check_mode"  label="验货方式" input-align="right" />
          <van-field readonly v-model="form.check_result"  label="验货结论"  input-align="right"/>
          <van-field readonly v-model="form.note"  label="备注" type="textarea" rows="1" autosize input-align="right"/>
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
          <van-col span="12"><van-button   block type="primary" native-type="submit" @click="$router.push('/purchase/add?id='+company_code+'&id1='+batching_code)"> 编辑</van-button></van-col>
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
     batching_code:'',
     form:'',
     user_type:'',
     img:require('../../../assets/img/moren.png'),
    };
  },
   created() {
      this.user_type=local.get("user").user_type
     this.company_code=this.$route.query.id;
      this.batching_code=this.$route.query.id1;
     this.getDate()
  },
  methods: {
    getDate(){
      axios.get('app/standingbook/batchingin/single', {batching_code:this.batching_code}).then(v => {
        this.form=v.data.batchingIn
      })
    },
    onDelete(){
        this.$dialog.confirm({message: '确认删除？',}).then(() => {
         axios.delete('app/standingbook/batchingin/delete', {batching_code:this.batching_code}).then(() => {
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