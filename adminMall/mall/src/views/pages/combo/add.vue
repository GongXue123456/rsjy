<template>
  <div>
    <el-form ref="rulesform" :model="form" label-width="80px" :rules="rules">
        <div class="b-title">
          添加菜
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜名称" prop="co_name">
              <el-input v-model="form.co_name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜描述" prop="co_desc">
              <el-input v-model="form.co_desc" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="排序" prop="co_sort">
              <el-input v-model="form.co_sort" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用">
              <el-select v-model="form.co_state" placeholder="单位">
                <el-option label='启用' value="1" ></el-option>
                <el-option label='禁用' value="2" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="菜属性" prop="co_attrs">
              <el-checkbox-group v-model="form.co_attrs">
                 <el-checkbox v-for="item in co_attrs" :label="item" :key="item.av_id">{{item.av_name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <div>
          <el-input placeholder="请输入内容" v-model="page.ps_main_title" style="width:300px;">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
               >
              <el-table-column
                prop="ps_main_title"
                label="食材名"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="是否为主材"
                >
                <template slot-scope="scope">
                  <el-select v-model="scope.row.is_main_part" placeholder="是否是主材">
                    <el-option label="是" value='1'>是</el-option>
                    <el-option label="否" value='2'>否</el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                   <el-button type="primary" @click="handleSelectionChange(scope.row)" size="small">点击选择</el-button>
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
            已选食材
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-tag
                :key="key"
                v-for="(tag, key) in showSelectRowTag"
                closable
                :disable-transitions="false"
                @close="handleClose(key)">
                {{tag}}
              </el-tag>
            </el-col>
          </el-row>
        </div>

        <el-divider></el-divider>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="菜原图">
              <el-upload
                ref="upload"
                multiple
                action=""
                :http-request="handleUpload"
                list-type="picture-card"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onhandle('rulesform')">添加</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ajax from '../../../util/api'
import { tengxuncloud } from '../../../util/tengxun'
import { onpage } from '../../../util/util'
export default {
  data () {
    return {
      page: {
        pager_offset: 0,
        pager_openset: 10,
        ps_main_title: ''
      },
      form: {
        co_desc: '',
        co_name: '',
        co_sort: '',
        co_state: '1',
        co_attr: [],
        co_attrs: [],
        ps_sku: [],
        co_logo: '',
        co_logo_thumb: '',
        comboPsSpecList: []
      },
      rules: {
        co_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        co_desc: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        co_sort: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        co_attrs: [
          { type: 'array', required: true, message: '请输入', trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      co_attr: [],
      co_attrs: [],
      ps_sku: [],
      tableData: [],
      showSelectRowTag: [],
      total: 0,
      is_main_part: ['', '(主材)', '']
    }
  },
  created () {
    this.init()
  },
  methods: {
    /**
     * 初始化获得菜属性
     */
    init () {
      let self = this
      ajax.get('attrValue/list', { pager_openset: 200, av_type: 2 }).then(v => {
        self.co_attrs = v.pager_list
      })
      this.getProductSpecList(this.page)
    },
    /**
     * 获得食材列表
     */
    getProductSpecList () {
      let self = this
      ajax.get('productSpec/list', this.page).then(v => {
        v.pager_list.map(r => (r.is_main_part = '2'))
        self.tableData = v.pager_list
        self.total = v.pager_count
      })
    },
    /**
     * 添加一条菜信息
     */
    onhandle (formName) {
      if (this.form.ps_sku.length === 0) {
        this.$message({
          message: '至少选择一个食材',
          type: 'warning'
        })
        return
      }
      if (!this.form.co_logo) {
        this.$message({
          message: '请上传一张菜图片',
          type: 'warning'
        })
        return
      }
      this.form.co_attr = this.getCoattr(this.form.co_attrs)
      this.form.comboPsSpecList = this.getPsskuCoattr(this.form.ps_sku)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.post('combo/save', this.form)
        }
      })
    },
    getCoattr (params) {
      let str = ''
      params.forEach(v => {
        let i = `${v.av_id},${v.av_name};`
        str += i
      })
      return str
    },
    getPsskuCoattr (params) {
      let obj = []
      params.forEach(v => {
        obj.push({
          ps_id: v.ps_id,
          is_main_part: v.is_main_part
        })
      })
      return obj
    },
    /**
     * 上传图片
     */
    handleUpload (params) {
      tengxuncloud(params).then((res) => {
        if (res.statusCode === 200) {
          res.img_thumb = `${res.Location}?imageView2/1/w/300/h/300/q/85`
          params.onSuccess(res)
        } else {
          res.onSuccess('失败')
        }
      })
    },
    handlepoll (response, file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.form.co_logo = `http://${response.Location}`
      this.form.co_logo_thumb = `http://${response.img_thumb}`
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
      this.form.co_logo = ''
      this.form.co_logo_thumb = ''
    },
    /**
     * 分页
     */
    currentChange (page) {
      this.page.pager_offset = onpage(page)
      this.getProductSpecList(this.page)
    },
    /**
     * 选中一条数据
     */
    handleSelectionChange (row) {
      this.showSelectRowTag.push(`${row.ps_main_title}${this.is_main_part[row.is_main_part]}`)
      this.form.ps_sku.push(row)
    },
    /**
     * 取消一条数据
     */
    handleClose (i) {
      this.showSelectRowTag.splice(i, 1)
      this.form.ps_sku.splice(i, 1)
    },
    /**
     * 搜索
     */
    handleSearch () {
      this.page.pager_offset = 0
      this.getProductSpecList(this.page)
    }
  }
}
</script>
