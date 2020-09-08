import React, { Fragment } from "react"
import { Form, Input, Button,Select,InputNumber,Divider } from 'antd';
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

class BodyAdd extends React.Component {
  state = {
    editorState: null,
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        ajax.post('/pc/monTempletCategory/save', values).then(v => {
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
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('category_name', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>


          <Form.Item label="排序">
            {getFieldDecorator('sort', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <InputNumber  placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label='状态'>
                {getFieldDecorator('state', {
                  initialValue: 1,
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                <Select placeholder="状态">
                  <Option value={1}>启用</Option>
                  <Option value={2}>禁用</Option>
                </Select>
                )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
              <Button loading={this.state.loading} type="primary" htmlType="submit" style={{marginRight: 20}}>
                添加
              </Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const WrappedNormalBodyAdd = Form.create({ name: 'normal_UserAdd' })(BodyAdd);
export default WrappedNormalBodyAdd