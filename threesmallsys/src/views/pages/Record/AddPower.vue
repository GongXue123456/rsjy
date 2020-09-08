<template>
   <el-container class="recordadd ">
       <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>人员管理</h5>
         <div><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
      </el-header>
      <el-main class="p15 pt0">
       <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">    
      <el-row class="box mt20  f14 people-message">
         <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">人员信息</el-col>
       <div class="box list">
      <el-form ref="form" :model="form" >
       <el-table  ref="table" :data="form.List" style="width:100%" empty-text='暂无数据'>
          <el-table-column label="姓名">
           <template slot-scope="scope">
            <el-form-item size="small" :prop="'List.' + scope.$index + '.name'" :rules="[{required: true, message: '姓名信息为空,需重新备案', trigger: 'blur' }]">
              <el-input placeholder="请输入姓名" clearable  v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
         <el-table-column label="健康证明">
          <el-upload class="health_url"
                ref="upload"
                multiple
                fit="fill" style="width: 70px;height: 40px"
                action="/api/file/upload"
                 accept="image/png,image/jpg,image/jpeg"
                 :limit="1"
                 :before-upload="beforeAvatarUpload"
                  list-type="picture-card"
                :on-success="handlepoll11"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove11"
                :class="{disabled:uploadDisabled11}"
                >

<!-- 
                <el-upload class="health_url"
                ref="upload"
                multiple
                fit="fill" style="width: 70px;height: 40px"
                action="/api/file/upload"
                 :limit="1"
                  list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                accept="image/png,image/jpg,image/jpeg"
                :on-success="handlepoll11"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove11"
                :class="{disabled:uploadDisabled11}"
                > -->
             <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
           <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
        </el-table-column>
        
         <el-table-column label="健康证有效期">
          <template slot-scope="scope">
            <el-form-item   size="small" :prop="'List.' + scope.$index + '.time'" :rules="[{required: true, message: '有效期信息为空,需重新备案', trigger: 'blur' }]">
          <el-date-picker type="date" clearable placeholder="选择有效期至" v-model="scope.row.time"   format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
        </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="">
             <el-button  class="" size="small" type="primary" @click="savepeople">保存</el-button>
          <el-button  class="back_btn"  size="small" plain @click="cancle">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
      <el-table :data="list" style="width: 100%" class="no-header">
        <el-table-column   prop="employ_name" >
             <template slot-scope="scope">
                            <span v-if="scope.row.employ_flag">
                                <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel.employ_name">
                                </el-input>
                            </span>
                            <span v-else>{{scope.row.employ_name}}</span>
                        </template>
        </el-table-column>
        <el-table-column >
             <template slot-scope="scope">
                 <el-upload v-if="scope.row.employ_flag" class="health_url"
                ref="upload"
                :file-list="fileList"  
                fit="fill" style="width: 70px;height: 40px"
                action="/api/file/upload"
                 accept="image/png,image/jpg,image/jpeg"
                 :limit="1"
                  list-type="picture-card"
                :on-success="handlepoll11"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove11"
                :class="{disabled:uploadDisabled11}"
                >
       <el-button size="small" type="primary">点击上传</el-button>
</el-upload>

           <el-image v-else :src="user.qyurl+scope.row.employ_health_url" fit="fill" :preview-src-list="[user.qyurl+scope.row.employ_health_url]"  style="width: 40px;height: 40px"></el-image>
             </template>
        </el-table-column>
        <el-table-column prop="user_health_datedue" >
              <template slot-scope="scope">
            <el-form-item  v-if="scope.row.employ_flag"  size="small" >
          <el-date-picker type="date" clearable placeholder="选择有效期至" v-model="master_user.sel.user_health_datedue"   format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
        </el-form-item>
        <span v-else>{{scope.row.user_health_datedue}}</span>
          </template>
        </el-table-column>
        
        <el-table-column fixed="right">
          <template slot-scope="scope">
              <el-button v-if="scope.row.employ_flag" class=""  size="small" type="primary"  @click="handleUpdate(scope.row,scope.$index)">保存</el-button>
            <el-button v-else class=""  size="small" type="primary"  @click="handleEdit(scope.row,scope.$index,true)">编辑</el-button>       
           <el-button  class="back_btn"  size="small" plain  @click="handleDelete(scope.$index, scope.row.employ_code)">删除</el-button>
         </template>
        </el-table-column>
      </el-table>

    </div> 
     </el-row>

     </el-form> 
</el-main>
   </el-container>
