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

class BodyEdit extends React.Component {

  state = {
    mon_templet_category_code: '',
    category_name: 0,
    sort: '',
    state: '',
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        this.setState({
          loading: true
        })
        values.mon_templet_category_code = this.state.mon_templet_category_code
        ajax.put('/pc/monTempletCategory/update', values).then(v => {
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
      mon_templet_category_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    ajax.get('/pc/monTempletCategory/single', {mon_templet_category_code: id}).then((v)=>{
      self.setState({
        category_name: v.monTempletCategory.category_name,
        sort: v.monTempletCategory.sort,
        state: v.monTempletCategory.state
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
        <Form.Item label="名称">
            {getFieldDecorator('category_name', {
              initialValue: this.state.category_name,
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
              initialValue: this.state.sort,
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
          <Form.Item label='状态'>
                {getFieldDecorator('state', {
                  initialValue: this.state.state,
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