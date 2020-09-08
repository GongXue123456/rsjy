import React, { Fragment } from "react"
import { Form, Input, Button,Select,Divider } from 'antd';
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

class BodyEdit extends React.Component {

  state = {
    score_type_code: '',
    analyse_advise: 0,
    score_type_score_start: '',
    score_type_score_end: '',
    score_type_type: 0,
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        this.setState({
          loading: true
        })
        values.score_type_code = this.state.score_type_code
        ajax.put('/pc/scoreType/update', values).then(v => {
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
      score_type_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    ajax.get('/pc/scoreType/single', {score_type_code: id}).then((v)=>{
      self.setState({
        analyse_advise: v.scoreType.analyse_advise,
        score_type_score_start: v.scoreType.score_type_score_start,
        score_type_score_end: v.scoreType.score_type_score_end,
        score_type_type: parseInt(v.scoreType.score_type_type)
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
        <Form.Item label="起始值">
            {getFieldDecorator('score_type_score_start', {
              initialValue: this.state.score_type_score_start,
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

          <Form.Item label="结束值">
            {getFieldDecorator('score_type_score_end', {
              initialValue: this.state.score_type_score_end,
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

          <Form.Item label='类型'>
                {getFieldDecorator('score_type_type', {
                  initialValue: this.state.score_type_type,
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                <Select placeholder="类型">
                  <Option value="">类型</Option>
                  <Option value={1}>睡眠</Option>
                  <Option value={2}>饮食</Option>
                  <Option value={3}>运动</Option>
                  <Option value={4}>情绪</Option>
                  <Option value={5}>环境</Option>
                </Select>
                )}
          </Form.Item>
          <Form.Item label="分析建议">
            {getFieldDecorator('analyse_advise', {
              initialValue: this.state.analyse_advise,
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