<template>
  <div>
    <Nav title='培训考试' />
   
    <div class="exam">
    <div>
      <div class="box" v-for="(item, key) in page.train_exam_topic_list" :key="key">
        <h2>{{key+1}}、{{item.train_exam_topic_title}}</h2>
        <div class="box_radio">
            <div class="radio">
                <input :id="'onRadio1_'+item.train_exam_topic_code" type="radio" :name="item.train_exam_topic_code" value="A" v-model="item.train_exam_topic_answer">
                <label :for="'onRadio1_'+item.train_exam_topic_code" class="a">A、{{item.train_exam_topic_option_a}}</label>
            </div>
            <div class="radio">
                <input :id="'onRadio2_'+item.train_exam_topic_code" type="radio" :name="item.train_exam_topic_code" value="B" v-model="item.train_exam_topic_answer">
                <label :for="'onRadio2_'+item.train_exam_topic_code" class="a">B、{{item.train_exam_topic_option_b}}</label>
            </div>
            <div class="radio">
                <input :id="'onRadio3_'+item.train_exam_topic_code" type="radio" :name="item.train_exam_topic_code" value="C" v-model="item.train_exam_topic_answer">
                <label :for="'onRadio3_'+item.train_exam_topic_code" class="a">C、{{item.train_exam_topic_option_c}}</label>
            </div>
            <div class="radio">
                <input :id="'onRadio4_'+item.train_exam_topic_code" type="radio" :name="item.train_exam_topic_code" value="D" v-model="item.train_exam_topic_answer">
                <label :for="'onRadio4_'+item.train_exam_topic_code" class="a">D、{{item.train_exam_topic_option_d}}</label>
            </div>
        </div>
      </div>
    </div>
    <div class="already">
      <cube-button @click="submit" :primary="true">考试结束</cube-button>
    </div>
  </div>
  </div>
</template>

<script>
import axios from '../../axios'
import {local, systeamCode} from '../../utils'
import Nav from '../../components/Nav'
export default {
  components: {
    Nav
  },
  data() {
    return {
      page:{
        train_exam_log_code: '',
        train_exam_title: '',
        train_code: '',
        train_exam_code: '',
        user_code_chef: '',
        user_name_chef: '',
        sum_num: '',
        right_num: '',
        error_num: '',
        train_exam_standard: 2,
        train_exam_topic_list: []
      },
      train_exam_standard:''
    }
  },
  created() {
    this.page.train_code = this.$route.query.train_code
    this.page.train_exam_code = this.$route.query.train_exam_code
    this.init(this.page.train_code, this.page.train_exam_code)
    this.page.user_code_chef = local.get('user_code')
    this.getUser(this.page.user_code_chef)
  },
  methods: {
    init(train_code, train_exam_code) {
      axios.get('app/trainExamLog/exam/single',{train_code, train_exam_code}).then(v => {
        this.page.train_exam_topic_list = v.data.train_exam_topic_list
        this.page.sum_num = this.page.train_exam_topic_list.length
        this.page.train_exam_log_code = v.data.train_exam_log_code
        this.page.train_exam_title = v.data.train_exam.train_exam_title
        this.page.train_exam_standard = v.data.train_exam.train_exam_standard
        window.console.log()
      })
    },
    getUser (user_code) {
      axios.get('/app/user/single', {user_code}).then(v => {
        this.page.user_name_chef = v.data.user_name
      })
    },
    submit() {
      let right_num = 0
      let error_num = 0
      for (const iterator of this.page.train_exam_topic_list) {
        if (!iterator.train_exam_topic_answer) {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '题没有答完,请继续答题'
          }).show()
          return
        }

        if (iterator.train_exam_topic_standard === iterator.train_exam_topic_answer) {
          right_num ++
        } else {
          error_num ++
        }
      }
      this.train_exam_standard = right_num >= this.page.train_exam_standard ? 2 : 1
      this.page.right_num = right_num
      this.page.error_num = error_num
      this.showDialog()
    },
    showDialog() {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '提交',
        content: '确认试卷已做完',
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          let params = {
            train_exam_topic_log_list: this.page.train_exam_topic_list.map(v => {
              v.train_exam_topic_log_code = systeamCode.get('114')
              v.user_code = this.page.user_code_chef
              v.user_name = this.page.user_name_chef
              v.train_exam_log_code = this.page.train_exam_log_code
              return v
            }),
            train_exam_log_code: this.page.train_exam_log_code,
            train_exam_title: this.page.train_exam_title,
            train_code: this.page.train_code,
            train_exam_code: this.page.train_exam_code,
            user_code_chef: this.page.user_code_chef,
            user_name_chef: this.page.user_name_chef,
            sum_num: this.page.sum_num,
            right_num: this.page.right_num,
            error_num: this.page.error_num,
            train_exam_standard: this.train_exam_standard,
          }
          axios.post('app/trainExamLog/exam/save', params).then((v) => {
            let result = v.data.exam_result === 'unpass' ? '未通过' : '通过'
            let btntxt=v.data.exam_result === 'unpass' ? '重新考试' : '返回列表'
            this.$createDialog({
              type: 'alert',
              title: `考试${result}`,
              content: `错题数是${v.data.error_num}道,共${v.data.sum_num}道`,
              confirmBtn: `${btntxt}`,
              onConfirm: () => {
                if(v.data.exam_result === 'unpass'){
                   this.init(this.page.train_code, this.page.train_exam_code)
                }else{
                   this.$router.go(-1)
                }
              }
            }).show()
          })
        }
      }).show()
    }
  }
}
</script>

<style lang="stylus" scoped>
.exam
  padding-top 54px
  .box
    background #fff
    border-bottom 1px solid #e2e2e2
    margin-top 10px
    padding-bottom 10px
    h2
      font-size 16px
      padding 10px
      line-height 1.6
    .box_radio
      color #7f7f7f
      padding 0 20px
      .radio
        input[type=radio]
          display none
          position absolute
          margin 4px 0 0 -20px
        label
          cursor pointer
          display inline-block
          font-size 15px
          margin-right 15px
          padding-left 25px!important
          position relative;
          margin-bottom 6px
          line-height 23px
          &::after,&::before
            display inline-block
            height 16px
            left 0
            margin-right 10px
            position absolute
            width 16px
            top 3px
            transition all .3s cubic-bezier(.455,.03,.215,1.33) 0s
            content: ""
          &::before
            background-color #fff
            border 1px solid #d0d0d0
            border-radius 99px
            z-index 2
          &::after
            border 1px solid #c8c7cc
            border-radius 99px
        input[type=radio]:checked + label:before
          border-width 6px
          background #fff
          border-color #1db667
          width 6px
          height 6px
        input[type=radio]:checked + label:after
          background #1db667
          border-color #1db667
</style>