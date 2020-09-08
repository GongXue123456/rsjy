<template>
  <div class='examlog'>
      <Nav title='考试记录' />
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="train_exam_log_list"
          :options="options"
          @pulling-up="onPullingUp">
          <div class="box" v-for="(item, key) in train_exam_log_list" :key="key">
            <cell title="序号" :content="key + 1 + ''" />
            <cell title="考试标题" :content="item.train_exam_title" />
            <cell title="考试时间" :content="item.addtime" />
            <div class="observe">
              <cube-button :primary="true" :inline="true" @click="submit(item)">查看明细</cube-button>
            </div>
          </div>
          <div v-show="flag" class="none">
            暂无数据
          </div>
        </cube-scroll>
      </div>
      <div class="coursomPopup" v-show="showFlag">
        <div class="exam_title">
          课程标题: <span> {{train_exam.train_exam_title}}</span> 
        </div>
        <div class="exam_title">
          合格题数: <span> {{train_exam.train_exam_standard}}</span>
        </div>
        <div class="box" v-for="(item, key) in train_exam_topic_log_list" :key="'train_exam_topic_log_list_'+key">
            <div class="box_titie"> <span>题目1:</span>  {{item.train_exam_topic_title}}</div>
            <div class="box_content">
              <div class="box_content_item">A: {{item.train_exam_topic_option_a}}</div>
              <div class="box_content_item">B: {{item.train_exam_topic_option_b}}</div>
              <div class="box_content_item">C: {{item.train_exam_topic_option_c}}</div>
              <div class="box_content_item">D: {{item.train_exam_topic_option_d}}</div>
            </div>
            <div :class="item.train_exam_topic_answer === item.train_exam_topic_standard ? 'box_success' : 'box_error'">
              用户答案 {{item.train_exam_topic_answer}}
            </div>
        </div>
        <cube-button :outline="true" @click="back">返回</cube-button>
      </div>
  </div>
</template>

<script>
import axios from '../../axios'
import cell from '../../components/cell'
import Nav from '../../components/Nav'
export default {
  components: {
    cell,
    Nav
  },
  data() {
    return {
      showFlag: false,
      stats: ['', '未合格', '合格'],
      train_exam_log_list: [],
      train_exam: {},
      train_exam_topic_log_list: [],
      params: {
        pager_offset: 0,
        pager_openset: 2,
        news_category_code: ''
      },
      pullUpLoad: false,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载...',
      pullUpLoadNoMoreTxt: '暂无数据',
      flag: false
    }
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
    },
    pullUpLoadObj() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      axios.get('app/trainExamLog/user').then(v => {
        this.train_exam_log_list = v.data.train_exam_log_list
        if(v.data.train_exam_log_list){
           this.flag=false
        }else{
          this.flag=true
        }
      })
    },
    onPullingUp() {},
    submit(item) {
      let params = {
        train_exam_log_code: item.train_exam_log_code,
        train_code: item.train_code
      }
      axios.get('app/trainExamLog/single', params).then(v => {
        this.showFlag = true
        this.train_exam = v.data.train_exam
        this.train_exam_topic_log_list = v.data.train_exam_topic_log_list
      })
    },
    back() {
        this.showFlag = false
        this.train_exam = {}
        this.train_exam_topic_log_list = []
    }
  }
}
</script>

<style lang="stylus" scoped>
.examlog
  padding-top 54px
  .scroll-list-wrap
    position absolute
    width 100%
    top 54px
    bottom 0
    .box
      margin-bottom 10px
      .observe
        padding 10px
        background #fff
        border-top 1px solid #e5e5e5
    .none
      text-align center
      margin-top 20px
      font-size 15px
      color #a5a5a5
  .coursomPopup
    position fixed
    left 0
    top 54px
    bottom 0
    right 0
    background #ffffff
    z-index 9
    overflow-y scroll 
    padding 10px
    color #333333
    .exam_title
      font-size 18px
      font-weight bold
      margin-bottom 20px
      span
        font-weight normal
        font-size 16px
    .box
      font-size 15px
      margin-bottom 20px
      .box_titie
        margin-bottom 10px
        line-height 24px
        font-size 16px
        span
          font-weight bold
      .box_content
        display flex
        flex-wrap wrap
        font-size 15px
        .box_content_item
          flex 0 0 50%
          margin-bottom 10px
          line-height 20px
      .box_success
        font-weight bold
        color $success-color
      .box_error
        font-weight bold
        color $error-color
        margin-top 10px
</style>