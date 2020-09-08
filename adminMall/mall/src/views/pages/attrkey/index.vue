<template>
  <div>
    <div class="box add">
        <h3>属性管理</h3>
        <div>
          <el-button type="primary" @click="$router.push({path: 'attrkey/add'})">添加属性</el-button>
        </div>
    </div>
    <div class="box search">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item>
          <el-select v-model="page.ak_type" placeholder="选择分类">
            <el-option label="选择分类" value="" ></el-option>
            <el-option label="商品" value="1" ></el-option>
            <el-option label="菜" value="2" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box search">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="ak_name"
          label="属性名"
          width="180">
        </el-table-column>

        <el-table-column
          label="状态">
          <template slot-scope="scope">
              {{ak_state[scope.row.ak_state]}}
          </template>
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="scope">
              {{ak_type[scope.row.ak_type]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="ak_sort"
          label="排序"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" size="small">修改属性</el-button>
            <el-button type="primary" @click="goT(scope.row)" size="small">查看属性值</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="i-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change = 'currentChange'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from '../../../util/api'
import { onpage } from '../../../util/util'
export default {
  data () {
    return {
      page: {
        pager_offset: 0,
        pager_openset: 10,
        ak_type: ''
      },
      currentPage: 1,
      tableData: [],
      ak_state: ['', '启用', '禁用'],
      ak_type: ['', '商品', '菜'],
      total: 0
    }
  },
  created () {
    this.init(this.page)
  },
  methods: {
    init (params) {
      ajax.get('/attrKey/list', params).then(v => {
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
    /**
     * 分页
     */
    currentChange (page) {
      this.page.pager_offset = onpage(page)
      this.init(this.page)
    },
    /**
     * 修改
     */
    handleUpdate (row) {
      this.$router.push({
        path: 'attrkey/edit',
        query: {
          ak_id: row.ak_id
        }
      })
    },
    /**
     *
     */
    goT (row) {
      this.$router.push({
        path: 'attrkey/attrvalueindex',
        query: {
          ak_id: row.ak_id,
          type: row.ak_type
        }
      })
    },
    onSubmit () {
      this.page.pager_offset = 0
      this.init(this.page)
    }
  }
}
</script>
<style lang="">

</style>
