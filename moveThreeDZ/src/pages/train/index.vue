<template>
  <div>
    <Nav title='培训考试' @myvalue="ser"  name='考试记录'/>
    <div class="train">
    
     <!-- <div class="title" ><span>考试记录</span></div> -->
    <div class="box" v-for="(items, key) in train_list" :key="key">
      <h1>
        {{items.train_year}}年度培训
      </h1>
      <div class="box_bd" v-for="(item, key) in items.train_log_list" :key="key + '季度'">
        <h2 @click="getCourseAndExam(item)" >{{item.train_quarter}} {{item.train_title}}</h2>
        <div  v-show="item.flag">
          <!-- <componentsindex  :ref="'train_code_'+item.train_code" /> -->
          <div class="componentsindex">
    <div >
      <div class="box" v-for="(item1, key) in train_course_list" :key="key">
        <p>{{item1.train_course_title}}</p>
        <span>
          <cube-button @click="$router.push({
            path:'trainCourse',
            query:{
              train_course_code: item1.train_course_code
              }
            })" :primary="true" :outline="true" :inline="true">去学习</cube-button>
        </span>
      </div>
    </div>
    
    <div 
    >
      <div class="box" v-for="(item2, key) in train_exam" :key="'train_exam_title_'+key">
        <p>{{item2.train_exam_title}}</p>
        <span>
          <cube-button v-if="item.is_pass==0||item.is_pass==1" @click="$router.push({
            path:'trainExam',
            query:{
              train_code: item2.train_code,
              train_exam_code: item2.train_exam_code
              }
          })" :primary="true" :inline="true">去考试</cube-button>
          <cube-button v-else-if="item.is_pass==2"  :primary="false" :inline="true">已通过</cube-button>
        </span>
      </div>
    </div>
    <!-- <hr> -->
  </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from '../../axios'
import Nav from '../../components/Nav'
export default {
   components: {
    Nav,
  },
  data: () => {
    return {
      train_list: [],
      flag:false,
      train_course_list: [],
      train_exam: [],
    }
  },
  created () {
    this.init()
  },
  methods: {
    init() {
      axios.get('app/trainExamLog/train/list').then(v => {
        this.train_list = v.data.train_list
        console.log(this.train_list)
        if(this.train_list.length>0){
          this.train_list.forEach(item=>{
          if(item.train_log_list){
            item.train_log_list.forEach(item1=>{
             item1.flag = false
          })
          }
          
        })
        }
        
      })
    },
     ser() {
       this.$router.push({path:'trainExamlog' })
    },
    getCourseAndExam(item) {
      this.train_course_list = []
      this.train_exam = []
    var flag = item.flag 
   this.train_list.forEach(item1=>{
     if(item1.train_log_list){
          item1.train_log_list.forEach(item2=>{
             item2.flag = false
          })
     }
        })
      item.flag  = !flag
       window.console.log(item.flag)
      let train_code = item.train_code
      axios.get('app/trainExamLog/trainCode', {train_code}).then(v => {
         window.console.log(v.data.train_course_list)
         if(v.data.train_course_list==undefined&&v.data.train_exam==undefined){
             this.$createToast({
        txt: '暂无课程和试题',
        type: 'txt',
        time: 500,
      }).show()
         
       }
       this.train_course_list = v.data.train_course_list||[]
      if (v.data.train_exam) this.train_exam.push(v.data.train_exam)
      
        // this.$refs['train_code_'+train_code][0].init(v.data.train_course_list, v.data.train_exam,item.flag)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.train 
  background url('../../assets/img/background_train_pic.png')
  background-size 100%
  padding 64px 15px 15px 15px
  .title
    text-align right 
    font-size 15px

  .box
    padding-bottom 20px
    h1
      font-weight bold
      height 35px
      line-height 35px
      font-size 22px
    .box_bd
      border-bottom 1px solid #eee
    h2
      font-size 16px
      color #333
      height 45px
      line-height 45px
      position relative
      padding-right 30px
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      word-break break-all
      &::after
        content " "
        display inline-block
        height 6px
        width 6px
        border-width 2px 2px 0 0
        border-color #c8c8cd
        border-style solid
        -webkit-transform matrix(.71,.71,-.71,.71,0,0)
        transform matrix(.71,.71,-.71,.71,0,0)
        position absolute
        top 15px
        margin-top 0
        right 10px
    .componentsindex
      .box
        height 45px
        display flex
        line-height 45px
        justify-content space-between
        padding 0 15px 0 15px
        position relative
        &::before
          content ""
          width 4px
          height 4px
          background #26c461
          position absolute
          border-radius 2px
          top 18px
          left 0
          display block
        span
          margin-top: -5px;
        p
          font-size 14px
</style>