</template>
<script>
import Vue from 'vue'
import axios from '../../../util/api'
import Globle from '@/components/Globle'
import { local,objKeySort } from '../../../util/util'
let defaultDate;
export default {
  data () {
    return {
      menu_btns:Globle.menu_btns,
      uploadDisabled11: false,
      list:[],
      fileList:[],
      formInline: {
        company_code:'',
        employ_code:'',
         employ_name:'',
        employ_health_url:'',
        user_health_datedue: '',
      },
      user:'',
     form: {List: [{name: '',healthimg:'',time:''}]},
       dialogImageUrl: '',
        dialogVisible: false,
         dialogVisible1: false,
        pickerOptionsEnd: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
      master_user: {
                    sel: null,//选中行   
                },
    }
  },
   created () {
      this.user = local.get('user');
       this.formInline.company_code=this.$route.query.id;
    this.init()
    
    
  },
  methods: {
    init () {
      axios.get('/api/companyEmploy/list', {company_code:this.formInline.company_code}).then((v) => {
          this.list=v
      }).catch(() => {})
    },
    cancle(){ this.form.List=[{name: '',healthimg:'',time:''}]},
     savepeople(form){
       this.$refs.form.validate(variable => {
         if (variable) {
           if(this.form.List[0].healthimg==''){
            this.$notify.error({
                title: '证件照片信息为空',
                message: '',
                duration: 4500
              })
              return false
           }else{
             this.formInline.employ_health_url=this.form.List[0].healthimg.substring(this.form.List[0].healthimg.indexOf("resources")),
             this.formInline.employ_name=this.form.List[0].name,
             this.formInline.user_health_datedue=this.form.List[0].time
           this.form.List=[{name: '',healthimg:'',time:''}]
           this.handleRemove11()
           this.$refs.upload.clearFiles();
           axios.post('/api/companyEmploy/save', this.formInline).then((v) => {
          this.init()
          }).catch(() => {})
           }
          }else{return}
        })
       },
       handleEdit(row, index, cg) {
                     if(row.employ_health_url!=''){this.form.List[0].healthimg=row.employ_health_url;this.fileList=[{url:this.user.qyurl+row.employ_health_url}];this.uploadDisabled11=true}
                     this.master_user.sel = JSON.parse(JSON.stringify(row));
                        row.employ_flag = true;
                },
                handleUpdate(row, index){
        this.formInline.employ_code=row.employ_code;
         this.formInline.employ_name=this.master_user.sel.employ_name;
        this.formInline.employ_health_url=this.form.List[0].healthimg;
        this.formInline.user_health_datedue=this.master_user.sel.user_health_datedue;
  axios.put('/api/companyEmploy/update', this.formInline).then((v) => {
         this.init()
          }).catch(() => {})
                },
         handleDelete(index,val){ //删除行数
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
             axios.delete('/api/companyEmploy/delete', {employ_code:val}).then((v) => {

         this.init()
          }).catch(() => {})

        }).catch(() => {        
        });
           
        },
      handleRemove11(file, fileList) {
          this.uploadDisabled11 = false;
          this.form.List[0].healthimg=''
      },
      handlepoll11 (response, file, fileList) {
         this.uploadDisabled11 = true;
          this.form.List[0].healthimg=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))
    },
   
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible1 = true;
      },
     beforeAvatarUpload(file) {
        const isLt20M = file.size / 1024 / 1024 < 20;

        if (!isLt20M) {
          this.$message.error('上传头像图片大小不能超过 20MB!');
        }
        return isLt20M;
      },
  }
}
</script>
<style lang="scss" scoped>
.recordadd{
   overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
  }
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recordadd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
 /deep/ .el-checkbox-button__inner{    border-left: 1px solid #DCDFE6;
    border-radius: 4px !important;}
   /deep/ .el-table.no-header .el-table__header{display: none}
  .people-message .el-form-item { margin-bottom: 0px;}
  .recordadd-upload{width: 160px;height: 160px;float: left;margin-right: 10px;
  .disabled{height: 100%;}
   /deep/ .el-upload{width: 160px;height: 160px;line-height: 160px;}
    /deep/ .el-upload-list--picture-card .el-upload-list__item{width: 160px;height: 160px;}
   }
    .health_url{
     /deep/ .el-upload--picture-card{width: 70px;height: 40px;
     background-color: transparent;
    border: none;
     .el-button--small{position: absolute;left: 10px;margin-top: 4px;}}
/deep/ .el-upload-list--picture-card .el-upload-list__item{width: 70px;height: 40px;}
   } 
    .cell .is-error{padding-bottom: 20px}
   /deep/ .disabled .el-upload--picture-card {
    display: none !important;
}
  .el-image{width: 160px; height: 160px;margin-right: 10px}

.el-checkbox-button{margin-bottom: 10px}
}

</style>