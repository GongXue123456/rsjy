import React, { Fragment } from "react"
import { Form, Input, Button, Select,Divider,TimePicker } from 'antd';
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

class BodyEdit extends React.Component {

  state = {
    warn_code: 0,
    warn_content: '',
    warn_type: 0,
    loading: false,
    begin_time: 16,
    end_time: 18
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        values.begin_time = values.begin_time.hours()
        values.end_time = values.end_time.hours()
        values.warn_code = this.state.warn_code
        ajax.put('/pc/warn/update', values).then(v => {
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

  componentDidMount () {
    this.setState({
      warn_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    ajax.get('/pc/warn/single', {warn_code: id}).then((v)=>{
      self.setState({
        warn_content: v.warn.warn_content,
        warn_type: v.warn.warn_type,
        begin_time: v.warn.begin_time,
        end_time: v.warn.end_time
      })
    })
  }


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
              initialValue: this.state.warn_content,
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
              initialValue: this.state.warn_type,
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
              initialValue: moment(this.state.begin_time, 'HH'),
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
              initialValue: moment(this.state.end_time, 'HH'),
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
                更新
              </Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const WrappedNormalBodyEdit = Form.create({ name: 'normal_UserAdd' })(BodyEdit);
export default WrappedNormalBodyEdit