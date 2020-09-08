<template>
  <el-container class="patroladd">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新闻新增</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
        <el-form :inline="false"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
            <el-row class="box mt20  f14">
                <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">新闻</el-col>
                <el-col :span="9" class="tl" :offset="1">
                  <el-form-item class="w" label-width="100px" label="标题：" size="small"  prop="news_title" :rules="[{required: true,message: '请输入新闻名', trigger: 'blur' }]">
                    <el-input placeholder="请输入标题" v-model="formInline.news_title" class="input-with-select" maxlength="50" >
                      </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" class="tl" :offset="1">
                  <el-form-item class="w" label-width="100px" label="状态：" size="small" prop="news_state" >
                  <el-select v-model="formInline.news_state" placeholder="请选择状态">
                    <el-option label="开启" value=1></el-option>
                    <el-option label="关闭" value=2></el-option>
                  </el-select>
                   </el-form-item>
                </el-col>
            </el-row>
            <el-row class="box mt20  f14">
                <el-col :span="22" class="tl" :offset="1">
                  <el-form-item class="w" label-width="100px" label="简介：" size="small"  prop="news_summary" :rules="[{required: true,message: '请输入新闻简介', trigger: 'blur' }]">
                    <el-input type="textarea" placeholder="请输入简介" v-model="formInline.news_summary" class="input-with-select" maxlength="200" show-word-limit></el-input>
                  </el-form-item>                  
                </el-col>
            </el-row>
            <el-row class="box mt20  f14">
              <el-col :span="22" class="tl" :offset="1">
                  <el-row class="box   f14">
                <el-form-item class="w" label-width="100px" label="发布区域：" size="small" >
                <el-col :span="4" class="tl">
                  <el-select v-if="user.province"  disabled  v-model="user.province"></el-select>
                  <el-select v-else v-model="formInline.news_province" placeholder="请选择省级" clearable @change="change(1,formInline.news_province)">
                    <el-option v-for="group in options" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
                  </el-select>
                  </el-col>
                <el-col :span="4" class="tl ml10" >
                    <el-select v-if="user.city"  disabled  v-model="user.city"></el-select>
                    <el-select v-else v-model="formInline.news_city" placeholder="请选择市级" clearable @change="change(2,formInline.news_city)">
                      <el-option v-for="group in options1" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" class="tl ml10"  >
                    <el-select v-if="user.area"  disabled  v-model="user.area"></el-select>
                    <el-select v-else v-model="formInline.news_area" placeholder="请选择区县" clearable @change="change(3,formInline.news_area)">
                      <el-option v-for="group in options2" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
                    </el-select>
                </el-col>  
                  <el-col :span="5" class="tl ml10"  >
                    <el-select v-if="user.town"  disabled  v-model="user.town"></el-select>
                    <el-select v-else v-model="formInline.news_town" placeholder="请选择乡镇" clearable @change="change(4,formInline.news_town)">
                      <el-option v-for="group in options3" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
                    </el-select>
                  </el-col> 
                  <el-col :span="5" class="tl ml10"  >
                      <el-select v-if="user.vill"  disabled  v-model="user.vill"></el-select>
                      <el-select v-else v-model="formInline.news_vill" placeholder="请选择社区" clearable @change="change(5,formInline.news_vill)">
                        <el-option v-for="group in options4" :key="group.region_code" :label="group.region_name" :value="group.region_code"> </el-option>
                      </el-select>
                  </el-col> 
              </el-form-item>
                  </el-row>
              </el-col>
            </el-row>
            <el-row class="box mt20  f14">
                <el-col :span="22" class="tl" :offset="1">
                  <el-form-item class="w" label-width="100px" label="内容：" size="small"  >
                   <Editor v-model="formInline.news_content" ></Editor>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row class="box mt20  f14">
                <el-col :span="22" class="tl" :offset="1">
                  <el-form-item class="w" label-width="100px" label="新闻栏目：" size="small"  prop="news_category_code" :rules="[{required: true,message: '请选择新闻栏目', trigger: 'change' }]">
                    <el-select v-model="formInline.news_category_code" placeholder="请选择" @change="selectNewsCategory()"> 
                      <el-option
                        v-for="item in news_category"
                        :key="item.news_category_code"
                        :label="item.news_category_name"
                        :value="item.news_category_code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row class="box mt20  f14">
                <el-col :span="22" class="tl" :offset="1">
                    <el-form-item class="w" label-width="100px" label="分类：" size="small"  prop="companytype_codes" :rules="[{type: 'array',required: true,message: '请选择分类', trigger: 'change' }]">
                      <el-checkbox-group v-model="formInline.companytype_codes">
                        <el-checkbox v-for="item in companytype" :label="item.companytype_code" :key="item.companytype_code">
                            {{item.companytype_name}}
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="box mt20  f14">
                <el-col :span="22" class="tl" :offset="1">
                  <el-form-item class="w" label-width="100px" label="新闻封面：" size="small"  prop="news_category_name" >
                    <el-upload
                      class="avatar-uploader"
                       accept="image/png,image/jpg,image/jpeg"
                      action="/api/file/upload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :on-remove="handleRemove"
                      >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { tengxuncloud } from '../../../util/tengxun'
