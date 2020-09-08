<template>
  <el-container class="patroldetail">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>课程详情</h5>
        <div><el-button v-if="user.user_code==user_code" icon="el-icon-plus" size="small" type="primary" @click="CourseAdd">添加课程</el-button><el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-tabs v-model="activeName">
    <el-tab-pane label="课程内容" name="first">
    <div class="box list">
      <h1 class="m15">{{list1.train_course_title}}</h1>
      <div class="tl f15 mb15">学时(小时)：{{list1.train_course_period}}</div>
      <div v-html='list1.train_course_content'></div>
    </div> 
    </el-tab-pane>
  </el-tabs>
  </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import { local } from '../../../util/util'
export default {
  data () {
    return {
      page: {
       train_course_code:'',
      },
      activeName: 'first',
       list1: [],
       companytag_code:'',
      formInline: {
          pager_offset: 0,
        patrol_user_name: '',
        company_code:'',
         search_time_end:'',
         search_time_bigen:'',
      },
       currentPage: 1,
      total: 0,
      user:'',
      user_code:''
    }
  },
   created () {
      this.user = local.get('user')
     this.page.train_course_code=this.$route.query.id;
     this.init(this.page)
  },
  methods: {
     init (params) {
       axios.get('/api/trainCourse/single', params).then((v) => {
      this.list1=v.train_course
      })
    },
   
  }
}
</script>
<style lang="scss" scoped>
.patroldetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
   .patroldetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .patroldetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}

}

</style>
