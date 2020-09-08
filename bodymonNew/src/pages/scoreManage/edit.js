import React, { Fragment } from "react"
import { Form, Input, Button,Divider } from 'antd';
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
    score_code: '',
    analyse_advise: '',
    body_status: '',
    score_score_end: '',
    score_score_start: '',
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        this.setState({
          loading: true
        })
        values.score_code = this.state.score_code
        ajax.put('/pc/score/update', values).then(v => {
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
      score_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    ajax.get('/pc/score/single', {score_code: id}).then((v)=>{
      self.setState({
        analyse_advise: v.score.analyse_advise,
        body_status: v.score.body_status,
        score_score_end: v.score.score_score_end,
        score_score_start: v.score.score_score_start
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
            {getFieldDecorator('score_score_start', {
              initialValue: this.state.score_score_start,
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
            {getFieldDecorator('score_score_end', {
              initialValue: this.state.score_score_end,
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
          <Form.Item label="身体状况">
            {getFieldDecorator('body_status', {
              initialValue: this.state.body_status,
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