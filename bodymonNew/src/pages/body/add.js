import React, { Fragment } from "react"
import { Form, Input, Button, Select, InputNumber, Radio,Upload ,Icon,Divider, message } from 'antd';
import ajax from '../../aixos/axios'
import {getToken} from '../../util/utils'
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
          values.property_logo = values.upload.file.response.data
          values.upload = null
        }
        ajax.post('/pc/property/save', values).then(v => {
          this.setState({
            loading: false
          })
        }, e=>{
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
          <Form.Item label="身体状况名称">
            {getFieldDecorator('property_name', {
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

          <Form.Item label="状态">
            {getFieldDecorator('state', {
              initialValue: '1',
            })(
              <Select placeholder="状态">
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('property_sex', {
              initialValue: '1'
            })(
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
                <Radio value="3">不限</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="身体状况logo" extra="只传一张">
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