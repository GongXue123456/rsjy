<template>
  <el-container class="recorddetail">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>溯源管理</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0 pr">
    <div class="box title mt20 mb20 f16">
        <!-- <div v-if="list.vedio" class="tl c333" @click="gomonitordetail">{{list.company_name}}<img src="../../../assets/image/shexiang.png"></div> -->
        <div class="tl c333">{{company_name}}</div>
     </div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    
    <el-tab-pane label="溯源信息" name="first">
       <el-row class="box mb15  f14">
        <!-- <el-col class="fr  tr" :span="24"><el-button type="primary" size="small" @click="SourceAdd">新增溯源</el-button></el-col> -->
      </el-row>
 <el-collapse accordion v-if="list1.length>0">
  <el-collapse-item v-for="(item,index) in list1" :key="index">
    <template slot="title">
     <el-row class="w tl pl10 flex">
  <el-col :span="6">购买时间：{{item.sell_time}}</el-col>
  <el-col :span="4">产品种类：{{item.foodSourceDetailList.length}}</el-col>
  <el-col :span="4">购买人：{{item.sell_person}}</el-col>
  <el-col :span="7" class="lh150">购买地址：{{item.supplier_address}}</el-col>
  <!-- <el-col :span="3" class="lh150 "><el-button  class="back_btn" size="small" plain @click.stop="checkSample(item.foodsource_code)">查看留样</el-button></el-col> -->
</el-row>
    </template>
      <el-table border
    :data="item.foodSourceDetailList"
    style="width: 100%;margin-bottom: 20px;"
   >
    <el-table-column
    width="80px"
    align='center'
     type="index"
      label="序号">
    </el-table-column>
    <el-table-column
      prop="img"
      align='center'
      label="图片">
       <template slot-scope="scope">
      <img v-if="scope.row.product_logo==='undefined'||scope.row.product_logo===''||scope.row.product_logo==='null'"  src="../../../assets/image/source.png"   style="width: 40px;height: 40px"/>
      <el-image v-else style="width: 40px;height: 40px" :src="user.qyurl+scope.row.product_logo" :preview-src-list="[user.qyurl+scope.row.product_logo]" alt=""></el-image>
    </template>
    </el-table-column>
    <el-table-column align='center'
      prop="category_name"
      label="种类">
    </el-table-column>
    <el-table-column align='center'
      prop="product_name"
      label="产品名称">
    </el-table-column>
    <el-table-column align='center'
      prop="product_spec"
      label="规格">
    </el-table-column>
    <el-table-column align='center'
      prop="product_unit"
      label="单位">
    </el-table-column>
    <el-table-column align='center'
      prop="sell_count"
      label="数量">
    </el-table-column>
    <el-table-column align='center'
      label="供应商">{{item.supplier_name}}
    </el-table-column>
    <el-table-column align='center'
      label="采购人员">{{item.sell_person}}
    </el-table-column>
    <el-table-column align='center'
      prop="produce_name"
      label="生产人员">
    </el-table-column>
    <el-table-column label="操作" width="60" fixed="right" align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small"  @click="godetail(scope.row.company_code,scope.row.foodsourcedetail_code)" >详情</el-button>
         </template>
        </el-table-column>
  </el-table>
  </el-collapse-item>
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
</el-collapse>
  <div  v-else>暂无数据</div>
    </el-tab-pane>
  </el-tabs>
      
    
    </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local} from '../../../util/util'
export default {
  data () {
    return {
      company_name:'',
      currentPage: 1,
      total: 0,
      page: {
       company_code:'',
       pager_offset: '0',
      },
      activeName: 'first',
       fits: ['备案申请书', '营业执照副本', '场地证明', '健康证', '身份证','身份证反面'],
       list: [],
       list1: [],
       companytag_code:'',
       user:''
    }
  },
   created () {
       this.user = local.get('user');
     this.page.company_code=this.$route.query.id;
      this.currentPage = this.page.pager_offset / 10 + 1
      this.company_name=this.$route.query.name;
     this.init(this.page)
  },
  methods: {
      init (params) {
    //   axios.get('/api/company/detail', params).then((v) => {
    //    this.list=v
    //    this.companytag_code=v.companytag_code
    //   })
       axios.get('/api/foodsource/search', params).then((v) => {
       this.list1=v.foodSourceList;
       this.total = v.pager_count
      })
    },
     // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
     userTypeList (row) {
      return row.employ_ishealth==1?'有':'无'
    },
     handleClick() {},
      godetail(index,index1){
    this.$router.push({
        name: "Ingredient",
        query: {
          id:index,
          code: index1
        }
      });
  },
  SourceAdd(){
     this.$router.push({
        name: "SourceAdd",
        query: {
          id:this.page.company_code,
        }
      });
  },
  gomonitordetail(){
      this.$router.push({
        name: "MonitorDetail",
        query: {
          id:this.$route.query.company_code
        }
      });
  },
  checkSample(id){
     this.$router.push({
        name: "Sample",
        query: {
          id:'1191576121327196604420185'
        }
      });
  }
  }
}
</script>
<style lang="scss" scoped>
.recorddetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    img{width: 18px;margin-left: 5px;vertical-align: text-bottom}
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recorddetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
/deep/ .el-collapse{border:1px solid rgba(235, 239, 241, 1);
  .el-collapse-item__header{background:rgba(247,248,249,1);
  .flex{display: flex;align-items: center};
  .el-col-9{line-height: 1.5};
}
.el-collapse-item__content{padding-bottom: 0px;
.el-table{margin-bottom: 0px !important;}

} }
}

</style>
