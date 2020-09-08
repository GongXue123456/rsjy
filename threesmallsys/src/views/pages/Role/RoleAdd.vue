<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>新增权限</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">权限信息</el-col>
        <el-col :span="9" class="tl" :offset="1">
        <el-form-item class="w" label-width="34%" label="权限名称：" size="small"  prop="role_name" :rules="[{required: true,message: '请输入小作坊名称', trigger: 'blur' },{ pattern: /^[\u4e00-\u9fa5]+$/, message: '权限名称请输入中文' }]">
           <el-input placeholder="权限名称" v-model="formInline.role_name" clearable class="input-with-select">
            </el-input>
        </el-form-item>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">权限菜单信息</el-col>
          <el-checkbox-group v-model="checkboxGroup1" @change="handleCheckedChange(checkboxGroup1)">
        <el-col  v-for="(item,index) in menu_list" :key="index"  :span="22" class="tl" :offset="1">
           <div v-if="item.menu_type==1" class="patroladd-title1 f14 bgcfbe tl mb20 pl15">{{item.menu_title}}</div>
           <el-checkbox  v-if="item.menu_type==2" class="ml10 mb20 disib"  :label="item.menu_code" :value="item.menu_code" :key="item.menu_code" border size="medium">{{item.menu_title}}</el-checkbox>
           <el-col  :span="22"  v-if="item.menu_type==2">
             <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
  
  <el-checkbox-group  v-if="item.menubutton_list.length>0" v-model="checkboxGroup3" @change="handleCheckedChange1(item.menu_code,checkboxGroup3)">
    <p class="f14 ml10 mb20 fb">页面按钮权限</p>
    <el-col :span="4"   v-for="(city,index) in item.menubutton_list" :key="index" class="disib mb20 ml10" >
      <el-checkbox  :label="city.menubtn_code" :value="city.menubtn_code" border size="medium" >{{city.menubtn_title}}</el-checkbox>
    </el-col>
    
  </el-checkbox-group>
           </el-col>
        </el-col>
        
        </el-checkbox-group>
     </el-row>
     </el-form>
     </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
export default {
  data () {
    return {
      menu_list:'',
      aa:[],
      bb:[],
      cc:[],
        formInline: {
            role_code:'',
          role_name:'',
          menu_list:[]
      },
       checked1: true,
        checked2: false,
        checkboxGroup1: [],
        checkboxGroup3: [],
        checkboxGroup2:[],
        checkboxGroup4: [],
        list:[],
        list1:[]
    }
  },
     created () {
      this.user = local.get('user');
       this.formInline.role_code=this.$route.query.id;
     this.init()
  },
  methods: {
     init (params) {
          axios.get('/api/menu/all', {role_code:''}).then((v) => {
        this.menu_list=v.menu_list;
      })
       if(this.formInline.role_code){
          axios.get('/api/role/single',{role_code:this.formInline.role_code}).then((v) => {
              this.formInline.role_name=v.role.role_name
v.role.menu_list.forEach(item=>{
      this.formInline.menu_list.push({menu_btns_list:item.menu_btns_list,menu_code:item.menu_code})
      
    if(item.menu_type==2){
        this.checkboxGroup1.push(item.menu_code)
         this.checkboxGroup4=this.checkboxGroup1; 
        item.menu_btns_list.forEach(item1=>{
          this.checkboxGroup3.push(item1)
        })
    }
})
      })    
       } 
    },
    getArrDifference(arr1, arr2) {
        return arr1.concat(arr2).filter(function(v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
        });
    },
    handleCheckedChange(val){
      let aaa;
      var len1=val.length
      var len2=this.checkboxGroup4.length;
      this.getArrDifference(val,this.checkboxGroup4).forEach(item=>{
       aaa=item
      })
       this.bb=[];
       this.cc=[];
        this.list=[];
        this.checkboxGroup2=[];
        this.checkboxGroup3=[];
      this.menu_list.forEach(item=>{
          val.forEach(item1=>{
              if(item.menu_code==item1){
                  this.checkboxGroup2.push(item.menu_parentcode)
              }
          })
      })
      this.list=this.list.concat(this.checkboxGroup2).concat(val)
       this.list= [...new Set(this.list)];
         
       if(len1>len2){
         this.menu_list.forEach(param=>{
          if(param.menu_code==aaa){
             this.bb.push({menu_btns_list:[],menu_code:param.menu_parentcode})
            param.menubutton_list.forEach(item=>{
              this.cc.push(item.menubtn_code)
                this.cc= [...new Set(this.cc)];
            })
          }
        })
         this.formInline.menu_list.push({menu_btns_list:this.cc,menu_code:aaa})
         this.bb.forEach((v)=>{
         let ss = this.formInline.menu_list.find(c=>c.menu_code==v.menu_code);
          if(!ss){
            this.formInline.menu_list=this.formInline.menu_list.concat(this.bb)
          }
         })
    
       this.formInline.menu_list.forEach(param1=>{
          param1.menu_btns_list.forEach(item1=>{
            if(item1.length>0){
 this.checkboxGroup3.push(item1)
            }
        })

        })
      }else{
        this.formInline.menu_list.forEach(param=>{
          if(param.menu_code==aaa){
            param.menu_btns_list=[]
          }
          param.menu_btns_list.forEach(item1=>{
          this.checkboxGroup3.push(item1)
        })
          this.list.forEach(item2=>{
            if(item2==param.menu_code){
              this.bb.push({menu_btns_list:param.menu_btns_list,menu_code:item2})
            }
          })
        })
        this.formInline.menu_list=this.bb
      }
      this.checkboxGroup4=val
    },
      handleCheckedChange1(val,val1){
        this.list1=[];
          this.aa=[];
      this.list1=this.list1.concat(val1)
       this.list1= [...new Set(this.list1)];
                this.menu_list.forEach(item=>{
                 if(item.menu_code==val){
                   item.menubutton_list.forEach(item1=>{
                     this.list1.forEach(item2=>{
                        if(item1.menubtn_code==item2){
                   this.aa.push(item2)
                   this.formInline.menu_list.forEach(item3=>{
                        if(item3.menu_code==val){
                          item3.menu_btns_list=[]
                          item3.menu_btns_list=this.aa
                        }
                   })
                        }
                     })
                   })
                  
               }
             })
    },
     submitForm(formInline){
          let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
              if(this.formInline.role_code){
                   axios.put('/api/role/update', paramas).then((v) => {
      this.$router.back()
      })
              }else{
                axios.post('/api/role/save', paramas).then((v) => {
      this.$router.back()
      })
              }
           
            
        }
         })
      }
  }
}
</script>
<style lang="scss" scoped>
.patroladd{
   overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
  .patroladd-title1{height: 34px;line-height: 34px;}
.el-checkbox{    display: flex;
    justify-content: left;
    align-items: center;}

}

</style>
