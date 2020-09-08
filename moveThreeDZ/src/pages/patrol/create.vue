<template>
  <div>
    <Nav title='派发工单' />
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
        <cube-form-item :field="fields[2]"></cube-form-item>
        <cube-form-item :field="fields[3]">
          <cube-button :light="true" @click="showDrawer">{{company.company_name || '必选'}}</cube-button>
        </cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button :primary="true" type="submit">派发工单</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import moment from 'moment'
import Nav from '../../components/Nav'
import axios from '../../axios/index.js'
import {local} from '../../utils'
export default {
  components: {
    Nav
  },
  data () {
    return {
      model: {
        user_name: '',
        patrol_user_name: '',
        patrol_time: '',
        company_name: ''
      },
      company: {},
      user_code: local.get('user_code'),
      fields: [
        {
          type: 'input',
          modelKey: 'user_name',
          label: '派发人',
          rules: {
            required: true
          },
          props: {
            disabled: 'disabled'
          }
        },
        {
          type: 'input',
          modelKey: 'patrol_user_name',
          label: '巡查人',
          rules: {
            required: true
          },
          props: {
            disabled: 'disabled'
          }
        },
        {
          type: 'input',
          modelKey: 'patrol_time',
          label: '巡查时间',
          rules: {
            required: true
          },
          props: {
            disabled: 'disabled'
          }
        },
        {
          modelKey: 'company_name',
          label: '巡查对象',
          rules: {
            required: true
          }
        }
      ]
    }
  },
  created() {
    this.model.patrol_time = moment().format('YYYY-MM-DD')
    this.getUser(this.user_code)
    this.company = this.$store.state.patrol.company
    this.model.company_name = this.company.company_name
  },
  methods: {
    getUser (user_code) {
      axios.get('/app/user/single', {user_code: user_code}).then(v => {
        this.model.user_name = v.data.user_name
        this.model.patrol_user_name = v.data.user_name
      })
    },
    validateHandler (res) {
      window.console.log(res)
    },
    submitHandler (res) {
      window.console.log(res)
    },
    showDrawer () {
      this.$router.push({
        path: 'patrolthreesmallcompany'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
 /deep/ .cube-form
   padding-top 54px
 
</style>