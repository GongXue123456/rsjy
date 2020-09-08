<template>
  <div class="componentsindex">
    <div v-if="flag">
      <div class="box" v-for="(item, key) in train_course_list" :key="key">
        <p>{{item.train_course_title}}</p>
        <span>
          <cube-button @click="$router.push({
            path:'trainCourse',
            query:{
              train_course_code: item.train_course_code
              }
            })" :primary="true" :outline="true" :inline="true">去学习</cube-button>
        </span>
      </div>
    </div>
    
    <div v-if="flag"
    >
      <div class="box" v-for="(item, key) in train_exam" :key="'train_exam_title_'+key">
        <p>{{item.train_exam_title}}</p>
        <span>
          <cube-button @click="$router.push({
            path:'trainExam',
            query:{
              train_code: item.train_code,
              train_exam_code: item.train_exam_code
              }
          })" :primary="true" :inline="true">去考试</cube-button>
        </span>
      </div>
    </div>
    <!-- <hr> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      train_course_list: [],
      train_exam: [],
      flag:false
    }
  },
  methods: {
    init(train_course_list, train_exam,flag) {
      this.train_course_list = []
      this.train_exam = []
      this.train_course_list = train_course_list || []
      if (train_exam) this.train_exam.push(train_exam)
      window.console.log(flag)
      this.flag=flag
    }
  }
}
</script>

<style lang="stylus" scoped>
.componentsindex
  .box
    height 40px
    display flex
    line-height 40px
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
    p
      font-size 14px
</style>