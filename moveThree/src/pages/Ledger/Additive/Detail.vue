<template>
  <div class="bigBox">
    <Nav title="食品添加剂使用记录详情" />
    <div class="information bgcfff">
     <van-form >  
        <div class="card1  p15 f16 pr">
          <van-field readonly clickable label="添加剂使用日期"  v-model="form.use_time" input-align="right"  />
          <van-field readonly v-model="form.product_name"  label="产品名称" input-align="right" />
          <van-field readonly v-model="form.product_batch"  label="产品批量（kg或L）" input-align="right"/>
          <van-field readonly v-model="form.additive_name"  label="食品添加剂名称" input-align="right"/>
          <van-field readonly v-model="form.additive_no"  label="添加剂加工日期（批号）" input-align="right"/>
          <van-field readonly v-model="form.regulations_dose"  label="GB2760规定的该添加剂使用限量" input-align="right"/>
          <van-field readonly v-model="form.reality_dose"  label="该批产品添加剂实际使用量（g或ml）"  input-align="right"/>
          <van-field readonly v-model="form.personnel_sign"  label="配料（投料）人员" input-align="right" />
          <van-field readonly v-model="form.effect"  label="作用" input-align="right"/>
          <van-field readonly v-model="form.register_time"  label="登记时间"  input-align="right"/>
          <van-field readonly v-model="form.note"  label="备注" type="textarea" rows="1" autosize input-align="right"/>
          <van-field name="uploader" v-if="form.accessoryList&&form.accessoryList.length>0" autosize label="图片" input-align="right">
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
          <van-col span="12"><van-button   block type="primary" native-type="submit" @click="$router.push('/additive/add?id='+company_code+'&id1='+use_code)"> 编辑 </van-button></van-col>
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
     use_code:'',
     form:'',
     user_type:'',
     img:require('../../../assets/img/moren.png'),
    };
  },
   created() {
     this.user_type=local.get("user").user_type
     this.company_code=this.$route.query.id;
      this.use_code=this.$route.query.id1;
     this.getDate()
  },
  methods: {
    getDate(){
      axios.get('app/standingbook/additiveuse/single', {use_code:this.use_code}).then(v => {
        this.form=v.data.additiveUse
        console.log(v.data.additiveUse.accessoryList.length)
      })
    },
    onDelete(){
        this.$dialog.confirm({message: '确认删除？',}).then(() => {
         axios.delete('app/standingbook/additiveuse/delete', {use_code:this.use_code}).then(() => {
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
    
  }
.footer{position: fixed;bottom: 0px;left: 0px;}
.van-button--primary{
      background-color: #07c160;
    border: 0.026667rem solid #07c160;
}
/deep/ .van-field__control--custom{
  display: initial;
}
/deep/ .dialog{
  .van-field__control{background-color: #F0F0F0;padding: 10px;font-size: 16px;}
}
}

</style>