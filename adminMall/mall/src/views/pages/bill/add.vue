<template>
  <div>
    <div class="b-title">
      添加菜单
    </div>
    <el-form ref="rulesform" :model="form" label-width="80px"  :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="bill_name">
              <el-input v-model="form.bill_name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="bill_sort">
              <el-input v-model="form.bill_sort" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="form.bill_state" placeholder="状态">
                <el-option label='启用' value="1" ></el-option>
                <el-option label='禁用' value="2" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <div>
          <el-input placeholder="请输入内容" v-model="page.co_name" style="width:300px;">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                prop="co_name"
                label="菜名"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="状态"
                >
                <template slot-scope="scope">
                  {{co_state[scope.row.co_state]}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                   <el-button type="primary" @click="handleSelectionChange(scope.row)" size="small">选择一道菜</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="i-page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change = 'currentChange'>
          </el-pagination>
        </div>
        <div>
          <div class="b-title">
            已选菜名
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-tag
                :key="key"
                v-for="(tag, key) in billAndComboList"
                closable
                :disable-transitions="false"
                @close="handleClose(key)">
                {{tag}}
              </el-tag>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>
        <el-form-item>
          <el-button type="primary" @click="onhandle('rulesform')">添加</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ajax from '../../../util/api'
import { onpage } from '../../../util/util'
export default {
  data () {
    return {
      co_state: ['', '启用', '禁用'],
      page: {
        pager_offset: 0,
        pager_openset: 10,
        co_name: ''
      },
      tableData: [],
      total: 0,
      form: {
        bill_name: '',
        bill_sort: '',
        bill_state: '1',
        billAndComboList: []
      },
      rules: {
        bill_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        bill_sort: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      billAndComboList: []
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
      ajax.get('/combo/list', params).then(v => {
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
    /**
     * 提交保存
     */
    onhandle (formName) {
      if (this.form.billAndComboList.length === 0) {
        this.$message({
          message: '至少选择一道菜',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.post('/bill/save', this.form)
        }
      })
    },
    /**
     * 选中一条数据
     */
    handleSelectionChange (row) {
      this.billAndComboList.push(row.co_name)
      this.form.billAndComboList.push(row)
    },
    /**
     * 取消一条数据
     */
    handleClose (i) {
      this.billAndComboList.splice(i, 1)
      this.form.billAndComboList.splice(i, 1)
    },
    /**
     * 分页
     */
    currentChange (page) {
      this.page.pager_offset = onpage(page)
      this.init(this.page)
    },
    /**
     * 搜索
     */
    handleSearch () {
      this.page.pager_offset = 0
      this.init(this.page)
    }
  }
}
</script>
