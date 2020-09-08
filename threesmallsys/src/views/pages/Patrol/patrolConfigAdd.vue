<template>
  <el-container class="patroladd">
     
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>巡查项配置</h5>
        <div>
             <el-button  class=""  size="small" type="primary" @click="submitForm('formInline')">提交</el-button>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-form :inline="true"  status-icon ref="formInline"  :model="formInline"  class="demo-ruleForm">
        <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">主体类型</el-col>
        <el-col v-if="page.config_code" :span="22" class="tl" :offset="1">
           <el-button  disabled v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.companytag_code)">{{v.companytag_name}}</el-button>  
         </el-col>
          <el-col v-else :span="22" class="tl" :offset="1">
           <el-button  v-for="(v,k) in list_btn" :key="k" :class="activeClass ==k?'active':''" class=""  size="small" @click="IsActive(k,v.companytag_code)">{{v.companytag_name}}</el-button>  
         </el-col>
     </el-row>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">巡查菜单信息</el-col>
          <el-checkbox-group v-model="checkboxGroup1" @change="handleCheckedChange(checkboxGroup1)">
        <el-col v-for="(item,index) in list1" :key="index" :span="9" class="tl" :offset="1">
           <el-checkbox  class="ml10 mb20"  :label="item.name" :value="item.name" :key="item.name" border size="medium">{{item.val}}</el-checkbox>
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
      activeClass:0,
       list_btn:[],
       checked1: true,
        checked2: false,
        checkboxGroup1: [],
        checkboxGroup2:[],
        list:[],
        formInline:{
            companytag_code:'1001574645421581111111101',
            config_content:[],
            config_code:'',
        },
        page:{
            config_code:''
        },
        list1:[
        {name:'record_proof',val:'备案证明（合格,不合格）',val1:['合格','不合格']},
        {name:'food_inspection',val:'加工的首批食品是否进行检验（合格,不合格）',val1:['合格','不合格']},
        {name:'food_inspection_count',val:'每年对其加工的食品检验次数（合格,不合格）',val1:['合格','不合格']},
        {name:'related_credentials',val:'进货查验、保存查验记录及相关凭证（合格,不合格）',val1:['合格','不合格']},
        {name:'ban_production_operation',val:'禁止加工经营（合格,不合格）',val1:['合格','不合格']},
        {name:'production_operation',val:'加工经营（合格,不合格）',val1:['合格','不合格']},
        {name:'waste_disposal',val:'废物处理（合格,不合格）',val1:['合格','不合格']},
        {name:'requirements',val:'小作坊应具备条件（合格,不合格）',val1:['合格','不合格']},
        {name:'ban_food',val:'禁用食品（合格,不合格）',val1:['合格','不合格']},
         {name:'food_label_content',val:'食品标签内容（合格,不合格）',val1:['合格','不合格']},
        {name:'risk_assessment',val:'风险评估（正常,优秀,警告,危险）',val1:['正常','优秀','警告','危险']},
        ]
    }
  },
     created () {
           this.page.config_code=this.$route.query.id;
          
        this.active=this.$route.query.active;
      this.user = local.get('user');
      this.init(this.page)
  },
  methods: {
     init (paramas) {
       axios.get('/api/companytag/all', {state:'1'}).then((v) => {
           this.list_btn=v
       })
         if(this.page.config_code){
              this.formInline.config_code=this.$route.query.id;
             axios.get('/api/patrolConfig/single', paramas).then((v) => {
         this.formInline.companytag_code=v.device.companytag_code
         let aa=JSON.parse(v.device.config_content)
         this.formInline.config_content=JSON.parse(v.device.config_content)
        aa.forEach(element => { this.checkboxGroup1.push(element.name)});
             if(v.device.companytag_code=='1001574645421581111111101'){this.activeClass=0}else
           if(v.device.companytag_code=='1001574645421581111111102'){this.activeClass=1}else
           if(v.device.companytag_code=='1001574645421581111111103'){this.activeClass=2}else
           if(v.device.companytag_code=='1001574645421581111111104'){this.activeClass=3}else
           if(v.device.companytag_code=='1001574645421581111111105'){this.activeClass=4}
      })
         }
        
    },
     IsActive(k,val) {
        this.activeClass = k;
        this.formInline.companytag_code=val;
      },
    handleCheckedChange(val){
        this.list=[];
      this.formInline.config_content=[]
        this.checkboxGroup2=[];
      this.list=this.list.concat(this.checkboxGroup2).concat(val)
       this.list= [...new Set(this.list)]; 
         this.list1.forEach(item1=>{
             this.list.forEach(item2=>{ 
           if(item1.name==item2){ 
              this.formInline.config_content.push(item1)
            }
             })
      })
      this.formInline.config_content= [...new Set(this.formInline.config_content)];
    },
     submitForm(formInline){
          let paramas=this.formInline
         this.$refs[formInline].validate((valid) => {
        if (valid) {
              if(this.page.config_code){
                   axios.put('/api/patrolConfig/update', paramas).then((v) => {
      this.$router.back()
      })
              }else{
                axios.post('/api/patrolConfig/save', paramas).then((v) => {
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
    .active {
       background: #2EC68A;
    border-color: #2EC68A;
    color: #FFFFFF;
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
