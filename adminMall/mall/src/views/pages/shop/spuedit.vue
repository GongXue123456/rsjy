<template>
  <div>
    <div class="box">
      <el-form ref="rulesform" :model="form" :rules="rules" label-width="80px">
        <div class="b-title">
          食材基本信息
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="食材编号" prop="p_number">
              <el-input v-model="form.p_number" placeholder="一级分类/二级分类/spu/sku 例如: 01 001 00001 001 空格自行去掉"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="form.p_state" placeholder="单位">
                <el-option label='启用' value="1" ></el-option>
                <el-option label='禁用' value="2" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="食材名" prop="p_name">
              <el-input v-model="form.p_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="食材英文名">
              <el-input v-model="form.p_name_en"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="b-title">
          选择分类
        </div>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item>
              <el-select v-model="formInline.one" placeholder="一级分类" @change="oneChange">
                <el-option :label="item.c_name" :value="item.c_id" v-for="item in oneCategoryValue" :key = "item.c_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-select v-model="formInline.two" placeholder="二级分类" @change="twoChange">
                <el-option :label="item.c_name" :value="item.c_id" v-for="item in twoCategoryValue" :key = "item.c_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-button type="primary" @click="dialogFormVisible = true" >新增销售属性</el-button>
              <el-button type="primary" @click="dialogTableVisible = true" >搜索销售属性</el-button>
          </el-col>
        </el-row>

        <div>
          <div class="b-title">
            销售属性
          </div>
          <el-row :gutter="20" v-for="(item, k) in sell" :key="'i'+k">
            <el-col :span="24">
              <el-form-item :label="item.ak_name">
                <el-checkbox-group v-model="item.defaultSell"  size="medium">
                  <el-checkbox border v-for="(val,i) in item.v" :key='i' :label="val.av_id">
                      {{val.av_name}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="商品轮播图(3张以内)">
              <el-upload
                ref="upload"
                multiple
                action=""
                :http-request="handleSlideImg"
                list-type="picture-card"
                :on-success="successSlideImg"
                :on-preview="handlePictureCardPreview"
                :on-remove="removeSlideImg"
                :file-list="defaultSlideImg"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="商品详情图(3张以内)">
              <el-upload
                ref="upload"
                multiple
                action=""
                :http-request="handleDetaiImg"
                list-type="picture-card"
                :on-success="successDetaiImg"
                :on-preview="handlePictureCardPreview"
                :on-remove="removeDetaiImg"
                :file-list="defaultDetailImg"
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
          <el-button type="primary" @click="onSubmit('rulesform')">更新</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="新增一个属性值" :visible.sync="dialogFormVisible">
      <el-form :model="formAttr">
        <el-form-item label="选择属性名" :label-width="formLabelWidth">
          <el-select v-model="formAttr.ak_id" placeholder="选择属性名">
            <el-option
              v-for="item in options"
              :key="item.ak_id"
              :label="item.ak_name"
              :value="item.ak_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值名称" :label-width="formLabelWidth">
          <el-input v-model="formAttr.av_name" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态"  :label-width="formLabelWidth">
            <el-select v-model="formAttr.av_state" placeholder="状态">
            <el-option label='启用' value="1" ></el-option>
            <el-option label='禁用' value="2" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序"  :label-width="formLabelWidth">
          <el-input v-model="formAttr.av_sort" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onhandle()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="属性信息" :visible.sync="dialogTableVisible">
      <div>
        <el-input placeholder="请输入属性名" v-model="pageAv.av_name" style="width:300px;">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <el-table :data="gridData">
        <el-table-column prop="ak_name" label="属性名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="av_name" label="属性值" show-overflow-tooltip></el-table-column>
        <el-table-column prop="av_type" label="类型" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="addAttr(scope.row)">添加到销售属性</el-button>
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
        <div>
          <div class="b-title">
            销售属性
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-tag
                :key="key"
                v-for="(tag, key) in addsell"
                closable
                :disable-transitions="false"
                @close="sellhandleClose(key)">
                {{tag.av_name}}
              </el-tag>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="onhandleAttr">添加</el-button>
        </div>
    </el-dialog>

  </div>
</template>
<script>
import ajax from '../../../util/api'
import { tengxuncloud } from '../../../util/tengxun'
import { onpage } from '../../../util/util'
export default {
  data () {
    return {
      form: {
        p_id: '',
        p_number: '',
        p_state: '',
        p_name: '',
        p_name_en: '',
        p_slide_img: [],
        p_detail_img: []
      },
      formInline: {
        one: '',
        two: ''
      },
      rules: {
        p_number: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        p_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      oneCategoryValue: [],
      twoCategoryValue: [],
      sell: [],
      dialogImageUrl: '',
      dialogVisible: false,
      c_level: 1,
      defaultSlideImg: [],
      p_slide_img: [],
      defaultDetailImg: [],
      p_detail_img: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      formAttr: {
        ak_id: '',
        av_name: '',
        av_state: '1',
        av_sort: '1'
      },
      formLabelWidth: '120px',
      options: [],
      pageAv: {
        av_name: '',
        pager_offset: 0,
        pager_openset: 10
      },
      gridData: [],
      total: 0,
      addsell: [],
      addCategoryform: {
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
        c_level: '2'
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.form.p_id = this.id
    this.oneCategory({ c_level: this.c_level, pager_openset: 999 })
    this.init({ id: this.id })
    this.initAttr()
    this.handleAttr(this.pageAv)
  },
  methods: {
    /**
     * 初始化
     */
    init (params) {
      ajax.get('/product/single', params).then(v => {
        this.form.p_number = v.p_number
        this.form.p_state = v.p_state + ''
        this.form.p_name = v.p_name
        this.form.p_name_en = v.p_name_en

        if (v.p_slide_img) {
          JSON.parse(v.p_slide_img).forEach(res => {
            this.defaultSlideImg.push({
              url: res.img_ori
            })
            this.p_slide_img.push({
              img_ori: res.img_ori,
              img_thumb: res.img_thumb,
              sort: 1
            })
          })
        }
        if (v.p_detail_img) {
          JSON.parse(v.p_detail_img).forEach(res => {
            this.defaultDetailImg.push({
              url: res.img_ori
            })
            this.p_detail_img.push({
              img_ori: res.img_ori,
              img_thumb: res.img_thumb,
              sort: 1
            })
          })
        }
        this.getSingleCid(v)
      })
    },
    /**
     * 初始化属性
     */
    initAttr () {
      ajax.get('/attrKey/list', { pager_openset: 999 }).then(v => {
        this.options = v.pager_list
      })
    },
    /**
     * 初始化属性值
     */
    handleAttr (params) {
      ajax.get('/attrKey/listWithAttrV', params).then(v => {
        this.gridData = this.newAttribute(v.pager_list)
        this.total = v.pager_count
      })
    },
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
     * 点击分页
     */
    currentChange (page) {
      this.pageAv.pager_offset = onpage(page)
      this.handleAttr(this.pageAv)
    },
    /**
     * 搜索
     */
    handleSearch () {
      this.pageAv.pager_offset = 0
      this.handleAttr(this.pageAv)
    },
    /**
     * 删除一条销售属性
     */
    sellhandleClose (i) {
      this.addsell.splice(i, 1)
    },
    /**
     * 添加属性
     */
    addAttr (row) {
      let flag = this.fliterAttr(this.addsell, row)
      if (flag) {
        return
      }
      this.addsell.push(row)
    },
    /**
     * 过滤重复
     */
    fliterAttr (arrs, row) {
      for (const arr of arrs) {
        if (arr.av_id === row.av_id) {
          return true
        }
      }
      return false
    },
    /**
     * 添加一条属性值
     */
    onhandle () {
      ajax.filterPost('/attrValue/save', this.formAttr).then(v => {
        this.dialogFormVisible = false
        this.formAttr.ak_id = ''
        this.formAttr.av_name = ''
        this.formAttr.av_state = ''
        this.formAttr.av_sort = ''
        this.handleAttr(this.pageAv)
      })
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
     * 给二级分类绑定新属性
     */
    onhandleAttr () {
      if (!this.formInline.two) {
        this.$message({
          message: '请选择二级分类',
          type: 'warning'
        })
        return
      }
      let addsell = this.getCheckboxGroupSell(this.addsell)
      if (addsell.length === 0) {
        this.$message({
          message: '请选择一个销售属性',
          type: 'warning'
        })
        return
      }
      this.addCategoryform.categoryAndAttrGroup.sell_attr = JSON.stringify(addsell)
      ajax.filterPut('/category/update', this.addCategoryform).then(v => {
        this.dialogTableVisible = false
        this.defaultSlideImg = []
        this.defaultDetailImg = []
        this.twoChange(this.formInline.two)
        this.init({ id: this.id })
      })
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
     * 初始化一级分类
     */
    oneCategory (params) {
      ajax.get('/category/list', params).then((v) => {
        this.oneCategoryValue = v.pager_list
      })
    },
    /**
     * 获得二级分类
     */
    oneChange (cid, defaultCid = '') {
      this.formInline.two = ''
      this.sell = []
      ajax.get('/category/single', { c_id: cid }).then((v) => {
        this.twoCategoryValue = v.pager_list
        this.formInline.two = defaultCid
      })
    },
    /**
     * 获得二级分类下的属性
     */
    twoChange (cid) {
      this.form.c_id = cid
      this.sell = []
      this.addsell = []
      ajax.get('/category/single', { c_id: cid }).then(v => {
        this.addCategoryform.c_id = v.c_id
        this.addCategoryform.c_name = v.c_name
        this.addCategoryform.c_state = v.c_state
        this.addCategoryform.c_sort = v.c_sort
        this.addCategoryform.p_cid = v.p_cid
        this.addCategoryform.c_logo = v.c_logo
        this.addCategoryform.c_logo_thumb = v.c_logo_thumb
        if (!v.categoryAndAttrGroup) {
          return
        }
        this.addCategoryform.categoryAndAttrGroup.cag_id = v.categoryAndAttrGroup.cag_id
        this.addCategoryform.categoryAndAttrGroup.filter_attr = v.categoryAndAttrGroup.filter_attr

        let sell = JSON.parse(v.categoryAndAttrGroup.sell_attr)
        this.addsell = this.getNewAttrInitSell(sell)
        sell.map(v => (v.defaultSell = []))
        this.sell = sell
      })
    },
    /**
     * 获得属性列表的回显效果
     */
    getSingleCid (params) {
      let cid = params.c_id
      ajax.get('/category/single', { c_id: cid }).then(v => {
        this.formInline.one = parseInt(v.p_cid)

        this.addCategoryform.c_id = v.c_id
        this.addCategoryform.c_name = v.c_name
        this.addCategoryform.c_state = v.c_state
        this.addCategoryform.c_sort = v.c_sort
        this.addCategoryform.p_cid = v.p_cid
        this.addCategoryform.c_logo = v.c_logo
        this.addCategoryform.c_logo_thumb = v.c_logo_thumb

        this.oneChange(v.p_cid, v.c_id)
        if (!v.categoryAndAttrGroup) {
          return
        }

        this.addCategoryform.categoryAndAttrGroup.cag_id = v.categoryAndAttrGroup.cag_id
        this.addCategoryform.categoryAndAttrGroup.filter_attr = v.categoryAndAttrGroup.filter_attr

        let sell = JSON.parse(v.categoryAndAttrGroup.sell_attr)
        this.addsell = this.getNewAttrInitSell(sell)
        let defaultAttr = JSON.parse(params.sell_attribute)
        sell.map(v => (v.defaultSell = []))
        this.sell = sell
        this.getDefaultAttr(defaultAttr, sell)
      })
    },
    /**
     * 获得默认值效果
     */
    getDefaultAttr (defaultAttr, oldAttr) {
      let oAttr = []
      defaultAttr.forEach(v => {
        v.v.forEach(r => {
          oAttr.push(r.av_id)
        })
      })
      oldAttr.forEach(v => {
        v.v.forEach(r => {
          if (oAttr.indexOf(r.av_id) !== -1) {
            v.defaultSell.push(r.av_id)
          }
        })
      })
    },
    /**
     * 上传轮播图
     */
    handleSlideImg (params) {
      tengxuncloud(params).then((res) => {
        if (res.statusCode === 200) {
          res.img_thumb = `${res.Location}?imageView2/1/w/300/h/300/q/85`
          params.onSuccess(res)
        } else {
          res.onSuccess('失败')
        }
      })
    },
    successSlideImg (response, file, fileList) {
      if (fileList.length > 3) {
        fileList.splice(0, 1)
        this.p_slide_img.splice(0, 1)
      }
      this.p_slide_img.push({
        img_ori: `http://${response.Location}`,
        img_thumb: `http://${response.img_thumb}`,
        sort: 1
      })
    },
    removeSlideImg (file, fileList) {
      this.p_slide_img = []
      fileList.forEach((e) => {
        this.p_slide_img.push({
          img_ori: e.response.Location,
          img_thumb: e.response.img_thumb,
          sort: 1
        })
      })
    },
    /**
     * 上传详情
     */
    handleDetaiImg (params) {
      tengxuncloud(params).then((res) => {
        if (res.statusCode === 200) {
          res.img_thumb = `${res.Location}?imageView2/1/w/200/h/300/q/85`
          params.onSuccess(res)
        } else {
          res.onSuccess('失败')
        }
      })
    },
    successDetaiImg (response, file, fileList) {
      if (fileList.length > 3) {
        fileList.splice(0, 1)
        this.p_detail_img.splice(0, 1)
      }
      this.p_detail_img.push({
        img_ori: `http://${response.Location}`,
        img_thumb: `http://${response.img_thumb}`,
        sort: 1
      })
    },
    removeDetaiImg (file, fileList) {
      this.p_detail_img = []
      fileList.forEach((e) => {
        this.p_detail_img.push({
          img_ori: e.response.Location,
          img_thumb: e.response.img_thumb,
          sort: 1
        })
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * 拼接属性
     */
    getNewAttr (params) {
      let sell = params
      let newSell = []
      for (const key of sell) {
        if (key.defaultSell.length !== 0) {
          let obj = {
            ak_id: key.ak_id,
            ak_name: key.ak_name,
            v: []
          }
          key.v.forEach(v => {
            key.defaultSell.forEach(r => {
              if (r === v.av_id) {
                obj.v.push({
                  av_id: v.av_id,
                  av_name: v.av_name
                })
              }
            })
          })
          newSell.push(obj)
        }
      }
      return newSell
    },
    /**
     * 更新
     */
    onSubmit (formName) {
      let newSell = this.getNewAttr(this.sell)
      if (newSell.length === 0) {
        this.$message({
          message: '请选择销售属性',
          type: 'warning'
        })
        return
      }
      if (this.p_slide_img.length === 0) {
        this.$message({
          message: '请上传轮播图',
          type: 'warning'
        })
        return
      }
      if (this.p_detail_img.length === 0) {
        this.$message({
          message: '请上传详情图',
          type: 'warning'
        })
        return
      }
      this.form.sell_attribute = JSON.stringify(newSell)
      this.form.p_slide_img = JSON.stringify(this.p_slide_img)
      this.form.p_detail_img = JSON.stringify(this.p_detail_img)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.put('/product/update', this.form).then(v => {
        this.$router.go(-1)
      })
        }
      })
    }
  }
}
</script>
<style lang="scss">

</style>
