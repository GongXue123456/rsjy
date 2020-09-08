<template>
  <div class="bill">
    <div class="box add">
        <h3>菜单管理</h3>
        <div>
          <el-button type="primary" @click="go">添加菜单</el-button>
        </div>
    </div>
    <div class="box search">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="bill_name"
          label="菜单名"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{p_state[scope.row.bill_state]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="bill_sort"
          label="排序"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" size="small">修改菜单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="i-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
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
        pager_openset: 10
      },
      tableData: [],
      total: 0,
      p_state: ['', '启用', '禁用']
    }
  },
  created () {
    this.init(this.page)
  },
  methods: {
    /**
     * 初始化
     */
    init (params) {
      ajax.get('/bill/list', params).then(v => {
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
    /**
     * 添加
     */
    go () {
      this.$router.push({
        name: 'bill-add'
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
     * 更新
     */
    handleUpdate (row) {
      this.$router.push({
        path: 'bill/edit',
        query: {
          bill_id: row.bill_id
        }
      })
    }
  }
}
</script>
<style lang="scss">

</style>
