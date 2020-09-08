<template>
  <div>
    <div class="b-title">
      添加属性
    </div>
    <el-form ref="rulesform" :model="form" :rules="rules" label-width="80px" >
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
            <el-form-item label="排序"  prop="ak_sort">
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
          <el-button  type="primary" @click="onhandle('rulesform')">添加</el-button>
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
        ak_name: '',
        ak_state: '1',
        ak_sort: '1',
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
  methods: {
    onhandle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.post('/attrKey/save', this.form)
        }
      })
    }
  }
}
</script>
<style lang="scss">

</style>
