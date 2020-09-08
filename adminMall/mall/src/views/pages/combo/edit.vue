<template>
  <div>
    <el-form ref="rulesform" :model="form" label-width="80px" :rules="rules">
        <div class="b-title">
          修改菜
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
            <el-form-item label="是否启用" prop="co_state">
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
              <el-checkbox-group v-model="defaultco_attrs">
                 <el-checkbox v-for="item in co_attrs" :label="item.av_id" :key="item.av_id">{{item.av_name}}</el-checkbox>
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
               @cell-click="handleSelectionChange">
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
                :file-list="fileList"
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
          <el-button @click="onhandle('rulesform')" type="primary">更新</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import ajax from '../../../util/api'
import { onpage } from '../../../util/util'
import { tengxuncloud } from '../../../util/tengxun'
export default {
  data () {
    return {
      co_id: '',
      page: {
        pager_offset: 0,
        pager_openset: 10,
        ps_main_title: ''
      },
      form: {
        co_id: '',
        co_name: '',
        co_desc: '',
        co_sort: '',
        co_state: '1',
        co_attrs: [],
        ps_sku: [],
        co_logo: '',
        co_logo_thumb: ''
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
        ]
        // co_attrs: [
        //   { type: 'array', required: true, message: '请输入', trigger: 'change' }
        // ]
      },
      co_attrs: [],
      defaultco_attrs: [],
      tableData: [],
      total: 0,
      showSelectRowTag: [],
      is_main_part: ['', '(主材)', ''],
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  created () {
    this.co_id = this.$route.query.co_id
    this.form.co_id = this.$route.query.co_id
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init () {
      ajax.get('/combo/single', { id: this.co_id }).then(v => {
        this.form.co_name = v.co_name
        this.form.co_desc = v.co_desc
        this.form.co_sort = v.co_sort
        this.form.co_state = v.co_state + ''
        JSON.parse(v.co_attr).k_value.forEach(res => {
          this.defaultco_attrs.push(Number(res.v_id))
        })
        v.productSpecList.forEach(res => {
          this.showSelectRowTag.push(`${res.ps_main_title}${this.is_main_part[res.is_main_part]}`)
          this.form.ps_sku.push(res)
        })
        this.fileList.push({
          url: v.co_logo
        })
        this.form.co_logo = v.co_logo
        this.form.co_logo_thumb = v.co_logo_thumb
      })
      this.getAttrValueList()
      this.getProductSpecList()
    },
    /**
     * 初始化获得菜属性
     */
    getAttrValueList () {
      ajax.get('attrValue/list', { pager_openset: 200, av_type: 2 }).then(v => {
        this.co_attrs = v.pager_list
      })
    },
    /**
     * 获得食材列表
     */
    getProductSpecList () {
      ajax.get('productSpec/list', this.page).then(v => {
        v.pager_list.map(r => (r.is_main_part = '2'))
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
    /**
     * 更新一条菜信息
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
      this.form.co_attrs = this.compare(this.co_attrs, this.defaultco_attrs)
      if (this.form.co_attrs.length === 0) {
        this.$message({
          message: '至少选择一个菜属性',
          type: 'warning'
        })
        return
      }
      this.form.co_attr = this.getCoattr(this.form.co_attrs)
      this.form.comboPsSpecList = this.getPsskuCoattr(this.form.ps_sku)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.put('combo/update', this.form).then(v => {
        this.$router.go(-1)
      })
        }
      })
    },
    compare (arr1, arr2) {
      let coAttrs = []
      arr1.forEach(v => {
        arr2.forEach(r => {
          if (v.av_id === r) {
            coAttrs.push(v)
          }
        })
      })
      return coAttrs
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
     * 选中一条数据
     */
    handleSelectionChange (row, column, cell, event) {
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
    },
    /**
     * 分页
     */
    currentChange (page) {
      this.page.pager_offset = onpage(page)
      this.getProductSpecList(this.page)
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
    handleRemove () {
      this.form.co_logo = ''
      this.form.co_logo_thumb = ''
    }
  }
}
</script>
<style lang="scss">

</style>
