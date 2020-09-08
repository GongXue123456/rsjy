<template>
  <div class="bigBox">
    <Nav title="留样详情" />
    <div class="information bgcfff">
        
        <div class="card1  p15 f16 pr">
             <p class="f15 mb15">留样信息</p>
          <van-field readonly v-model="form.sample_name"  label="留样食品"  input-align="right"  />
          <van-field readonly v-model="form.sample_num"  label="留样量" class="number" input-align="right" />
          <p class="g">g</p>
          <van-field readonly v-model="form.sample_person"  label="留样人" input-align="right" />
          <van-field readonly v-model="form.sample_time"  label="留样时间"  input-align="right" />
          <van-field name="uploader" label="留样图片" input-align="right">
                <template #input><van-image v-if="form.sample_img" width="80" height="80" fit="cover" :src="imageUrl+form.sample_img" @click="open(imageUrl+form.sample_img)"/>  <img v-else :src="img"> 
                 </template>
         </van-field>
          
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
      sample_code:'',
      form:'',
      img:require('../../../assets/img/moren.png'),
    };
  },
   created() {
     this.sample_code=this.$route.query.id;
      console.log(1111)
    this.getDate()
  },
  methods: {
    getDate(){
      if(this.sample_code){
        axios.get('app/foodsample/single', {sample_code:this.sample_code}).then(v => {
        this.form=v.data.foodSourceSample;
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
.number{
  /deep/ .van-field__control{
    margin-right: 12px !important;
  }
}
.g{
  position: absolute;
  font-size: 14px;
  top: 115px;
  left: 335px;
}
</style>