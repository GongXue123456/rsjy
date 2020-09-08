<template>
  <div class="combo">
    <div class="box add">
        <h3>菜管理</h3>
        <div>
          <el-button type="primary" @click="go">添加菜</el-button>
        </div>
    </div>
    <div class="box search">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item>
          <el-input v-model="page.co_name" placeholder="请输入名称"></el-input>
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
          label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.co_logo"
              fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="co_name"
          label="菜名"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{p_state[scope.row.co_state]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="co_sort"
          label="排序"
          width="180">
        </el-table-column>
        <el-table-column
          label="菜属性"
           width="300"
        >
          <template slot-scope="scope">
              <el-tag effect="plain" type="success" v-for="(item,key) in JSON.parse(scope.row.co_attr).k_value" :key='key'>{{item.v_name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" size="small">修改菜</el-button>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset: 0,
        pager_openset: 10,
        co_name: ''
      },
      tableData: [],
      total: 0,
      p_state: ['', '启用', '禁用'],
      currentPage: 1
    }
  },
  created () {
    this.currentPage = this.comboPage.pager_offset / 10 + 1
    this.page.co_name = this.comboPage.co_name
    this.init(this.comboPage)
  },
  computed: {
    ...mapState({
      comboPage: (state) => state.combo.comboPage
    })
  },
  methods: {
    /**
     * 初始化
     */
    init (params) {
      ajax.get('/combo/list', params).then(v => {
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
    /**
     * 添加
     */
    go () {
      this.$router.push({
        name: 'combo-add'
      })
    },
    /**
     * 分页
     */
    currentChange (page) {
      this.currentPage = page
      this.page.pager_offset = onpage(page)
      this.page.co_name = this.comboPage.co_name
      this.$store.dispatch('combo/setNewPage', this.page)
      this.init(this.comboPage)
    },
    /**
     * 更新
     */
    handleUpdate (row) {
      this.$router.push({
        path: 'combo/edit',
        query: {
          co_id: row.co_id
        }
      })
    },
    /**
     * 搜索
     */
    onSubmit () {
      this.currentPage = 1
      this.page.pager_offset = 0
      this.$store.dispatch('combo/setNewPage', this.page)
      this.init(this.comboPage)
    }
  }
}
</script>
<style lang="scss">

</style>
