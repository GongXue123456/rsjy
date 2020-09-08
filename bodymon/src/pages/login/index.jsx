import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, {Fragment} from 'react'
import router from 'umi/router';
import styles from './index.less';

class Login extends React.Component{
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        router.push('/admin');
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
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
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              登陆
            </Button>
            Or <a href="">注册</a>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

export default Form.create({ name: 'normal_login' })(Login)
