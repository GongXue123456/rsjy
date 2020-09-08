<template>
  <div>
    <div class="box add">
        <h3>属性值管理</h3>
        <div>
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" @click="$router.push({name: 'attrValue-add', query: {ak_id: id, type: type}})">添加属性值</el-button>
        </div>
    </div>
    <div class="box search">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item>
          <el-input v-model="page.av_name" placeholder="属性名"></el-input>
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
          prop="av_name"
          label="名称"
          width="180">
        </el-table-column>

        <el-table-column
          label="状态">
          <template slot-scope="scope">
              {{av_state[scope.row.av_state]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="av_sort"
          label="排序"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" size="small">修改属性值</el-button>
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
        pager_openset: 10,
        pager_offset: 0,
        av_name: '',
        ak_id: ''
      },
      id: '',
      type: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      av_state: ['', '启用', '禁用']
    }
  },
  created () {
    this.page.ak_id = this.$route.query.ak_id
    this.id = this.$route.query.ak_id
    this.type = this.$route.query.type
    this.init(this.page)
  },
  methods: {
    init (params) {
      ajax.get('/attrKey/singleWithAVList', params).then(v => {
        this.tableData = v.attrValueList
        this.total = v.pager_count
      })
    },
    handleUpdate (row) {
      this.$router.push({
        name: 'attrValue-edit',
        query: {
          ak_id: this.id,
          type: this.type,
          av_id: row.av_id
        }
      })
    },
    /**
     * 搜索
     */
    onSubmit () {
      this.currentPage = 1
      this.page.pager_offset = 0
      this.init(this.page)
    },
    /**
     * 点击分页
     */
    currentChange (page) {
      this.page.pager_offset = onpage(page)
      this.init(this.page)
    }
  }
}
</script>
<style lang="scss">

</style>
