import React, { Fragment } from "react"
import { Form, Input, Button, DatePicker, Select, InputNumber, Radio,Divider } from 'antd';
import ajax from '../../aixos/axios'
import locale from 'antd/es/date-picker/locale/zh_CN';
import './index.less'
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
class UserAdd extends React.Component {
  state = {
    loading: false
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        ajax.post('/pc/user/save', values).then((v) => {
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
              rules: [
                {
                  required: true,
                  message: '请输入正确账号!',
                }
              ]
            })(<Input placeholder="请输入用户账号" />)}
          </Form.Item>
          <Form.Item label="用户密码">
            {getFieldDecorator('login_pass', {
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
            })(<InputNumber placeholder="用户积分" min={1} max={10} />)}
          </Form.Item>


          <Form.Item label="用户姓名">
            {getFieldDecorator('user_name', {
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
              initialValue: '1'
            })(
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
                <Radio value="3">不限</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="生日">
            {getFieldDecorator('birthday', {

            })(<DatePicker locale={locale} format="YYYY-MM-DD" />)}
          </Form.Item>
          <Form.Item label="年龄">
            {getFieldDecorator('age', {
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
              initialValue: '1',
              rules: [
                {
                  required: true,
                  message: '请输入用户类型!',
                },
              ]
            })(
              <Select placeholder="用户类型">
                <Option value="1">超级管理员</Option>
                <Option value="2">平台管理员</Option>
                <Option value="3">APP用户</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="用户身高">
            {getFieldDecorator('height', {
            })(<Input placeholder="身高" />)}
          </Form.Item>
          <Form.Item label="用户体重">
            {getFieldDecorator('weight', {
            })(<Input placeholder="体重" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{marginRight: 20}}  loading={this.state.loading}>
                添加
              </Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const WrappedNormalUserAdd = Form.create({ name: 'normal_UserAdd' })(UserAdd);
export default WrappedNormalUserAdd