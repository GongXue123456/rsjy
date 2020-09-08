import React, { Fragment } from "react"
import { Form, Input, Button, DatePicker, Select, InputNumber, Radio,Divider } from 'antd';
import ajax from '../../aixos/axios'
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 5,
    },
    sm: {
      span: 24,
      offset: 5,
    },
  },
};
class UserEdit extends React.Component {
  state = {
    user_code: '',
    login_name: '',
    login_pass: '',
    integral: '',
    user_name: '',
    sex: '',
    age: '',
    occ:'',
    mobile_phone:'',
    type: '',
    height: '',
    weight: '',
    loading: false
  }

  componentDidMount () {
    this.setState({
      user_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    ajax.get('/pc/user/single', {user_code: id}).then((v)=>{
      self.setState({
        login_name: v.user.login_name,
        login_pass: v.user.login_pass,
        integral: v.user.integral,
        user_name: v.user.user_name,
        sex: v.user.sex +'',
        age: v.user.age,
        occ:v.user.occ,
        mobile_phone:v.user.mobile_phone,
        type: v.user.type,
        height: v.user.height,
        weight: v.user.weight
      })
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        values.user_code = this.state.user_code
        ajax.put('/pc/user/update', values).then((v) => {
          this.setState({
            loading: false
          })
        }, (err) => {
          this.setState({
            loading: false
          })
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="用户账号">
            {getFieldDecorator('login_name', {
              initialValue: this.state.login_name,
              rules: [
                {
                  required: true,
                  message: '请输入正确账号!',
                },
              ]
            })(<Input placeholder="请输入用户账号" />)}
          </Form.Item>
          <Form.Item label="用户密码">
            {getFieldDecorator('login_pass', {
              initialValue: this.state.login_pass,
              rules: [
                {
                  required: true,
                  message: '请输入正确密码!',
                },
              ]
            })(<Input placeholder="请输入用户密码" />)}
          </Form.Item>
          <Form.Item label="用户积分">
            {getFieldDecorator('integral', {
              initialValue: this.state.integral,
            })(<InputNumber placeholder="用户积分" min={1} max={10} />)}
          </Form.Item>


          <Form.Item label="用户姓名">
            {getFieldDecorator('user_name', {
              initialValue: this.state.user_name,
              rules: [
                {
                  required: true,
                  message: '请输入姓名!',
                },
              ]
            })(<Input placeholder="请输入用户姓名" />)}
          </Form.Item>

          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              initialValue: this.state.sex
            })(
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="生日">
            {getFieldDecorator('birthday', {})(<DatePicker locale={locale} format="YYYY-MM-DD" />)}
          </Form.Item>
          <Form.Item label="年龄">
            {getFieldDecorator('age', {
              initialValue: this.state.age,
              rules: [
                {
                  required: true,
                  message: '请输入年龄!',
                },
              ]
            })(<InputNumber placeholder="年龄" />)}
          </Form.Item>
          <Form.Item label="职业">
            {getFieldDecorator('occ', {
              initialValue: this.state.occ,
              rules: [
                {
                  required: true,
                  message: '请输入职业!',
                },
              ]
            })(<Input placeholder="职业" />)}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator('mobile_phone', {
              initialValue: this.state.mobile_phone,
              rules: [
                {
                  required: true,
                  message: '请输入电话!',
                },
              ]
            })(<Input placeholder="电话" />)}
          </Form.Item>
          <Form.Item label="用户类型">
            {getFieldDecorator('type', {
              initialValue: this.state.type,
              rules: [
                {
                  required: true,
                  message: '请输入用户类型!',
                },
              ]
            })(
              <Select placeholder="用户类型">
                <Option value={1}>超级管理员</Option>
                <Option value={2}>平台管理员</Option>
                <Option value={3}>APP用户</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="用户身高">
            {getFieldDecorator('height', {
              initialValue: this.state.height,
            })(<Input placeholder="身高" />)}
          </Form.Item>
          <Form.Item label="用户体重">
            {getFieldDecorator('weight', {
              initialValue: this.state.weight,
            })(<Input placeholder="体重" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{marginRight: 20}} loading={this.state.loading}>
                更新
              </Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const WrappedNormalUserEdit = Form.create({ name: 'normal_UserEdit' })(UserEdit);
export default WrappedNormalUserEdit