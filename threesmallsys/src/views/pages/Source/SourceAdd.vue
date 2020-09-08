<template>
   <el-container class="recordadd p15">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增溯源</h5>
        <div>
          <el-button  class="" size="small" type="primary" @click="submitForm('formInline')">提交审核</el-button>
          <el-button  class="back_btn"  size="small" plain @click="$router.back()">返回</el-button>
        </div>
    </el-header>
    <el-main  class="pt0">
      <el-form  :inline="true" status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">基础信息</el-col>
        
       
        <el-col :span="9" class="tl" :offset="1">
         <el-form-item class="w" label-width="34%" label="购买时间：" size="small" prop="sell_time" :rules="[{required: true,message: '请选择日期', trigger: 'blur' }]">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="formInline.sell_time" format="yyyy-MM-dd hh:mm:ss" value-format="yyyy-MM-dd hh:mm:ss" default-time="12:00:00" @change="change(1,formInline.sell_time)"></el-date-picker>
        </el-form-item>
        </el-col>
         <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="购买人：" size="small" prop="sell_person" :rules="[{required: true,message: '请输入购买人姓名', trigger: 'blur' }]">
         <el-input placeholder="请输入购买人姓名" v-model="formInline.sell_person" class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
           <el-form-item class="w" label-width="34%" label="供应商/店铺：" size="small" prop="supplier_name" :rules="[{required: true,message: '请输入供应商/店铺名称', trigger: 'blur' }]">
           <el-input placeholder="请输入供应商/店铺名称" v-model="formInline.supplier_name" class="input-with-select">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" class="tl" :offset="1">
           <el-form-item class="w" label-width="34%" label="购买地址：" size="small" prop="supplier_address" :rules="[{required: true,message: '请输入购买地址', trigger: 'blur' }]">
           <el-input placeholder="请输入购买地址" v-model="formInline.supplier_address" class="input-with-select">
            </el-input>
          </el-form-item>
        </el-col>
     
     </el-row>
      <el-row class="box mt20  f14 people-message">
         <el-col :span="24" class="recordadd-title bgcfbe tl mb20 pl15">菜品明细</el-col>
         <!-- <el-col :span="24" class="tl"><el-button  class="" size="small" type="primary">添加菜品</el-button></el-col> -->
        <div class="box list">
      <el-form ref="form" :model="form">
       <el-table  ref="table" :data="form.tableData" empty-text='暂无数据'>
          <el-table-column label="菜品种类"  width="130px">
          <template slot-scope="scope">
            <el-form-item >
               <el-select v-model="scope.row.category_name" clearable placeholder="请选择" @change="change(2,scope.row.category_name)">
            <el-option v-for="group in options" :key="group.category_code" :label="group.category_name" :value="group.category_code"> </el-option>
          </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="菜品名称"  width="130px">
          <template slot-scope="scope">
            <el-form-item >
              <el-input v-model="scope.row.product_name" placeholder="请输入菜品名称" type="text"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
         <el-table-column label="图片">
          <!-- <template>
            <el-form-item > -->
              <!-- <el-input v-model="scope.row.text" type="text"></!--> 
          <el-upload
                ref="upload"
                multiple
                action="/api/file/upload"
                 :limit="1"
                  accept="image/png,image/jpg,image/jpeg"
                 :on-exceed="handleExceed"
                :on-success="handlepoll1"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove1"
                :class="{disabled:uploadDisabled1}"
                >
    <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
            <!-- </el-form-item>
          </template> -->
        </el-table-column>
        <el-table-column label="品牌" width="150px">
          <template slot-scope="scope">
            <el-form-item >
              <el-input v-model="scope.row.product_brand" placeholder="请输入品牌名称" ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="规格" width="100px">
          <template slot-scope="scope">
            <el-form-item >
           <el-input v-model="scope.row.product_spec" type="text"  placeholder="请输入规格"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
         <el-table-column label="单位">
          <template slot-scope="scope">
            <el-form-item >
           <el-input v-model="scope.row.product_unit" type="text"  placeholder="请输入单位"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
         <el-table-column label="数量">
          <template slot-scope="scope">
            <el-form-item >
              <el-input v-model="scope.row.sell_count" type="text"  placeholder="请输入数量"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
         <el-table-column label="票据">
          <template slot-scope="">
            <el-form-item >
              <!-- <el-input v-model="scope.row.text" type="text"></!--> 
    <el-upload
                ref="upload"
                multiple
                action="/api/file/upload"
                :limit="1"
                 :on-exceed="handleExceed"
                  accept="image/png,image/jpg,image/jpeg"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                 :class="{disabled:uploadDisabled}"
                >
    <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="180px">
          <template slot-scope="">
             <el-button  class="" size="small" type="primary" @click="savegood">保存</el-button>
          <el-button  class="back_btn"  size="small" @click="cancle" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
      <el-table :data="tableData" style="width: 100%" class="no-header">
         <!-- <el-table-column  prop="p_name" width="30px"></el-table-column> -->
        <el-table-column  prop="category_name" width="130px"></el-table-column>
        <el-table-column prop="product_name" width="130px"></el-table-column>
        <el-table-column width="150px">
               <template slot-scope="scope">
      <img  :src="user.qyurl+scope.row.product_logo" alt="" style="width: 40px;height: 40px">
    </template>
        </el-table-column>
        <el-table-column prop="product_brand" width="100px"></el-table-column>
        <el-table-column prop="product_spec"></el-table-column>
         <el-table-column prop="product_unit"></el-table-column>
        <el-table-column prop="sell_count" ></el-table-column>
        <el-table-column >
              <template slot-scope="scope">
      <img  :src="user.qyurl+scope.row.accessory_url" alt="" style="width: 40px;height: 40px">
    </template>
        </el-table-column>
        <el-table-column width="180px" fixed="right">
          <template slot-scope="scope">
           <!-- <el-button  class="" size="small" type="primary">编辑</el-button> -->
           <el-button  class="back_btn"  size="small" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import axios from '../../../util/api'
