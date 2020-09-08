<template>
  <div>
    <Nav title='培训课程' />
    <div class="course">
    <h2>
      {{train_course.train_course_title}}
    </h2>
    <div class="studyTime">
      课程共 {{train_course.train_course_period}} 学时
    </div>
    <div class="con" v-html="train_course.train_course_content">

    </div>
    <div class="already">
      <cube-button @click="submit" :primary="true">已学完</cube-button>
    </div>
  </div>
  </div>
</template>

<script>
import axios from '../../axios'
import {local} from '../../utils'
import Nav from '../../components/Nav'
export default {
  components: {
    Nav
  },
  data() {
    return {
      params: {
        train_course_code: '',
        train_code: '',
        user_code_chef: ''
      },
      train_course: {}
    }
  },
  created(){
    this.params.train_course_code = this.$route.query.train_course_code
    this.params.user_code_chef = local.get('user_code')
    this.init(this.params.train_course_code)
  },
  methods: {
    init(train_course_code) {
      axios.get('app/trainExamLog/course/single', {train_course_code}).then(v => {
        this.train_course = v.data.train_course
        this.params.train_code = v.data.train_course.train_code
      })
    },
    submit() {
      axios.post('app/trainCourseLog/save', this.params).then(() => {
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="stylus">
.course
  padding 69px 15px 15px 15px
  h2
    font-size 22px
    color #333
    line-height 30px
    font-weight bold
  .studyTime
    color #a6a6a6
    height 40px
    line-height 40px
    border-bottom 1px solid #ebebeb
    margin-bottom 10px
    font-size 12px
  .con
    word-break break-all
    p
      font-size 14px
      line-height 1.8
    img
      width 100%
  .already
    margin-top 20px
</style>