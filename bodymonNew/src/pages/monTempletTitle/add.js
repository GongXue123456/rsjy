import React, { Fragment } from "react"
import { Form, Input, Button, Select, InputNumber, Icon,Divider } from 'antd';
import ajax from '../../aixos/axios'
import { findSystemCode } from '../../util/utils'
import './index.less'
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
let id = 0
class BodyAdd extends React.Component {
  state = {
    mon_templet_code: '',
    data: [],
    loading: false
  }

  componentDidMount() {
    id = 0
    this.setState({
      mon_templet_code: this.props.match.params.id
    })
    this.init({mon_templet_code: this.props.match.params.id})
  }

  init = (params) => {
    ajax.get('/pc/monTempletTitle/all', params).then((v) => {
      this.setState({
        data: v.monTempletTitlelist
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let mon_templet_title_code = findSystemCode()
      // let mon_templet_title_solution_code = findSystemCode()
      if (!err) {
        this.setState({
          loading: true
        })
        values.mon_templet_code = this.state.mon_templet_code
        values.mon_templet_title_code = mon_templet_title_code
        if (values.keys.length !== 0) {
          values.monTempletTitleSolutionList.forEach((v) => {
            v.mon_templet_title_solution_code = findSystemCode()
            v.mon_templet_title_code = mon_templet_title_code
          })
        }
        ajax.post('/pc/monTempletTitle/save', values).then(v => {
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
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  add = (e) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    const nextKeys = keys.concat(id++);

    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      let title = `(第${k + 1}条)答案`
      return (
        <div key={k}>
              <Form.Item label={title}>
              {getFieldDecorator(`monTempletTitleSolutionList[${k}].content`, {
                rules: [
                  {
                    required: true,
                    message: '不能为空!',
                  },
                ]
              })(<Input placeholder="内容" />)}
              </Form.Item>

              <Form.Item label="得分">
              {getFieldDecorator(`monTempletTitleSolutionList[${k}].score`, {
                rules: [
                  {
                    required: true,
                    message: '不能为空!',
                  },
                ]
              })(<InputNumber placeholder="得分" />)}
              </Form.Item>

              <Form.Item label="关联题目">
              {getFieldDecorator(`monTempletTitleSolutionList[${k}].next_mtt_code`, {
              })(
                <Select style={{ width: 120 }} placeholder="选择">
                  <Option value='' >不关联</Option>
                  {
                    this.state.data.map((v) => (
                      <Option key={v.mon_templet_title_code} value={v.mon_templet_title_code}>{v.mon_templet_title_name}</Option>
                    ))
                  }
                </Select>
              )}
            {keys.length > 0 ? (
                <Icon
                  style={{ marginLeft: '20px'}}
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.remove(k)}
                />
            ) : null}
            </Form.Item>




        </div>
      )
    })
    return (
      <Fragment>
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label="题目名称">
            {getFieldDecorator('mon_templet_title_name', {
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


          <Form.Item label="排序号">
            {getFieldDecorator('sort', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <InputNumber placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="分组名称">
            {getFieldDecorator('custom_title', {
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

          <div>
            {formItems}
          </div>
          <Form.Item label="添加选项">
            <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
              <Icon type="plus" /> 点击创建
                </Button>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button  loading={this.state.loading} type="primary" htmlType="submit" style={{ marginRight: 20 }}>
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