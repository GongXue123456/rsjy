<template>
  <el-container class="patroladd container">
    
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>监管部门管理</h5>
        <div>
            <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
    <div class="box mt20 f14">
        <div class="tl c333" >{{list.department_name}}</div>
     </div>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">监管部门信息</el-col>
        
         <el-col :span="24" class="tl mb20" :offset="1">
          <span class="left">监管部门名字：</span><span class="c333">{{list.department_name}}</span>
        </el-col>
         <el-col :span="24" class="tl mb20" :offset="1">
         <span class="left">监管部门地址：</span><span class="c333">{{list.province}}&nbsp;&nbsp;{{list.city}}&nbsp;&nbsp;{{list.area}}&nbsp;&nbsp;{{list.town}}</span>
        </el-col>
        
     </el-row>
     <el-row class="box mt20  f14">
         <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15">人员信息</el-col>
       
         <el-col :span="9" class="tl mb20" :offset="1">
           <span class="left">监管人员：</span><span class="c333" v-for="item in list.userList" :key="item">{{item}}&nbsp;&nbsp;</span>
        </el-col>
        
         <el-col :span="9" class="tl mb20" :offset="1">
         <span class="left">网格信息员：</span> <span class="c333" v-for="item in list.infoList[0].code" :key="item">{{item.user_name}}&nbsp;&nbsp;</span>
        </el-col>
     </el-row>
     </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { tengxuncloud } from '../../../util/tengxun'
export default {
  data () {
    return {
      page: {
       department_code:'',
       region_code:''
      },
      list:'',
    }
  },
  created () {
     this.page.department_code=this.$route.query.id;
     this.page.region_code=this.$route.query.id1;
     this.init(this.page)
  },
  methods: {
     init (params) {
      axios.get('/api/department/detail',params).then((v) => {
       this.list=v
      })
    },
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
  /* .el-form-item--small .el-form-item__content{width: 80%} */

}

</style>
