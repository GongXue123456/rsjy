<template>
  <div class="skuadd">
    <div class="box">

      <el-form ref="rulesform" :model="form" label-width="80px" :rules="rules">
        <div class="b-title">
          sku基本信息
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="SKU编号" prop="ps_number">
              <el-input v-model="form.ps_number" placeholder="一级分类/二级分类/spu/sku 例如: 01 001 00001 001 空格自行去掉"></el-input>
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
            <el-form-item label="副标题" class="ps_sub_title">
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
          主图
        </div>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="主图">
              <el-upload
                ref="upload"
                multiple
                action=""
                :http-request="handleUpload"
                list-type="picture-card"
                :on-success="handlepoll"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('rulesform')">立即创建</el-button>
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
      cos: {},
      initData: {
        p_id: -1,
        ps_attribute: [],
        nocrux_attribute: []
      },
      attrGuoup: [],
      form: {
        ps_state: '1',
        ps_number: '',
        ps_sort: '',
        ps_main_title: '',
        ps_unit: '',
        ps_sub_title: '',
        ps_price_sell: '',
        ps_desc: '',
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
      dialogImageUrl: '',
      dialogVisible: false,
      isbusinesshere: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init () {
      let self = this
      this.initData.p_id = this.$route.query.p_id ? this.$route.query.p_id : -1
      this.initData.ps_attribute = this.$route.query.sell_attribute ? JSON.parse(this.$route.query.sell_attribute) : []
      ajax.get('/attrValue/avbyak', { ak_id: 7 }).then(v => {
        self.initData.nocrux_attribute = v
      })
    },
    /**
     * 添加一条SKU
     */
    onSubmit (rulesform) {
      let self = this
      this.$refs[rulesform].validate((valid) => {
        if (valid) {
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
              message: '主图不能为空',
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
          ajax.post('/productSpec/save', params)
        }
      })
    },
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
    handleRemove (file, fileList) {
      let self = this
      self.form.ps_detail_img.rotary_img = []
      fileList.forEach((e) => {
        self.form.ps_detail_img.rotary_img.push({
          img_ori: e.response.Location,
          img_thumb: e.response.img_thumb,
          sort: 1
        })
      })
    },
    handleUploaddetail (params) {
      tengxuncloud(params).then((res) => {
        if (res.statusCode === 200) {
          res.img_thumb = `${res.Location}?imageView2/1/w/300/h/300/q/85`
          params.onSuccess(res)
        } else {
          res.onSuccess('失败')
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * 验证这条SKU是否存在
     */
    attrHandle (valID) {
      let params = []
      let self = this
      this.initData.ps_attribute.forEach(element => {
        element.v.forEach(res => {
          if (valID === res.av_id) {
            element.av_name = res.av_name
          }
        })
      })
      let attr = JSON.parse(JSON.stringify(this.initData.ps_attribute))
      attr.forEach(element => {
        delete element.v
        if (element.av_name) {
          params.push(element)
        }
      })
      let data = {
        p_id: this.initData.p_id,
        attrs: encodeURIComponent(JSON.stringify(params), 'utf-8')
      }
      ajax.get('/productSpec/singleSpecByAttr', data).then((v) => {
        if (v) {
          self.$message({
            message: '这条SKU的规格已存在请重新选择！',
            type: 'warning'
          })
          self.isbusinesshere = true
        } else {
          self.isbusinesshere = false
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