import { tengxuncloud } from '../../../util/tengxun'
import { local} from '../../../util/util'
export default {
  data () {
    return {
        options:'',
        user:'',
         uploadDisabled:false,
      uploadDisabled1:false,
        // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      formInline: {
        sell_time: '',
        sell_person: '',
        supplier_name: '',
        supplier_address:'',
        company_code:'',
        foodSourceDetailList: [],
      },
      form: {
        tableData: [
          {
            sell_count: "",
            userset_name: "",
            category_code:'',
            category_name:"",
            product_code:'',
            product_name:'',
            product_logo:'',
            product_brand:'',
            product_spec:'',
            product_unit:'',
            company_code:'',
            produce_name:'',
            accessory_url:'',
          }
        ]
      },
      tableData:[],
       dialogImageUrl: '',
        dialogVisible: false
    }
  },
   created () {
       this.user = local.get('user');
        this.form.tableData[0].company_code=this.$route.query.id;
    this.init()
  },
  methods: {
       init () {
      axios.get('/api/category/all', '').then((v) => { this.options=v })
      
    },
      handleRemove(file, fileList) {
           this.uploadDisabled = false;
      },
      handleRemove1(file, fileList) {
           this.uploadDisabled1 = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        change(index,val){
if(index==1){this.formInline.sell_time=val;}
if(index==2){
     this.form.tableData[0].category_code=val;
      var obj = {}
      obj = this.options.find(function(item){
        return item.category_code === val
      })
      this.form.tableData[0].category_name=obj.category_name;
   }
if(index==3){this.page.department_code=val;}
if(index==4){this.page.business_state=val;}
if(index==6){this.page.search_time_bigen=val;}
if(index==7){this.page.search_time_end=val;}
    },
     handlepoll (response, file, fileList) {
         this.uploadDisabled = true;
          this.form.tableData[0].accessory_url=response.data.visit_url;
    },
      handlepoll1 (response, file, fileList) {
         this.uploadDisabled1 = true;
         this.form.tableData[0].product_logo=response.data.visit_url
        //  this.$set(this.img_list, 0,{accessory_url:`http://${response.Location}`});
    },
     savegood(){
           this.tableData.push({
            sell_count: this.form.tableData[0].sell_count,
            userset_name:  this.formInline.sell_person,
            category_code: this.form.tableData[0].category_code,
            category_name: this.form.tableData[0].category_name,
            product_name: this.form.tableData[0].product_name,
            product_logo: this.form.tableData[0].product_logo,
            product_brand: this.form.tableData[0].product_brand,
            product_spec: this.form.tableData[0].product_spec,
            product_unit: this.form.tableData[0].product_unit,
            company_code: this.form.tableData[0].company_code,
            produce_name: this.form.tableData[0].produce_name,
            accessory_url: this.form.tableData[0].accessory_url,
          });
           this.form.tableData=[{sell_count: '',userset_name:this.formInline.sell_person,category_code:'',category_name:'',product_name:'',product_logo:'',product_brand:'',product_spec:'',product_unit:'', company_code: this.form.tableData[0].company_code,produce_name:'',accessory_url:''}]
        },
         cancle(){ this.form.tableData=[{sell_count: '',userset_name:this.formInline.sell_person,category_code:'',category_name:'',product_name:'',product_logo:'',product_brand:'',product_spec:'',product_unit:'', company_code: this.form.tableData[0].company_code,produce_name:'',accessory_url:''}]},
          handleDelete(index){ //删除行数
            this.tableData.splice(index, 1)
        },
         submitForm(formInline){
          let paramas={
          sell_time: this.formInline.sell_time,
        sell_person: this.formInline.sell_person,
        supplier_name: this.formInline.supplier_name,
        supplier_address:this.formInline.supplier_address,
        company_code:this.form.tableData[0].company_code,
        foodSourceDetailList:this.tableData,
        }
         this.$refs[formInline].validate((valid) => {
        if (valid) {
          axios.post('/api/foodsource/save', paramas).then((v) => {
      this.$router.back()
      })
        }
         })
      
      },
       handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 张图片，共选择了 ${files.length + fileList.length} 张图片`);
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
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recordadd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
 /deep/ .el-checkbox-button__inner{    border-left: 1px solid #DCDFE6;
    border-radius: 4px !important;}
   /deep/ .no-header .has-gutter{display: none}
  .people-message .el-form-item { margin-bottom: 0px;}
  .recordadd-upload{width: 160px;height: 160px;float: left;margin-right: 10px;
   /deep/ .el-upload{width: 160px;height: 160px;line-height: 160px;}}
      /deep/ .disabled .el-upload--text {
    display: none !important;
}
}

</style>