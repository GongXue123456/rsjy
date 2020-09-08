<template>
  <div class="bigBox">
    <Nav title="溯源详情" />
    <div class="information bgcfff">
        
        <div class="card1  p15 f16 pr">
             <p class="f15 mb15">基础信息</p>
          <van-field readonly v-model="form.add_time"  label="填报时间"  input-align="right"  />
          <van-field readonly v-model="form.sell_time"  label="采购时间"  input-align="right" />
          <van-field readonly v-model="form.sell_person"  label="购买人" input-align="right" />
          <van-field readonly v-model="form.supplier_name"  label="供应商/店铺"  input-align="right" />
          <van-field readonly class="mb0" v-model="form.supplier_address"  label="购买地址" input-align="right" />
          
        </div>
        <div class="card1  p15 f16 pr">
          <p class="f15 mb15">食材信息</p>
          <div class="card mb15 p15 f16 pr" v-for="(item,index) in form.foodSourceDetailList" :key="index">
              <van-field readonly :value="index+1"  label="序号"  input-align="right"  />
          <van-field readonly v-model="item.category_name"  label="食材种类"  input-align="right" />
          <van-field readonly v-model="item.product_name"  label="食材名称" input-align="right" />
          <van-field readonly v-model="item.product_brand"  label="品牌"  input-align="right" />
          <van-field readonly v-model="item.product_spec"  label="规格" input-align="right" />
         <van-field  readonly v-model="item.product_unit"  label="单位"  autosize input-align="right" />
         <van-field readonly v-model="item.sell_count"  label="数量"  autosize input-align="right" />
         <van-field name="uploader" label="票据" input-align="right">
                <template #input><van-image v-if="item.accessory_url" width="80" height="80" fit="cover" :src="imageUrl+item.accessory_url" @click="open(imageUrl+item.accessory_url)"/>  <img v-else :src="img"> 
                 </template>
         </van-field>
          </div>
         </div>
     
      <div>
        
      </div>
     
    </div>
  </div>
</template>
<script>
import {imageUrl} from '../../../config/index'
import Nav from "../../../components/Nav";
import axios from '../../../axios/index.js';
import { ImagePreview } from 'vant';
export default {
  components: {
    Nav
  },
  data() {
    return {
      id1:'',
      imageUrl: imageUrl,
      show:false,
      foodsource_code:'',
      form:'',
      img:require('../../../assets/img/moren.png'),
    };
  },
   created() {
     this.foodsource_code=this.$route.query.id;
    this.getDate()
  },
  methods: {
    getDate(){
      if(this.foodsource_code){
        axios.get('app/foodsource/detail', {foodsource_code:this.foodsource_code}).then(v => {
        this.form=v.data;
      })
      } 
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
  .card1 {
    background: #f5f5f5;
    .van-cell{margin-bottom: 15px;}
     .van-cell:last-child{margin-bottom: 0px;}
    
  }
  .card {
    background: #fff;
    .van-cell{margin-bottom: 15px;background-color: #f5f5f5;}
     .van-cell:last-child{margin-bottom: 0px;}
     img {top: 10px;right: 20px;width: 75px;height:75px;}
    
  }

}

</style>