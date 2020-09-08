<template>
  <div class="bigBox">
    <Nav v-if="form.use_code" title="编辑食品添加剂使用记录" />
    <Nav v-else title="新增食品添加剂使用记录" />
    <div class="information bgcfff">
     <van-form validate-first @submit="onSubmit"  @failed="onFailed">  
        <div class="card1  p15 f16 pr">
          <van-field readonly clickable label="添加剂使用日期"  v-model="form.use_time" placeholder="请选择添加剂使用日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择添加剂使用日期' }]"  @click="showdate1Picker = true"/>
          <van-field  v-model="form.product_name"  label="产品名称" placeholder="请输入产品名称" input-align="right" @input="form.product_name=form.product_name.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入产品名称' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入特殊符号' }]" />
          <van-field  v-model="form.product_batch"  label="产品批量（kg或L）" placeholder="请输入产品批量" input-align="right" />
          <van-field  v-model="form.additive_name"  label="食品添加剂名称" placeholder="请输入食品添加剂名称" input-align="right"/>
          <!-- <van-field  v-model="form.produce_unit"  label="原辅料加工单位" placeholder="请输入原辅料加工单位" input-align="right"   /> -->
          <van-field  v-model="form.additive_no"  label="添加剂加工日期（批号）" placeholder="请输入添加剂加工日期（批号）" input-align="right" />
          <van-field v-model="form.regulations_dose"  label="GB2760规定的该添加剂使用限量" placeholder="请输入GB2760规定的该添加剂使用限量" input-align="right"/>
          <van-field  v-model="form.reality_dose"  label="该批产品添加剂实际使用量（g或ml）" placeholder="请输入该批产品添加剂实际使用量（g或ml）" input-align="right" />
          <van-field  v-model="form.personnel_sign"  label="配料（投料）人员" placeholder="请输入配料（投料）人员" input-align="right"  />
          <van-field  v-model="form.effect"  label="作用" placeholder="请输入作用" input-align="right"  />
          <van-field readonly clickable label="登记时间"  v-model="form.register_time" placeholder="请选择登记时间" input-align="right" right-icon="arrow"  @click="showdate2Picker = true"/>
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
          <van-col v-if="form.use_code" span="24"><van-button v-show="loadButton"  block type="primary" native-type="submit"> 编辑食品添加剂使用记录</van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
          <van-col v-else span="24"><van-button v-show="loadButton"  block type="primary" native-type="submit"> 新增食品添加剂使用记录</van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
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
        use_code:'',
        use_time:'',
        additive_name:'',
        product_name:'',
        product_batch:'',
        additive_no:'',
        regulations_dose:'',
        reality_dose:'',
        personnel_sign:'',
        effect:'',
        register_time:'',
        note:'',
        accessoryList:[]
      },
      accessory_url:[],
      loadButton:true,
    };
  },
   created() {
     this.form.company_code=this.$route.query.id;
      this.form.use_code=this.$route.query.id1;
     this.getDate()
  },
  methods: {
     onFailed(errorInfo) {
      this.$toast(errorInfo.errors[0].message);
    },
    getDate(){
      if(this.form.use_code){
        
        axios.get('app/standingbook/additiveuse/single', {use_code:this.form.use_code}).then(v => {
        this.form=v.data.additiveUse;
        if(v.data.additiveUse.accessoryList.length>0){
          v.data.additiveUse.accessoryList.forEach(item=>{
           this.accessory_url.push({url:this.imageUrl+item.accessory_url})
          })
        }
      })
      }  
    },
     onSubmit() {
       this.loadButton=false;
       if(this.form.use_code){
        axios.put('app/standingbook/additiveuse/update', this.form).then(() => {
         this.loadButton=true;
         this.$router.back()
        })
       }else{
           axios.post('app/standingbook/additiveuse/save', this.form).then(() => {
         this.loadButton=true;
        this.$router.back()
      })
       }
      
     
    },

    onConfirm(value){
      if(this.showdate1Picker===true){this.form.use_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false}
       if(this.showdate2Picker===true){this.form.register_time= formatDate(value, 'yyyy-MM-dd');this.showdate2Picker=false}
     
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