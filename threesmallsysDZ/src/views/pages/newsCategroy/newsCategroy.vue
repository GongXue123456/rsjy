<template>
  <el-container class="shopList ">
    <el-header class="box add bb">
        <h5>
            <span class="lines"></span>
            新闻栏目管理
        </h5>
        <div>
          <el-button   class=""  icon="el-icon-plus" size="small" type="primary" @click="$router.push({path: 'newsCategroy/add'})">新增</el-button>
        </div>
    </el-header>
    <el-main class="p15 pt0">
      <div class="box list">
        <el-table border :data="tableData" style="width: 100%">
          <el-table-column type="index" align='center' width="60"  label="序号"></el-table-column>
          <el-table-column prop="news_category_name"  min-width="150" :show-overflow-tooltip="true"  label="新闻栏目" align='center' ></el-table-column>
          <el-table-column  min-width="150" :show-overflow-tooltip="true"  label="状态" align='center' >
             <template slot-scope="scope">
              <el-tag v-show="scope.row.news_category_state == '1'">启用</el-tag>
              <el-tag v-show="scope.row.news_category_state == '2'" type="danger">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column min-width="150" :show-overflow-tooltip="true"  label="状态" align='center' >
             <template slot-scope="scope">
              <el-button size="small" type="primary" @click="update(scope.row)">修改</el-button>
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


<el-dialog title="新闻栏目" :visible.sync="dialogFormVisible">
    <el-form  status-icon ref="formInline"  :model="formInline" label-width="80px">
        <el-row class="mt20  f14">
            <el-col :span="12">
              <el-form-item label="栏目名：" size="small"  prop="news_category_name" :rules="[{required: true,message: '请输入栏目名', trigger: 'blur' }]">
                <el-input placeholder="请输入栏目名" v-model="formInline.news_category_name" ></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row class=" mt20  f14">
            <el-col :span="12">
              <el-form-item  :span="11"  label="状态：" size="small" prop="news_category_state" >
                  <el-select v-model="formInline.news_category_state" placeholder="请选择状态">
                    <el-option label="开启" value=1></el-option>
                    <el-option label="关闭" value=2></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('formInline')">确 定</el-button>
  </div>
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
      formInline: {
        news_category_name: '',
        news_category_state: "",
        news_category_code: ''
      },
      params: {
        pager_openset: "10",
        pager_offset: "0"
      },
      tableData:[],
      total: 0,
      currentPage: 1,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
   created () {
     this.init(this.params)
  },
  methods: {
    init(params){
      axios.get("/api/newsCategory/list",params).then(v=>{
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
    currentChange (i) {
      this.params.pager_offset = onpage(i) + ""
      this.init(this.params)
    },
    update (row) {
      let {news_category_name, news_category_state, news_category_code } = row
      this.formInline = {
        news_category_name: news_category_name,
        news_category_state: news_category_state + '',
        news_category_code: news_category_code
      }
      this.dialogFormVisible = true
    },
     submitForm(formInline){
        let paramas = this.formInline
        this.$refs[formInline].validate((valid) => {
        if (valid) {
          axios.put('/api/newsCategory/update', paramas).then((v) => {
             this.dialogFormVisible = false
             this.init(this.params)
         })
        }
      })
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
 /deep/ .el-input-group__append .el-button--primary .el-icon-search{color: #fff}
  /deep/.el-table .aa .cell {display: flex;justify-content: center;}
}

</style>
