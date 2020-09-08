import React, {Fragment} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import ajax from '../../aixos/axios'
import { local } from '../../util/utils'
import './index.less'

class Login extends React.Component{

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
        ajax.filtersPost('/pclogin/login', values).then((v) => {
          local.set('token', v.token)
          local.set('userinfo', v.user)
          this.props.history.push('/home/user/index')
        }, (err) => {
          this.setState({
            loading: false
          })
        })
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Fragment>
        <div className="bg">
          <div className="bg_title">
            颐麦健康后台管理系统
          </div>
          <div  className="bg_en">
            Yimai Health Background Management System
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('login_name', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('login_pass', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>

      </Fragment>  
    )
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm