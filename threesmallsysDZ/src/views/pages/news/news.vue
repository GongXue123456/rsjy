<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5>
            <span class="lines"></span>
            新闻管理
        </h5>
        <div>
          <el-button   class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'news/add'})">新增</el-button>
        </div>
    </el-header>
    <el-main class="p15 pt0">
      <el-row class="box search mt20">
        <el-form :inline="true" :model="news" class="demo-form-inline">
          <el-col :span="4" class="mr10">
            <el-form-item size="small" >
                    <el-input placeholder="新闻标题" v-model="news.news_title" class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="4" class="mr10">
         <el-form-item size="small">
          <el-select v-model="news.news_category_code" clearable placeholder="新闻栏目" @change="onSubmit">
              <el-option v-for="v in options" :key="v.news_category_code" :label="v.news_category_name" :value="v.news_category_code">{{v.news_category_name}}</el-option>
          </el-select>
        </el-form-item>
        </el-col>
          <el-col :span="2" class="tl mr10">
            <el-form-item  size="small">
              <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="box list">
        <el-table border :data="tableData" style="width: 100%">
            <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
            <el-table-column prop="news_title"  min-width="150" :show-overflow-tooltip="true"  label="新闻标题" align='center'  ></el-table-column>
             <el-table-column prop="news_category_name"  min-width="150" :show-overflow-tooltip="true"  label="栏目" align='center' ></el-table-column>
            <el-table-column  min-width="150" :show-overflow-tooltip="true"  label="封面图片" align='center'  >
              <template slot-scope="scope">
                <img v-if="scope.row.news_imgurl==='undefined'||scope.row.news_imgurl===''||scope.row.news_imgurl==='null'"  src="../../../assets/image/moren.png"   style="width: 40px;height: 40px"/>
                <el-image v-else style="width: 40px;height: 40px;" :src="user.qyurl+scope.row.news_imgurl" :preview-src-list="[user.qyurl+scope.row.news_imgurl]" alt=""></el-image>
              </template>
            </el-table-column>
            <el-table-column  min-width="150" :show-overflow-tooltip="true"  label="发布区域" align='center'  >
              <template slot-scope="scope">
                {{scope.row.news_province}}{{scope.row.news_city}}{{scope.row.news_area}}{{scope.row.news_town}}{{scope.row.news_vill}}
              </template>
            </el-table-column>
            <el-table-column prop="news_summary"  min-width="150" :show-overflow-tooltip="true"  label="新闻简介" align='center'  ></el-table-column>
            <el-table-column prop="companytype_names"  min-width="150" :show-overflow-tooltip="true"  label="分类" align='center' ></el-table-column>
            <el-table-column  min-width="200" label="操作" align='center' fixed="right"  >
              <template slot-scope="scope">
                <el-button size="small" type="info" plain @click="onInfo(scope.row)">详情</el-button>
                <el-button v-if="user.user_code == scope.row.user_code" size="small" plain  @click="$router.push({path: 'news/edit', query: {news_code: scope.row.news_code}})">编辑</el-button>
              </template>
            </el-table-column>
        </el-table>

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

<el-dialog
  :title="context.news_title"
  :visible.sync="dialogVisible"
  width="60%"
  >
  <span v-html="context.news_content"></span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
</el-dialog>

  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local,onpage } from '../../../util/util'
import { mapState } from 'vuex'
export default {
  data () {    
    return {
      news: {
        pager_openset: "10",
        pager_offset: "0",
        news_title: '',
        news_category_code:''
      },
      options:'',
      tableData:[],
      total: 0,
      currentPage: 1,
      dialogVisible: false,
      formLabelWidth: '120px',
      context: {
        news_title: '',
        news_content: ''
      },
      user: {}
    }
  },
   created () {
     this.user = local.get('user');
     this.init(this.news)
  },
  methods: {
    init(params){
      axios.get("/api/newsCategory/list",{news_category_state:'1'}).then(v=>{
        this.options = v.pager_list
      })
      axios.get("/api/news/search",params).then(v=>{
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
    currentChange (i) {
      this.news.pager_offset = onpage(i) + ""
      this.init(this.news)
    },
    onSubmit(){
      this.news.pager_offset = 0 + ""
      this.init(this.news)
    },
    onInfo (row) {
      this.dialogVisible = true
      this.context.news_title = row.news_title
      this.context.news_content = row.news_content
    }
  }
}
</script>
<style lang="scss">
.shopList{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
}
.el-dialog__body{
  text-align: left;
}
</style>