import {local} from '../../../util/util'
import Editor from '../Train/Editor'
export default {
    components: {Editor},
  data () {
    return {
      formInline: {
        news_title: '',
        news_imgurl: '',
        news_content: '',
        news_state: '1',
        news_summary: '',
        news_category_code: '',
        news_category_name: '',
        companytype_codes: [],        
        news_vill:''
      },
      options:'',
      options1:'',
      options2:'',
      options3:'',
      options4:'',
      news_category: [],
      companytype: [],
      user:'',
      imageUrl: ''
    }
  },
  created () {
    this.user = local.get('user');
    this.init()
  },
  methods: {
    init () {
      axios.get("/api/newsCategory/all").then(v => {
        this.news_category = v
      })
      axios.get("/api/companytype/all").then(v => {
        this.companytype = v
      })
      if(this.user.province!=null){this.formInline.news_province=this.user.province;}
      if(this.user.city!=null){this.formInline.news_city=this.user.city;}
      if(this.user.area!=null){this.formInline.news_area=this.user.area;}
      if(this.user.town!=null){this.formInline.news_town=this.user.town;}
      if(this.user.vill!=null){this.formInline.news_vill=this.user.vill;}
      this.getProvince();
    },
    change(index,val){
      let mythis = this
       if(index==1){
            this.getProvince(val,'2')
        this.options.forEach(item=>{
         if(item.region_code==val){mythis.formInline.news_province=item.region_name;}
        })
         this.formInline.news_city='';
         this.formInline.news_area='';
          this.formInline.news_town='';
           this.formInline.news_vill=''
       }
        if(index==2){
       this.getProvince(val,'3')
        this.options1.forEach(item=>{
         if(item.region_code==val){mythis.formInline.news_city=item.region_name;}
        })
         this.formInline.news_area='';
          this.formInline.news_town='';
           this.formInline.news_vill=''
        }
       if(index==3){
       this.getProvince(val,'4')
        this.options2.forEach(item=>{
         if(item.region_code==val){mythis.formInline.news_area=item.region_name;}
        })
          this.formInline.news_town='';
           this.formInline.news_vill=''
       }
         if(index==4){
          this.getProvince(val,'5')
        this.options3.forEach(item=>{
         if(item.region_code==val){mythis.formInline.news_town=item.region_name;}
        })
           this.formInline.news_vill=''
        }
         if(index==5){
            this.options4.forEach(item=>{
         if(item.region_code==val){mythis.formInline.news_vill=item.region_name;}
        })
        }
     },
     submitForm(formInline){
        let paramas=this.formInline
        this.$refs[formInline].validate((valid) => {
        if (valid) {
          paramas.companytype_codes = paramas.companytype_codes.join(",")
          axios.post('/api/news/save', paramas).then((v) => {
            this.$router.back()
         })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.formInline.news_imgurl = res.data.visit_url.substring(res.data.visit_url.indexOf("resources"))
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove () {

    },
    selectNewsCategory () {
      this.news_category.forEach(v => {
        if (v.news_category_code == this.formInline.news_category_code) {
          this.formInline.news_category_name = v.news_category_name
        }
      })
    },
       getProvince(val,index){
        axios.get('/api/region/list',{region_high_code:val,region_type:index}).then((v) => {
          if(index=='2'){this.options1=v;
          let city=this.formInline.news_city
          if(city){
             this.options1.forEach(item=>{
               if(item.region_name==city){
                  this.getProvince(item.region_code,'3')
               }
             })
           }}
          else if(index=='3'){
            this.options2=v;
            let area=this.formInline.news_area
          if(area){
             this.options2.forEach(item=>{
               if(item.region_name==area){
                  this.getProvince(item.region_code,'4')
               }
             })
           }
          }
          else if(index=='4'){this.options3=v;
          let town=this.formInline.news_town
          if(town){
             this.options3.forEach(item=>{
               if(item.region_name==town){
                  this.getProvince(item.region_code,'5')
               }
             })
           }}
          else if(index=='5'){this.options4=v;}
          else{this.options=v
            let province=this.formInline.news_province
           if(province){
             this.options.forEach(item=>{
               if(item.region_name==province){
                  this.getProvince(item.region_code,'2')
               }
             })
           }
          }
       
      })
      }
  }
}
</script>
<style lang="scss">
.patroladd{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}

}

.avatar-uploader .el-upload {
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
    width: 160px;
    height: 160px;
    line-height: 160px;
}
.el-upload .el-icon-plus{
  display: inline;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
