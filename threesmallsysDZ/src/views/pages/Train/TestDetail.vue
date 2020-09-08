<template>
  <el-container class="recorddetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>试卷详情</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0 pr">
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane  label="试卷内容" name="first">
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">试卷信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">试卷标题：</span><span class="c333">{{list.train_exam_title}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">合格题数：</span><span class="c333">{{list.train_exam_standard}}</span>
        </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">试题信息</el-col>
         <div v-for="(item, index) in list.train_exam_topic_list" :key="index" class="border-b w disib m10">
              <el-col :span="24" class="tl mb20" :offset="1">
          <span class="left c000 fb">试题{{index+1}}：</span><span class="c000 fb">{{item.train_exam_topic_title}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">选项内容A：</span><span class="c333">{{item.train_exam_topic_option_a}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">选项内容B：</span><span class="c333">{{item.train_exam_topic_option_b}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">选项内容C：</span><span class="c333">{{item.train_exam_topic_option_c}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">选项内容D：</span><span class="c333">{{item.train_exam_topic_option_d}}</span>
        </el-col>
         <el-col :span="24" class="tl mb20" :offset="1">
          <span class="left">正确答案：</span><span class="c333">{{item.train_exam_topic_standard}}</span>
        </el-col>
         </div>
     </el-row>
    </el-tab-pane>
   
  </el-tabs>
      
    
    <!-- 
      -->
      </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import aa from '../../../../static/data.json'
export default {
  data () {
    return {
      page: {
       train_exam_code:'',
      },
      activeName: 'first',
       list: [],

    }
  },
   created () {
     this.page.train_exam_code=this.$route.query.id;
     this.init(this.page)
  },
  methods: {
      init (params) {
      axios.get('/api/trainExam/single', params).then((v) => {
       this.list=v
      })
    },
    

  }
}
</script>
<style lang="scss" scoped>
.recorddetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    div{min-height: 20px}
    img{width: 18px;margin-left: 5px;vertical-align: text-bottom}
    .type_img{    
  position: absolute;
    right: 10%;
    width: 80px;
    z-index: 100;
    top: 10%;}
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recorddetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
/deep/ .el-collapse{border:1px solid rgba(235, 239, 241, 1);
  .el-collapse-item__header{background:rgba(247,248,249,1);
  .flex{display: flex;align-items: center};
  .el-col-9{line-height: 1.5};
}
.el-collapse-item__content{padding-bottom: 0px;
.el-table{margin-bottom: 0px !important;}

} }

}

</style>
