import React, { Fragment } from "react"
import { Form, Input, Button } from 'antd';
import ajax from '../../aixos/axios'
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
    score_level_code: 0,
    score_level_name: '',
    score_start: '',
    score_end: '',
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        this.setState({
          loading: true
        })
        values.score_level_code = this.state.score_level_code
        ajax.put('/pc/scoreLevel/update', values).then(v => {
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
      score_level_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    ajax.get('/pc/scoreLevel/single', {score_level_code: id}).then((v)=>{
      self.setState({
        score_level_name: v.scoreLevel.score_level_name,
        score_start: v.scoreLevel.score_start,
        score_end: v.scoreLevel.score_end
      })
    })
  }


  render() {


    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="得分等级名称">
            {getFieldDecorator('score_level_name', {
              initialValue: this.state.score_level_name,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>

          <Form.Item label="起始值">
            {getFieldDecorator('score_start', {
              initialValue: this.state.score_start,
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
            {getFieldDecorator('score_end', {
              initialValue: this.state.score_end,
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
              <Button onClick={() => {this.props.history.goBack()}}>
                返回
              </Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const WrappedNormalBodyEdit = Form.create({ name: 'normal_UserAdd' })(BodyEdit);
export default WrappedNormalBodyEdit