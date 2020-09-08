import React, { Fragment } from "react"
import { Form, Input, Button, InputNumber,Upload ,Icon,Divider,message,Select } from 'antd';
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
const token = getToken()
class BodyAdd extends React.Component {
  state = {
    loading: false,
    fileList: []
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        if (values.upload) {
          values.device_logo = values.upload.file.response.data
          values.upload = null
        }
        ajax.post('/pc/device/save', values).then(v => {
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
        authorization: 'authorization-text',
        token: token
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
          <Form.Item label="设备名">
            {getFieldDecorator('device_name', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="排序">
            {getFieldDecorator('sort', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="设备logo" extra="只传一张">
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
          <Form.Item label="设备类型">
            {getFieldDecorator('device_type', {
              initialValue: 1,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Select>
                <Option value={1}>心电贴</Option>
                <Option value={2}>手环</Option>
                <Option value={3}>功能态检测仪</Option>
              </Select>
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
            })(<InputNumber  placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="积分">
            {getFieldDecorator('award', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber   placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('device_desc', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<TextArea  placeholder="请输入" />)}
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