<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5 ><span class="lines"></span>自查自纠</h5>
       
    </el-header>
    <el-main class="p15 pt0">
   <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
        <el-col :span="4" class="mr10">
             <el-form-item size="small" >
         <el-input placeholder="企业名称、经营者" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit">
       
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="page.companytag_code" clearable placeholder="主体类型" @change="change(1,page.companytag_code)">
              <el-option v-for="v in options2" :key="v.companytag_code" :label="v.companytag_name" :value="v.companytag_code"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="2" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
       
      </el-form>
    </el-row>
    <div class="box list">
       <div class="tl list_tab ">
          <div v-for="(v,k) in list_btn4" :key="k" class="pr disib mr10">
          <el-button  :class="activeClass ==k?'active':''" size="small" @click="IsActive(k,v.id)">{{v.title}}<span v-if="v.id=='2'" class="list_tag pa disib bgcred cfff">{{count}}</span></el-button>  
          </div>
         </div>
      <el-table border  @selection-change="handleSelectionChange" :data="tableData" 
       ref="multipleTable"
       :select-all="allSelect"
       row-key="company_code"
       :header-cell-class-name="cellClass"
    tooltip-effect="dark" style="width: 100%">
        <el-table-column v-if="activeClass==1"  type="selection"   label="选择" width="60" header-align="center" align="center">
          </el-table-column>
        <el-table-column type="index" align='center' width="60" label="序号"></el-table-column>
       <el-table-column prop="company_name" min-width="150" :show-overflow-tooltip="true"  label="企业名称" align='center'></el-table-column>
        <el-table-column prop="companytag_code"  min-width="150" :show-overflow-tooltip="true"  label="主体类型" align='center' :formatter="userTypeList3" ></el-table-column>
        <el-table-column prop="operator" min-width="100" :show-overflow-tooltip="true" label="经营者" align='center'></el-table-column>
        <el-table-column prop="add_time" min-width="150" :show-overflow-tooltip="true" label="上次自查自纠时间" align='center'></el-table-column>
        <el-table-column  label="操作" class-name='aa' min-width="150"  fixed="right"  align='center'>
          <template slot-scope="scope">
            <el-button v-if="activeClass==0" type="text" class=" disib"  size="mini"  @click="godetail(scope.row.checkself_code,scope.row.company_name)">详情</el-button>
             <el-button v-else-if="activeClass==1" type="text" class="cac" size="small" @click="send(0,scope.row.company_code)">发送提醒</el-button>
            <el-button type="text" class="general_color disib"  size="mini"  @click="goRecord(scope.row.company_code,scope.row.company_name)">自查自纠记录</el-button>
            
         </template>
        </el-table-column>
      </el-table>
      <div class="tl mt20" v-if="activeClass==1">
    <el-button type="primary" class=" disib"  size="small"  @click="toggleSelect(tableData)">全选/反选</el-button>
     <el-button type="primary" class="bgccac disib"  size="small"  @click="send(1)">一键发送</el-button>
</div>
      <div class="i-page fr disib mt20">
        <el-pagination
          background
          :page-size='10'
          layout="total,prev, pager, next"
          :total="total"
          :current-page="currentPage"
         @current-change = 'currentChange'>
        </el-pagination>
      </div>
    </div> 
