import React, { Fragment } from "react"
import { Form, Input, Button,Select,InputNumber,Upload,Icon,Divider, message } from 'antd';
import ajax from '../../aixos/axios'
import {getToken} from '../../util/utils'
const { Option } = Select
const { TextArea } = Input;
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
    children: [],
    loading: false,
    fileList: []
  }

  componentDidMount () {
    this.init()
  }

  init = () => {
    ajax.get('/pc/monTempletCategory/list', {pager_openset: 99999}).then((v) => {
      this.setState({
        children: v.monTempletCategorylist
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        if (values.upload) {
          values.mon_templet_logo = values.upload.file.response.data
          values.upload = null
        }
        values.mon_templet_category_code = values.mon_templet_category_code_name.key
        values.category_name = values.mon_templet_category_code_name.label
        ajax.post('/pc/monTemplet/save', values).then(v => {
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
  
  handleUpload = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    this.setState({ fileList });
    if (info.file.status === 'done') {
      message.success('图片上传成功');
    }
  } 

  render() {
    const { getFieldDecorator } = this.props.form;
    const props = {
      name: 'file',
      action: '/pc/file/upload',
      headers: {
        token: getToken()
      },
      onChange: this.handleUpload
    };
    return (
      <Fragment>
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label='模板分类'>
                {getFieldDecorator('mon_templet_category_code_name', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                <Select placeholder="模板分类" labelInValue>
                  {this.state.children.map((v) => (
                    <Option key={v.mon_templet_category_code} >{v.category_name}</Option>
                  ))}
                </Select>
                )}
          </Form.Item>

          <Form.Item label="模板表名称">
            {getFieldDecorator('mon_templet_name', {
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


          <Form.Item label="时长(秒)">
            {getFieldDecorator('duration', {
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
          <Form.Item label="积分">
            {getFieldDecorator('award', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="模板logo" extra="只传一张">
            {getFieldDecorator('upload', {
                rules: [
                  {
                    required: true,
                    message: '不能为空!',
                  },
                ]
            })(
              <Upload {...props} fileList={this.state.fileList}>
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label='描述'>
                {getFieldDecorator('mon_templet_desc', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <TextArea rows={4} placeholder="请输入" />
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