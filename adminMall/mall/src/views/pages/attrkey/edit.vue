<template>
  <div>
    <div class="b-title">
      添加属性
    </div>
    <el-form ref="rulesform" :model="form"  :rules="rules" label-width="80px" >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="属性名称" prop="ak_name">
              <el-input v-model="form.ak_name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
               <el-select v-model="form.ak_state" placeholder="状态">
                <el-option label='启用' value="1" ></el-option>
                <el-option label='禁用' value="2" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="排序" prop="ak_sort">
              <el-input v-model="form.ak_sort" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型">
               <el-select v-model="form.ak_type" placeholder="类型">
                <el-option label='商品' value="1" ></el-option>
                <el-option label='菜' value="2" ></el-option>
              </el-select>
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
        ak_id: '',
        ak_name: '',
        ak_state: '1',
        ak_sort: '',
        ak_type: '1',
        ak_iscolor: '2',
        ak_isinput: '2',
        ak_isselect: '2',
        ak_issearch: '2',
        ak_isrequired: '2',
        ak_ismtp: '2'
      },
      rules: {
        ak_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        ak_sort: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.form.ak_id = this.$route.query.ak_id
    this.init({ id: this.form.ak_id })
  },
  methods: {
    init (params) {
      ajax.get('/attrKey/single', params).then(v => {
        this.form.ak_name = v.ak_name
        this.form.ak_sort = v.ak_sort
        this.form.ak_state = v.ak_state + ''
        this.form.ak_type = v.ak_type + ''
      })
    },
    onhandle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.put('/attrKey/update', this.form).then(v => {
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
