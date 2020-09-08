<template>
  <div class="skuedit">
    <div class="box">
      <el-form ref="rulesform" :model="form" label-width="80px"  :rules="rules">
        <div class="b-title">
          sku基本信息
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="SKU编号" prop="ps_number">
              <el-input disabled v-model="form.ps_number" placeholder="一级分类/二级分类/spu/sku 例如: 01 001 00001 001 空格自行去掉"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="ps_sort">
              <el-input v-model.number="form.ps_sort" placeholder="数值越大排名越靠前"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="主标题" prop="ps_main_title">
              <el-input v-model="form.ps_main_title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="ps_unit">
              <el-select v-model="form.ps_unit" placeholder="单位">
                <el-option :key="item.ak_id" :label="item.av_name" :value="item.av_name" v-for="item in initData.nocrux_attribute"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="副标题">
              <el-input v-model="form.ps_sub_title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="sku描述" prop="ps_desc">
              <el-input type="textarea" v-model="form.ps_desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态" prop="ps_state">
              <el-select v-model="form.ps_state" placeholder="单位">
                <el-option label='启用' value="1" ></el-option>
                <el-option label='禁用' value="2" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="b-title">
          属性信息
        </div>

        <el-row :gutter="20" v-for="(item, k) in initData.ps_attribute" :key='k'>
          <el-col :span="24">
            <el-form-item :label="item.ak_name">
              <el-radio-group v-model="item.av_id"  size="medium" @change="attrHandle">
                <el-radio border v-for="(val,i) in item.v" :key='i' :label="val.av_id">
                    {{val.av_name}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="参考价格" prop="ps_price_sell">
              <el-input v-model="form.ps_price_sell"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="b-title">
          轮播图
        </div>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="轮播图(3张以内)">
              <el-upload
                ref="upload"
                multiple
                action=""
                :http-request="handleUpload"
                list-type="picture-card"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="rotary_img">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('rulesform')">立即修改</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import ajax from '../../../util/api'
import { tengxuncloud } from '../../../util/tengxun'
import _ from 'lodash'
export default {
  data () {
    return {
      id: '',
      initData: {
        p_id: '',
        nocrux_attribute: [],
        ps_attribute: []
      },
      form: {
        ps_state: '',
        ps_id: '',
        ps_number: '',
        ps_sort: '',
        ps_main_title: '',
        ps_unit: '',
        ps_sub_title: '',
        ps_desc: '',
        ps_price_sell: '',
        ps_detail_img: {
          rotary_img: []
        }
      },
      rules: {
        // ps_number: [
        //   { required: true, message: '不能为空', trigger: 'blur' },
        //   { pattern: /^\d{13}$/, message: '长度为13位数字', trigger: 'blur' }
        // ],
        ps_sort: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        ps_main_title: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        ps_unit: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        ps_desc: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
        // ps_price_sell: [
        //   { required: true, message: '不能为空', trigger: 'blur' },
        //   { type: 'number', message: '请输入数字', trigger: 'blur' }
        // ]
      },
      rotary_img: [],
      dialogImageUrl: '',
      dialogVisible: false,
      // 判断SKU是否存在false不存在 true存在
      isbusinesshere: false,
      defaultsAttribute: []
    }
  },
  created () {
    this.id = this.$route.query.id
    this.initData.p_id = this.$route.query.p_id ? this.$route.query.p_id : -1
    this.initData.ps_attribute = this.$route.query.sell_attribute ? JSON.parse(this.$route.query.sell_attribute) : []
    this.init(this.$route.query.id)
  },
  methods: {
    /**
     * 初始化 获得 单位信息， sku信息
     */
    init (id) {
      let self = this
      ajax.get('/attrValue/avbyak', { ak_id: 7 }).then(v => {
        self.initData.nocrux_attribute = v
      })
      ajax.get('/productSpec/single', { id: id }).then(v => {
        self.form.ps_id = v.ps_id
        self.form.ps_number = v.ps_number
        self.form.ps_state = v.ps_state + ''
        self.form.ps_sort = v.ps_sort
        self.form.ps_main_title = v.ps_main_title
        self.form.ps_unit = v.ps_unit
        self.form.ps_sub_title = v.ps_sub_title
        self.form.ps_desc = v.ps_desc
        this.defaultsAttribute = JSON.parse(v.ps_attribute)
        self.initData.ps_attribute.forEach(res => {
          this.defaultsAttribute.forEach(key => {
            if (res.ak_id === key.ak_id) {
              self.$set(res, 'av_id', key.av_id)
              self.$set(res, 'av_name', key.av_name)
            }
          })
        })
        self.form.ps_price_sell = v.ps_price_sell
        JSON.parse(v.ps_detail_img).rotary_img.forEach(res => {
          self.form.ps_detail_img.rotary_img.push({
            img_ori: res.img_ori,
            img_thumb: res.img_thumb,
            sort: 1
          })
          self.rotary_img.push({
            url: res.img_ori
          })
        })
      })
    },
    /**
     * 提交更新
     */
    onSubmit (formName) {
      let self = this
      let forms = JSON.parse(JSON.stringify(this.form))
      let initData = JSON.parse(JSON.stringify(this.initData))
      initData.ps_attribute.forEach(element => {
        element.v.forEach(res => {
          if (element.av_id === res.av_id) {
            element.av_name = res.av_name
          }
        })
        delete element.v
      })
      if (self.isbusinesshere) {
        self.$message({
          message: '这条SKU的规格已存在请重新选择！',
          type: 'warning'
        })
        return
      }

      if (forms.ps_detail_img.rotary_img.length === 0) {
        self.$message({
          message: '轮播图不能为空',
          type: 'warning'
        })
        return
      }
      if (initData.ps_attribute.length === 0) {
        self.$message({
          message: 'SPU无属性,无法添加SKU',
          type: 'warning'
        })
        return
      }
      forms.ps_detail_img = JSON.stringify(forms.ps_detail_img)
      initData.ps_attribute = JSON.stringify(initData.ps_attribute)
      const params = _.defaults(initData, forms)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.put('/productSpec/update', params).then(v => {
        this.$router.go(-1)
      })
        }
      })
    },
    /**
     * 验证这条SKU是否存在
     */
    attrHandle (valID) {
      this.isbusinesshere = false
      let oldarr = []
      // 获得初始化的数据保存一分
      this.defaultsAttribute.forEach(v => {
        if (v.av_id) {
          oldarr.push(v.av_id)
        }
      })
      let params = []
      this.initData.ps_attribute.forEach(element => {
        element.v.forEach(res => {
          if (valID === res.av_id) {
            element.av_name = res.av_name
          }
        })
      })
      let attr = JSON.parse(JSON.stringify(this.initData.ps_attribute))
      let newarr = []
      attr.forEach(element => {
        delete element.v
        if (element.av_name) {
          params.push(element)
          newarr.push(element.av_id)
        }
      })
      // 判断是否是自己
      if (this.getIsSelfAttr(oldarr, newarr)) {
        this.isbusinesshere = false
        return
      }
      this.getSingleSpecByAttr(params)
    },
    /**
     * 判断是否是自身
     */
    getIsSelfAttr (oldArr, newArr) {
      if (oldArr.length === newArr.length) {
        for (let i of newArr) {
          if (oldArr.indexOf(i) === -1) {
            return false
          }
        }
        return true
      }
      return false
    },
    /**
     * 判断属性是否存在
     */
    getSingleSpecByAttr (params) {
      let data = {
        ps_id: this.ps_id,
        p_id: this.initData.p_id,
        attrs: encodeURIComponent(JSON.stringify(params), 'utf-8')
      }
      ajax.get('/productSpec/singleSpecByAttr', data).then((v) => {
        if (v) {
          this.$message({
            message: '这条SKU的规格已存在请重新选择！',
            type: 'warning'
          })
          this.isbusinesshere = true
        } else {
          this.isbusinesshere = false
        }
      })
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
        this.form.ps_detail_img.rotary_img.splice(0, 1)
      }
      this.form.ps_detail_img.rotary_img.push({
        img_ori: `http://${response.Location}`,
        img_thumb: `http://${response.img_thumb}`,
        sort: 1
      })
    },
    handlePictureCardPreview () {

    },
    /**
     * 删除一张图片
     */
    handleRemove (file, fileList) {
      let self = this
      self.form.ps_detail_img.rotary_img = []
      fileList.forEach((e) => {
        if (self.form.ps_detail_img.rotary_img.response) {
          self.form.ps_detail_img.rotary_img.push({
            img_ori: e.response.Location,
            img_thumb: e.response.img_thumb,
            sort: 1
          })
        } else {
          self.form.ps_detail_img.rotary_img.push({
            img_ori: e.url,
            img_thumb: `${e.url}?imageView2/1/w/300/h/300/q/85`,
            sort: 1
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.skuadd{
  .el-form-item__label{
    &:before{
      content: '*';
      color: #F56C6C;
      margin-right: 4px;
    }
  }
}
.skuadd{
  .ps_sub_title{
    .el-form-item__label{
      &:before{
        content: '';
      }
    }
  }
}
</style>
