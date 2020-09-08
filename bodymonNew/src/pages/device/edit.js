import React, { Fragment } from "react"
import { Form, Input, Button, InputNumber,Upload ,Icon,Divider,message,Select } from 'antd';
import ajax from '../../aixos/axios'
import {getToken} from '../../util/utils'
const { TextArea} = Input
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
const token = getToken()
class BodyEdit extends React.Component {

  state = {
    device_code: '',
    device_name: '',
    device_type: '',
    sort: '',
    duration: '',
    device_desc: '',
    award: '',
    fileList: [],
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.device_code = this.state.device_code
      console.log(values)
      if (!err) {
        this.setState({
          loading: true
        })
        if (values.upload) {
          if (values.upload.fileList) {
            if (values.upload.fileList.length !== 0) {
              values.device_logo = values.upload.file.response.data
              values.upload = null
            }
          }
        } else {
          values.device_logo = this.state.fileList[0].url
        }
        
        ajax.put('/pc/device/update', values).then(v => {
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
      device_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    let fileList = []
    ajax.get('/pc/device/single', {device_code: id}).then((v)=>{
      if (v.device.device_logo) {
        fileList.push({
          uid: '-1',
          name: v.device.device_logo,
          status: 'done',
          response: '200', // custom error message to show
          url: v.device.device_logo,
        })
      }

      self.setState({
        device_name: v.device.device_name,
        sort: v.device.sort,
        duration: v.device.duration,
        device_desc: v.device.device_desc,
        device_type: v.device.device_type,
        award: v.device.award,
        fileList: fileList
      })
    })
  }


  handleChange = info => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1);

    this.setState({ fileList });
    if (info.file.status === 'done') {
      message.success('图片上传成功');
    }
  };

  render() {

    let props = {
      name: 'file',
      action: '/pc/file/upload',
      headers: {
        authorization: 'authorization-text',
        token: token
      },
      onChange: this.handleChange
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="设备名">
            {getFieldDecorator('device_name', {
              initialValue: this.state.device_name,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入用户账号" />)}
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
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="设备logo" extra="只传一张">
          {getFieldDecorator('upload', {})(
            <Upload {...props}  fileList={this.state.fileList}>
              <Button>
                <Icon type="upload"/> 点击上传
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="设备类型">
            {getFieldDecorator('device_type', {
              initialValue: this.state.device_type,
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
              initialValue: this.state.duration,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="积分">
            {getFieldDecorator('award', {
              initialValue: this.state.award,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('device_desc', {
              initialValue: this.state.device_desc,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<TextArea />)}
          </Form.Item>


          <Form.Item {...tailFormItemLayout}>
              <Button  loading={this.state.loading} type="primary" htmlType="submit" style={{marginRight: 20}}>
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