import React, { Fragment } from "react"
import { Form, Input, Button, Select,Divider, TimePicker } from 'antd';
import ajax from '../../aixos/axios'
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

class BodyAdd extends React.Component {
  state = {
    editorState: null,
    loading: false
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values.begin_time.hours())
      if (!err) {
        values.begin_time = values.begin_time.hours()
        values.end_time = values.end_time.hours()
        this.setState({
          loading: true
        })
        ajax.post('/pc/warn/save', values).then(v => {
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
          <Form.Item label="提醒内容">
            {getFieldDecorator('warn_content', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>

          <Form.Item label="类型">
            {getFieldDecorator('warn_type', {
              initialValue: 1,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
            <Select placeholder="类型">
              <Option value={1}>睡眠</Option>
              <Option value={2}>饮食</Option>
              <Option value={3}>运动</Option>
              <Option value={4}>情绪</Option>
              <Option value={5}>环境</Option>
            </Select>
            )}
          </Form.Item>
          <Form.Item label="开始时间">
            {getFieldDecorator('begin_time', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                }
              ]
            })(<TimePicker format='HH' placeholder='选择时间' />)}
          </Form.Item>

          <Form.Item label="结束时间">
            {getFieldDecorator('end_time', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                }
              ]
            })(<TimePicker format='HH' placeholder='选择时间' />)}
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