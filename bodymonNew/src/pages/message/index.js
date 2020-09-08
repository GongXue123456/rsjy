import React, { Fragment } from "react"
import { Form, Input, Button, Select,Checkbox, message } from 'antd';
import ajax from '../../aixos/axios'
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
    plainOptions: [],
    loading: false
  }
  componentDidMount () {
    this.init()
  }

  init = () => {
    ajax.get('/pc/user/list', {pager_openset: 999999}).then(v => {
      let arr = []
      v.userlist.forEach(r => {
        arr.push({
          label: r.user_name,
          value: r.user_code
        })
      })
      this.setState({
        plainOptions: arr
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        this.setState({
          loading: true
        })
        if (values.send_all !== 2) {
          values.pager_list = []
          if (values.userlists.length === 0) {
            message.warning("请选择用户")
            return
          } else {
            values.userlists.forEach(v => {
              values.pager_list.push({
                user_code: v
              })
            })
          }
        }
        ajax.post('/pc/userInfo/listsave', values).then(v => {
          this.setState({
            loading: false
          })
        }, e => {
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="发送消息">
            {getFieldDecorator('send_message', {
              initialValue: '1',
              rules: [
                {
                  required: true,
                  message: '请输入!',
                },
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>


          <Form.Item label="选择用户">
            {getFieldDecorator('send_all', {
              initialValue: 2,
              rules: [
                {
                  required: true,
                  message: '请输入!',
                },
              ]
            })(
              <Select placeholder="选择用户">
                <Option value={1}>部分</Option>
                <Option value={2}>全部</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="用户">
            {getFieldDecorator('userlists', {
              initialValue: []
            })(
              <Checkbox.Group options={this.state.plainOptions} />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
              <Button  loading={this.state.loading} type="primary" htmlType="submit"  style={{marginRight: 20}}>
                点击发送
              </Button>
              <Button onClick={() => {this.props.history.goBack()}}>
                返回
              </Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const WrappedNormalUserAdd = Form.create({ name: 'normal_UserAdd' })(UserAdd);
export default WrappedNormalUserAdd