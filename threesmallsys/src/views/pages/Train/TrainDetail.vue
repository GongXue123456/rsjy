<template>
  <el-container class="patroldetail">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>培训详情</h5>
        <div>
          <el-button v-if="user.user_code==user_code&&list2.length==0" icon="el-icon-plus" size="small" type="primary" @click="TestAdd">添加试卷</el-button>
          <el-button v-if="user.user_code==user_code" icon="el-icon-plus" size="small" type="primary" @click="CourseAdd">添加课程</el-button>
          <el-button  class="back_btn" size="small" plain @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0">
    <el-tabs v-model="activeName">
    <el-tab-pane label="课程/试卷" name="first">
    <div class="box list">
       <!-- <el-col :span="24" class="patroldetail-title bgcfbe tl mb20 pl15">学习课程</el-col> -->
      <el-table :data="list1" style="width: 100%">
        <!-- <el-table-column type="index" width="100" label="序号"></el-table-column> -->
        <el-table-column prop="train_course_title" label="学习课程"></el-table-column>
        <el-table-column label="操作" width="180" align='center' fixed="right">
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail(scope.row.train_course_code)" >详情</el-button>
           <el-button  v-if="user.user_code==user_code" type="text" class="orange disib " size="mini" @click="goedit(scope.row.train_course_code)">编辑</el-button>
           <!-- <el-button  v-if="user.user_code==user_code" type="text" class="orange disib " size="mini" @click="todelete(scope.row.train_course_code)">删除</el-button> -->
           <el-button  v-if="user.user_code==user_code&&scope.row.train_course_state==1"  type="text" class="orange disib " size="mini" @click="changeType(2,scope.row.train_course_code)">禁用</el-button>
           <el-button  v-if="user.user_code==user_code&&scope.row.train_course_state==2"  type="text" class="orange disib " size="mini" @click="changeType(1,scope.row.train_course_code)">启用</el-button>
           <!-- <el-button  v-if="user.user_code==scope.row.user_code&&scope.row.train_state==1"  type="text" class="orange disib " size="mini" @click="changeType(2,scope.row.train_code)">禁用</el-button>
           <el-button  v-if="user.user_code==scope.row.user_code&&scope.row.train_state==2"  type="text" class="orange disib " size="mini" @click="changeType(1,scope.row.train_code)">启用</el-button> -->
         </template>
        </el-table-column>
      </el-table>
      <div style="width:100%;height:50px;background-color:#eee"></div>
      <el-table :data="list2" style="width: 100%">
        <!-- <el-table-column type="index" width="100" label="序号"></el-table-column> -->
        <el-table-column prop="train_exam_title" label="试卷标题"></el-table-column>
        <el-table-column label="操作" width="180" align='center' fixed="right">
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small" @click="godetail1(scope.row.train_exam_code)">详情</el-button>
            <el-button  v-if="list2!=[]&&user.user_code==user_code" type="text" class="orange disib " size="mini" @click="goedit1(scope.row.train_exam_code)">编辑</el-button>
                     <el-button  v-if="list2!=[]&&user.user_code==user_code" type="text" class="orange disib " size="mini" @click="todelete(scope.row.train_exam_code)">删除</el-button>
           <!-- <el-button  v-if="user.user_code==scope.row.user_code&&scope.row.train_state==1"  type="text" class="orange disib " size="mini" @click="changeType(2,scope.row.train_code)">禁用</el-button>
           <el-button  v-if="user.user_code==scope.row.user_code&&scope.row.train_state==2"  type="text" class="orange disib " size="mini" @click="changeType(1,scope.row.train_code)">启用</el-button> -->
         </template>
        </el-table-column>
      </el-table>
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
       train_code:'',
      },
      activeName: 'first',
       list1: [],
       list2: [],
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
     this.page.train_code=this.$route.query.id;
     this.init(this.page)
  },
  methods: {
     init (params) {
       axios.get('/api/trainCourse/list', params).then((v) => {
       this.list1=v.train_course_list;
       this.list2=v.train_exam?[v.train_exam]:[];
       this.user_code=v.user_code
      })
    },
    CourseAdd(){
        this.$router.push({name: "CourseAdd",query: {id: this.page.train_code,}});
    },
    TestAdd(){
        this.$router.push({name: "TestAdd",query: {id: this.page.train_code,}});
    },
      godetail(index){this.$router.push({name: "CourseDetail",query: {id: index}});},
      godetail1(index){this.$router.push({name: "TestDetail",query: {id: index}});},
        goedit(index){this.$router.push({name: "CourseAdd",query: {id: index,id1:1}});},
        goedit1(index){this.$router.push({name: "Testedit",query: {id: index}});},
         changeType(id,val){
      axios.put('/api/trainCourse/state/update', {train_course_code:val,train_course_state:String(id)}).then((v) => {
     this.list1.forEach(item=>{
           if(item.train_course_code==val){
             if(id==1){
               item.train_course_state=1
             }else{
                item.train_course_state=2
             }
           }
         })
      })
  },
        todelete(index){
           this.$confirm('确认删除!删除后所有信息无法恢复！请谨慎删除！', '删除信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete('/api/trainExam/delete',{train_exam_code:index}).then((v) => {
            this.list2=[]
      })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
    // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.formInline.pager_offset = 0
      this.init1(this.formInline)
    },
    // 分页
    currentChange(page){
      this.currentPage = page;
      this.formInline.pager_offset = (page - 1) * 10
       this.init1(this.formInline)
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
