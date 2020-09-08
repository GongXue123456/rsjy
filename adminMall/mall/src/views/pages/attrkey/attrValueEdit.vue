<template>
  <div>
    <div class="b-title">
      修改属性值
    </div>
    <el-form ref="rulesform" :model="form" :rules="rules" label-width="80px" >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="值名称" prop="av_name">
              <el-input v-model="form.av_name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
               <el-select v-model="form.av_state" placeholder="状态">
                <el-option label='启用' value="1" ></el-option>
                <el-option label='禁用' value="2" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="排序" prop="av_sort">
              <el-input v-model="form.av_sort" placeholder="请输入"></el-input>
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
export default {
  data () {
    return {
      form: {
        av_name: '',
        av_state: '1',
        av_sort: '1',
        av_type: '',
        ak_id: ''
      },
      rules: {
        av_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        av_sort: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.form.ak_id = this.$route.query.ak_id
    this.form.av_type = this.$route.query.type
    this.form.av_id = this.$route.query.av_id
    this.init({ id: this.form.av_id })
  },
  methods: {
    init (params) {
      ajax.get('/attrValue/single', params).then(v => {
        this.form.av_name = v.av_name
        this.form.av_state = v.av_state + ''
        this.form.av_sort = v.av_sort
      })
    },
    onhandle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.put('/attrValue/update', this.form).then(v => {
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
