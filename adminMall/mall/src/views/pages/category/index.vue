<template>
  <div>
    <div class="box add">
        <h3>分类管理</h3>
        <div>
          <el-button type="primary" @click="go">添加分类</el-button>
        </div>
    </div>
    <div class="box search">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item>
          <el-input v-model="page.c_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="page.c_level" placeholder="选择分类">
            <el-option label="选择分类" value="" ></el-option>
            <el-option label="一级分类" value="1" ></el-option>
            <el-option label="二级分类" value="2" ></el-option>
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
          prop="c_name"
          label="分类名"
          width="180">
        </el-table-column>
        <el-table-column
          label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.c_logo"
              preview-src-list="fill">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="分类等级">
          <template slot-scope="scope">
              {{c_level[scope.row.c_level]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="c_sort"
          label="排序"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" size="small">修改分类</el-button>
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
        c_name: '',
        c_level: ''
      },
      tableData: [],
      total: 0,
      c_level: ['', '一级栏目', '二级栏目'],
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      categoryPage: (state) => state.category.categoryPage
    })
  },
  created () {
    this.currentPage = this.categoryPage.pager_offset / 10 + 1
    this.page.c_level = this.categoryPage.c_level
    this.page.c_name = this.categoryPage.c_name
    this.init(this.categoryPage)
  },
  methods: {
    init (params) {
      ajax.get('/category/list', params).then(v => {
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
    /**
     * 添加一条
     */
    go () {
      this.$router.push({
        name: 'category-add'
      })
    },
    /**
     * 更新
     */
    handleUpdate (row) {
      this.$router.push({
        path: 'category/edit',
        query: {
          c_id: row.c_id
        }
      })
    },
    /**
     * 分页
     */
    currentChange (page) {
      this.currentPage = page
      this.page.c_name = this.categoryPage.c_name
      this.page.c_level = this.categoryPage.c_level
      this.page.pager_offset = onpage(page)
      this.$store.dispatch('category/setNewPage', this.page)
      this.init(this.categoryPage)
    },
    /**
     * 查询
     */
    onSubmit () {
      this.currentPage = 1
      this.page.pager_offset = 0
      this.$store.dispatch('category/setNewPage', this.page)
      this.init(this.categoryPage)
    }
  }
}
</script>
<style lang="scss">

</style>
