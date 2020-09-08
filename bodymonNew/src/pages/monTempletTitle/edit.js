import React, { Fragment } from "react"
import { Form, Input, Button, Select, Icon,InputNumber,Divider } from 'antd';
import ajax from '../../aixos/axios'
import { findSystemCode } from '../../util/utils'
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
let id = 0;
class BodyEdit extends React.Component {

  state = {
    mon_templet_code: '',
    mon_templet_title_code: '',
    mon_templet_title_name: '',
    custom_title: '',
    sort: '',
    data: [],
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let mon_templet_code = this.state.mon_templet_code
      let mon_templet_title_code = this.state.mon_templet_title_code
      if (!err) {
        this.setState({
          loading: true
        })
        values.mon_templet_code = mon_templet_code
        values.mon_templet_title_code = mon_templet_title_code
        if (values.keys.length !== 0) {
          values.monTempletTitleSolutionList.forEach((v) => {
            v.mon_templet_title_solution_code = findSystemCode()
            v.mon_templet_title_code = mon_templet_title_code
          })
        }
        ajax.put('/pc/monTempletTitle/update', values).then(v => {
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

  componentDidMount() {
    id = 0
    this.setState({
      mon_templet_title_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    ajax.get('/pc/monTempletTitle/single', { mon_templet_title_code: id }).then((v) => {
      
      self.setState({
        mon_templet_code: v.monTempletTitle.mon_templet_code,
        mon_templet_title_name: v.monTempletTitle.mon_templet_title_name,
        sort: v.monTempletTitle.sort,
        custom_title: v.monTempletTitle.custom_title
      })
      self.initaskQuestionList(v.monTempletTitleSolutionList)
      self.initMonTempletTitlelist({mon_templet_code: v.monTempletTitle.mon_templet_code})
    })
  }
  initMonTempletTitlelist = (params) => {
    ajax.get('/pc/monTempletTitle/all', params).then((v) => {
      this.setState({
        data: v.monTempletTitlelist
      })
    })
  }
  initaskQuestionList = (arr) => {
    const { form } = this.props;
    let nextKeys = []
    for (let i in arr) {
      nextKeys.push(Number(i))
    }
    form.setFieldsValue({
      keys: nextKeys,
    });
    arr.forEach((v, i) => {
      let content = `monTempletTitleSolutionList[${i}].content`
      let score = `monTempletTitleSolutionList[${i}].score`
      let next_mtt_code = `monTempletTitleSolutionList[${i}].next_mtt_code`
      form.setFieldsValue({
        [content]: v.content,
        [score]: v.score,
        [next_mtt_code]: v.next_mtt_code
      })
    })
    id = nextKeys.length
  }

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
      let title = `(第${k + 1}条)内容`
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
              initialValue: this.state.mon_templet_title_name,
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
              initialValue: this.state.sort,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <InputNumber />
            )}
          </Form.Item>

          <Form.Item label="分组名称">
            {getFieldDecorator('custom_title', {
              initialValue: this.state.custom_title,
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
            <Button loading={this.state.loading}  type="primary" htmlType="submit" style={{ marginRight: 20 }}>
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