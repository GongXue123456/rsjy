<template>
  <div>
    <div class="b-title">
      更新分类
    </div>
    <el-form ref="rulesform" :model="form"  :rules="rules" label-width="80px" >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类名称" prop="c_name">
              <el-input v-model="form.c_name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="c_sort">
              <el-input v-model="form.c_sort" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
               <el-select v-model="form.c_state" placeholder="状态">
                <el-option label='启用' value="1" ></el-option>
                <el-option label='禁用' value="2" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级分类">
              <el-select
                disabled
                v-model="form.p_cid"
                placeholder="选择">
                <el-option
                  label="一级分类"
                  value="">
                </el-option>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div v-show="flag">
          <div class="b-title">
            属性信息
          </div>
          <div>
            <el-input placeholder="请输入属性名" v-model="pageAv.av_name" style="width:300px;">
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
                  prop="ak_name"
                  label="属性名"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="av_name"
                  label="属性值"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="av_type"
                  label="类型"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="状态"
                  >
                  <template slot-scope="scope">
                    {{scope.row.av_state}}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-popover
                      placement="top"
                      v-model="scope.row.visible"
                      >
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="primary" @click="addAttr(scope.row, 'filter_attr')">添加到筛选属性</el-button>
                        <el-button type="primary" size="mini" @click="addAttr(scope.row, 'sell_attribute')">添加到销售属性</el-button>
                      </div>
                      <el-button size="mini" slot="reference">选择</el-button>
                    </el-popover>
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
              筛选属性
            </div>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-tag
                  :key="key"
                  v-for="(tag, key) in filter"
                  closable
                  :disable-transitions="false"
                  @close="filterhandleClose(key)">
                  {{tag.av_name}}
                </el-tag>
              </el-col>
            </el-row>
          </div>

          <div>
            <div class="b-title">
              销售属性
            </div>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-tag
                  :key="key"
                  v-for="(tag, key) in sell"
                  closable
                  :disable-transitions="false"
                  @close="sellhandleClose(key)">
                  {{tag.av_name}}
                </el-tag>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="分类logo">
              <el-upload
                ref="upload"
                multiple
                action=""
                :http-request="handleUpload"
                list-type="picture-card"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :fileList = "fileList"
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
          <el-button  type="primary" @click="onhandle('rulesform')">更新</el-button>
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
        pager_openset: 99999,
        c_name: '',
        c_level: 1
      },
      pageAv: {
        av_name: '',
        pager_offset: 0,
        pager_openset: 10
      },
      form: {
        c_id: '',
        c_name: '',
        c_sort: '',
        c_state: '',
        p_cid: '',
        categoryAndAttrGroup: {
          cag_id: '',
          filter_attr: ''
        },
        c_logo: '',
        c_logo_thumb: '',
        c_level: '1'
      },
      rules: {
        c_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        c_sort: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      options: [],
      dialogImageUrl: '',
      dialogVisible: false,
      flag: false,
      fileList: [],
      tableData: [],
      tableDataAll: [],
      total: 0,
      filter: [],
      sell: []
    }
  },
  created () {
    this.form.c_id = this.$route.query.c_id
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init () {
      let url = [this.getInit({ c_id: this.form.c_id }), this.getListWithAttrV(this.pageAv)]
      ajax.all(url).then(v => {
        let acct = v.acct
        let perms = v.perms

        this.tableData = this.newAttribute(perms.pager_list)
        this.total = perms.pager_count
        // this.getTableData(0, 10)

        this.form.c_name = acct.c_name
        this.form.c_sort = acct.c_sort
        this.form.c_state = acct.c_state + ''
        this.form.p_cid = acct.p_cid === null ? '' : acct.p_cid
        this.form.c_level = acct.c_level
        if (this.form.p_cid) {
          this.flag = true
        }

        this.fileList.push({
          url: acct.c_logo
        })
        this.form.c_logo = acct.c_logo
        this.form.c_logo_thumb = acct.c_logo_thumb
        if (acct.c_level === 2) {
          this.form.categoryAndAttrGroup.cag_id = acct.categoryAndAttrGroup.cag_id
          let filter = JSON.parse(acct.categoryAndAttrGroup.filter_attr)
          this.filter = this.getNewAttrInit(filter)
          let sell = JSON.parse(acct.categoryAndAttrGroup.sell_attr)
          this.sell = this.getNewAttrInitSell(sell)
        }
      })

      ajax.get('/category/list', this.page).then(v => {
        v.pager_list.map(res => {
          res.value = res.c_id
          res.label = res.c_name
          return res
        })
        this.options = v.pager_list
      })
    },
    /**
     * 初始化操作
     */
    getInit (params) {
      return ajax.get('/category/single', params)
    },
    /**
     * 初始化操作
     */
    getListWithAttrV (params) {
      return ajax.get('/attrKey/listWithAttrV', params)
    },
    handleAttr (params) {
      ajax.get('/attrKey/listWithAttrV', params).then(v => {
        this.tableData = this.newAttribute(v.pager_list)
        this.total = v.pager_count
      })
    },
    /**
     * 获得的筛选属性
     */
    getNewAttrInit (obj) {
      let arr = []
      obj.forEach(val => {
        if (val.k_value.length === 0) {
          return
        }
        val.k_value.forEach(k => {
          arr.push({
            ak_id: val.k_id,
            ak_name: val.k_name,
            av_id: k.v_id,
            av_name: k.v_name
          })
        })
      })
      return arr
    },
    /**
     * 获得的销售属性
     */
    getNewAttrInitSell (obj) {
      let arr = []
      obj.forEach(val => {
        if (val.v.length === 0) {
          return
        }
        val.v.forEach(k => {
          arr.push({
            ak_id: val.ak_id,
            ak_name: val.ak_name,
            av_id: k.av_id,
            av_name: k.av_name
          })
        })
      })
      return arr
    },
    /**
     * 把ak_id ak_name放在 av的元素上面
     */
    newAttribute (params) {
      let arr = []
      params.forEach(v => {
        v.attrValueList.forEach(r => {
          r.ak_id = v.ak_id
          r.ak_name = v.ak_name
          r.visible = false
          arr.push(r)
        })
      })
      return arr
    },
    /**
     * 拼接筛选属性数据
     */
    getCheckboxGroup (arr) {
      let arrOld = []
      arr.forEach(v => {
        arrOld.push({
          k_id: v.ak_id,
          k_name: v.ak_name,
          k_value: []
        })
      })
      let arrNew = []
      var obj = {}
      for (let i = 0; i < arrOld.length; i++) {
        if (!obj[arrOld[i].k_id]) {
          arrNew.push(arrOld[i])
          obj[arrOld[i].k_id] = true
        }
      }
      arrNew.forEach(v => {
        arr.forEach(r => {
          if (v.k_id === r.ak_id) {
            v.k_value.push({
              v_id: r.av_id,
              v_name: r.av_name
            })
          }
        })
      })
      return arrNew
    },
    /**
     * 拼接销售属性
     */
    getCheckboxGroupSell (arr) {
      let arrOld = []
      arr.forEach(v => {
        arrOld.push({
          ak_id: v.ak_id,
          ak_name: v.ak_name,
          v: []
        })
      })
      let arrNew = []
      var obj = {}
      for (let i = 0; i < arrOld.length; i++) {
        if (!obj[arrOld[i].ak_id]) {
          arrNew.push(arrOld[i])
          obj[arrOld[i].ak_id] = true
        }
      }
      arrNew.forEach(v => {
        arr.forEach(r => {
          if (v.ak_id === r.ak_id) {
            v.v.push({
              av_id: r.av_id,
              av_name: r.av_name
            })
          }
        })
      })
      return arrNew
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
    /**
     * 上传成功执行
     */
    handlepoll (response, file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.form.c_logo = `http://${response.Location}`
      this.form.c_logo_thumb = `http://${response.img_thumb}`
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * 移除图片
     */
    handleRemove (file, fileList) {
      this.form.c_logo = ''
      this.form.c_logo_thumb = ''
    },
    /**
     * 更新
     */
    onhandle (formName) {
      if (this.form.p_cid) {
        this.form.c_level = 2
        let filter = this.getCheckboxGroup(this.filter)
        let sell = this.getCheckboxGroupSell(this.sell)
        if (sell.length === 0) {
          this.$message({
            message: '请选择一个销售属性',
            type: 'warning'
          })
          return
        }
        this.form.categoryAndAttrGroup.filter_attr = JSON.stringify(filter)
        this.form.categoryAndAttrGroup.sell_attr = JSON.stringify(sell)
      }
      if (!this.form.c_logo) {
        this.$message({
          message: '请上传一张logo',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.put('/category/update', this.form).then(v => {
        this.$router.go(-1)
      })
        }
      })
    },
    /**
     * 点击分页
     */
    currentChange (page) {
      this.pageAv.pager_offset = onpage(page)
      this.handleAttr(this.pageAv)
    },
    /**
     * 添加属性
     */
    addAttr (row, type) {
      if (type === 'filter_attr') {
        let flag = this.fliterAttr(this.filter, row)
        if (flag) {
          return
        }
        this.filter.push(row)
      } else {
        let flag = this.fliterAttr(this.sell, row)
        if (flag) {
          return
        }
        this.sell.push(row)
      }
      row.visible = false
    },
    /**
     * 删除一条筛选属性
     */
    filterhandleClose (i) {
      this.filter.splice(i, 1)
    },
    /**
     * 删除一条销售属性
     */
    sellhandleClose (i) {
      this.sell.splice(i, 1)
    },
    /**
     * 搜索
     */
    handleSearch () {
      this.pageAv.pager_offset = 0
      this.handleAttr(this.pageAv)
    },
    fliterAttr (arrs, row) {
      for (const arr of arrs) {
        if (arr.av_id === row.av_id) {
          return true
        }
      }
      return false
    }
  }
}
</script>
<style lang="scss">

</style>