</el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local,aa } from '../../../util/util'
import Globle from '@/components/Globle'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset: "0",
      company_name: '',
      ischeckself: '1',
     companytag_code:''
      },
      page1:{
        company_code:'',
        checkself_code_list:[]
      },
      selected: "",
      options4:'',
      options2:'',
       activeClass:0,
       list_btn4:[{id:'1',title: '已自查自纠'},{id:'2',title: '未自查自纠'}],
       currentPage: 1,
      total: 0,
      count:'',
      tableData:[],
       multipleSelection: [],
       allSelect:false
    }
  },
    computed: {
    ...mapState({
      checkSelfPage: (state) => state.checkSelf.checkSelfPage
    })
    
  },
   created () {
     var that=this;
      that.page = Object.assign({}, that.checkSelfPage);
          that.currentPage = that.page.pager_offset / 10 + 1;
          that.activeClass=String(that.page.ischeckself)-1
    that.init(that.page)
    that.getCount();
  },
  methods: {
    cellClass(row){     
    if (row.columnIndex === 0&&this.activeClass==1) {           
     return 'disabledCheck'     
    } 
},
       userTypeList3(row){
       if(row.companytag_code=='1001574645421581111111103'){return '食品经营许可证（餐饮）';}else if(row.companytag_code=='1001574645421581111111104'){return '四川省小经营店备案证（餐饮）';}else if(row.companytag_code=='1001574645421581111111101'){return '四川省小作坊备案证';}else if(row.companytag_code=='1001574645421581111111102'){return '四川省小经营店备案证（流通）';}else if(row.companytag_code=='1001574645421581111111105'){return '食品经营许可证（流通）';}
    },
       init (params) {
          var that=this;
          axios.get('/api/checkSelf/list', params).then((v) => {
        that.tableData=v.check_list;
         that.total = v.pager_count;
      }).catch(() => {})
      axios.get('/api/companytag/all', '').then((v) => {
        that.options2=v;
      }).catch(() => {})
    },
     change(index,val){
            var that=this;
if(index==1){that.page.companytag_code=val}
this.onSubmit()
    },
    getCount(){
        axios.get('/api/checkSelf/list', {
        pager_offset: "0",
      company_name: '',
      ischeckself: '2',
     companytag_code:''
      }).then((v) => {
           this.count=v.pager_count
      })
    },
    // 搜索
     onSubmit () { 
        var that=this;
      that.currentPage = 1
      that.page.pager_offset = '0'
      that.$store.dispatch('checkSelf/setNewPage', that.page)
      that.init(that.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('checkSelf/setNewPage', that.page)
      that.init(that.page)
    },
   goRecord(index,val){
    this.$router.push({
        name: "SelfList",
        query: {
          id: index,
          name:val
        }
      });
  },
  goUpdate(index){
    this.$router.push({
        name: "RecordUpdate",
        query: {
          id: index,
          code:'1001574645421581000000001'
        }
      });
  },
  godetail(index,val){
    this.$router.push({
        name: "SelfListDetail",
        query: {
          id: index,
          name:val
        }
      });
  },
    IsActive(k,val) {
      var that=this;
        this.activeClass = k;
           this.page.ischeckself=val;
        that.$store.dispatch('checkSelf/setNewPage', that.page)
      that.init(that.page)
      },
      handleConfirm() {
      let item = this.tableData[this.selected];
     
    },
     handleSelectionChange(val) {
        this.multipleSelection = val.map(item => item.company_code);
      },
       toggleSelect(rows) {
        if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row,
                    !this.allSelect)
            })
            this.allSelect = !this.allSelect
        }
    }, 
    send(index,val){
      if(index==0){
        this.page1.company_code=val;
        this.page1.checkself_code_list=[]
        this.getsend(this.page1)
      }else{
        if(this.multipleSelection.length==0){
          this.$notify({
          title: '提示',
          message: '请选择企业'
        });
        }else{
          this.page1.company_code='';
this.page1.checkself_code_list=this.multipleSelection;
this.getsend(this.page1)
        }
        
      }
    },
    getsend(params){
       axios.post('/api/checkSelf/saveMessLogByNotCS', params).then((v) => {
      }).catch(() => {})
    }
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
   /deep/ .el-checkbox__label {
    display: none !important;
  }
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
   /deep/ .el-table .disabledCheck .cell .el-checkbox__inner{
    display: none !important; 
}

  /deep/ .el-table .disabledCheck .cell::before{
    content: '选择';
    text-align: center;
    line-height: 37px;
}
}

</style>
