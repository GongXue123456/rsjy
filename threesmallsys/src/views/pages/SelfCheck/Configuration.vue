<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>自查项配置</h5>
        <div> <el-button  class=""  size="small" type="primary" @click="submitForm('page')">提交</el-button></div>
    </el-header>
    <el-main class="p15 pt0">
    <el-tabs class="mt10" v-model="activeName"  @tab-click="handleClick">
  <el-tab-pane
    v-for="item in editableTabs"
    :key="item.companytype_code"
    :label="item.companytype_name"
    :name="item.companytype_code"
  > 
   <el-row class="box search">
       <el-form :inline="true"  ref="page"  :model="page"  class="demo-form-inline">
         <el-col :span="9" class="tl" :offset="1">
        <el-form-item  class="rules w" label-width="34%" label="自查自纠周期：" clearable size="small"  prop="calc_period" :rules="[{required: true,message: '请输入自查自纠周期',trigger: ['blur','change'] }]" >
           <el-input  style="width:60%" placeholder="请输入周期天数" v-model="page.calc_period" class="input-with-select mr20" @change="changenum(page.calc_period)">
            </el-input>天
        </el-form-item>
        </el-col>
         <el-col :span="22" :offset="1" class="tl">
        <el-form-item class="checkbox"   size="small" >
          <div v-for="(item,index) in list1"  :key="index">
             <el-col :span="24" class="patroladd-title bgcfbe tl mb20 pl15 mt10">
                 <el-checkbox  class="mr10 "   v-model="item.checked"  :checked="item.checked" @change="handleCheckAllChange(item.checked,item.page_config_code)">{{item.page_config_name}}</el-checkbox>
             </el-col>
             <el-col :span="9" class="mb10 " v-for="(item1,index) in item.page_config_content"  :key="'info2-'+index"  >
                <el-checkbox-group  v-model="checkedCities" @change="handleCheckChange(checkedCities,item.page_config_code,item1.attr_ch)">
                 <el-checkbox class=""  border :value="item1.attr_ch" :label="item1.attr_ch"  >{{item1.attr_ch}}</el-checkbox>
</el-checkbox-group>
                  <!-- <el-checkbox-group  v-model="item.checkedCities" @change="handleCheckedCitiesChange(item.checkedCities,item.id)">
          <el-checkbox class="mr10"  v-for="(item1,index) in item.page_config_content" :key="index" :value="item1.attr_ch" :label="item1.attr_ch">{{item1.attr_ch}}</el-checkbox>
        </el-checkbox-group> -->
             </el-col>
          </div>
        </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="box list">
       

      
    </div> 
  </el-tab-pane>
</el-tabs>
</el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local,remove,objKeySort } from '../../../util/util'
import Globle from '@/components/Globle'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeName:'1001574645421581000000001',
       
       page:{
        calc_period:'',
       },
      formInline:{
        companytype_code:'1001574645421581000000001',
        check_self_list:[]
      },
      options4:'',
      options2:'',
      menu_btns:Globle.menu_btns,
       activeClass:0,
      editableTabs: [],
      list1:[],
      checkALL:[],
      checkedCities:[],
      check_self_list:[]
    }
  },
    computed: {
   
    
  },
   created () {
     var that=this;
     that.activeName='1001574645421581000000001'
    that.init()
  },
  methods: {
       init (params) {
          var that=this;
          axios.get('/api/companytype/all', '').then((v) => {that.editableTabs=v 
          that.getdate(that.activeName)
          })

    },
    getdate(params){
       var that=this;
        axios.get('/api/pageConfigRegion/checkSelf/single', {companytype_code:params}).then((v) => {
        this.list1=v.page_config_region_list;
         this.list1.forEach(item=>{
           this.page.calc_period=item.calc_period;
            if(item.page_region_content!=null){
               item.checked=true;
              this.checkALL.push(item.page_config_region_code)
              item.page_region_content.forEach(item1=>{
             
             this.checkedCities.push(item1.attr_ch)
             this.checkList()
          })
            }else{
 item.checked=false;
            }
          
         }) 
         })
    },
    changenum(val){
      this.formInline.check_self_list.forEach(item=>{
             item.calc_period=val
      })
    },
    handleCheckAllChange(val,val1) {
        this.list1.forEach(item=>{
         if(val){
          item.page_config_content.forEach(item1=>{
           if(item.page_config_code==val1){
            this.checkALL.push(item.page_config_region_code)
            this.checkedCities.push(item1.attr_ch)
          
           }
          })

         }else{
          item.page_config_content.forEach(item1=>{
            if(item.page_config_code==val1){
              item.checkedCities=[]
               this.checkALL.remove(item.page_config_region_code)
               this.checkedCities.remove(item1.attr_ch)
              
            }
          })
  
         }
        })
          this.checkALL= [...new Set(this.checkALL)];
          this.checkedCities= [...new Set(this.checkedCities)];
          this.checkList()
      },

      handleCheckChange(val,val1,val2){
          this.checkedCities=[]
         let checkedCount = val.length;
        this.list1.forEach(item1=>{
           item1.page_config_content.forEach(item2=>{
          if(item1.page_config_code==val1){
            if(checkedCount==0){
             item1.checked=!item1.checked
              this.checkALL.remove(item1.page_config_region_code)
               this.checkedCities=val
            }else{
               this.checkedCities=val;
               if(val.indexOf(val2) == -1){
                  item1.checked=false
                  this.checkALL.remove(item1.page_config_region_code)
               }else{
                  item1.checked=true
                  this.checkALL.push(item1.page_config_region_code)
               }
            }
              }})
        })
       this.checkALL= [...new Set(this.checkALL)];
          this.checkedCities= [...new Set(this.checkedCities)];
           this.checkList()
},
     handleClick(val) {
       this.checkALL=[];
        this.checkedCities=[];
       this.formInline.companytype_code=this.activeName;
         this.getdate(this.activeName)
    },
    checkList(){
       this.check_self_list=[]
         this.checkALL.forEach(item=>{
          this.check_self_list.push(objKeySort({calc_period:this.page.calc_period,page_config_region_code:item,page_region_content:[]}))
         })
          this.check_self_list.forEach(item1=>{
              this.list1.forEach(item2=>{
                 item2.page_config_content.forEach(item3=>{
                    this.checkedCities.forEach(item4=>{
                      if(item3.attr_ch==item4){
                        if(item1.page_config_region_code==item2.page_config_region_code){
                              item1.page_region_content.push({
                                attr_en:item3.attr_en,
                                attr_ch:item3.attr_ch,
                                attr_val:item3.attr_val
                              })
                        }
                         
                      }
                    })
                 })
              })
           })
         
          this.formInline.check_self_list=this.check_self_list
    },
       submitForm(page){
         let paramas=this.formInline;
          axios.put('/api/pageConfigRegion/checkSelf/update', paramas).then((v) => {})
      },
  }
}
</script>
<style lang="scss" scoped>
.shopList{
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
  .list_tab{
    padding: 10px;
    background-color:  #f5f7fa;
    .list_tag{
    right: -10px;
    padding:2px 6px;
    border-radius: 10px;
    top: -10px;}
  }
    .patroladd-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
   /deep/ .checkbox .el-form-item__content{width: 100%}

 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
}

</style>
