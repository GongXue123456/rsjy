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

class BodyEdit extends React.Component {

  state = {
    property_code: '',
    property_name: '',
    sort: '',
    state: '',
    property_sex: '',
    fileList: [],
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.property_code = this.state.property_code
      if (!err) {
        this.setState({
          loading: true
        })
        console.log(values)
        if (values.upload) {
          if (values.upload.fileList) {
            if (values.upload.fileList.length !== 0) {
              values.property_logo = values.upload.file.response.data
              values.upload = null
            }
          }
        } else {
          values.property_logo = this.state.fileList[0].url
        }
        ajax.put('/pc/property/update', values).then(v =>{
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
      property_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    let fileList = []
    ajax.get('/pc/property/single', {property_code: id}).then((v)=>{
      if (v.property.property_logo) {
        fileList.push({
          uid: '-1',
          name: v.property.property_logo,
          status: 'done',
          response: '200', // custom error message to show
          url: v.property.property_logo,
        })
      }
      self.setState({
        property_name: v.property.property_name,
        sort: v.property.sort,
        state: v.property.state,
        property_sex: v.property.property_sex + '',
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
      onChange: this.handleChange,
      headers: {
        token: getToken()
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="身体状况名称">
            {getFieldDecorator('property_name', {
              initialValue: this.state.property_name,
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

          <Form.Item label="状态">
            {getFieldDecorator('state', {
              initialValue: this.state.state,
            })(
              <Select placeholder="状态">
                <Option value={1}>启用</Option>
                <Option value={2}>禁用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('property_sex', {
              initialValue: this.state.property_sex
            })(
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
                <Radio value="3">不限</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="身体状况logo" extra="只传一张">
          {getFieldDecorator('upload', {})(
            <Upload {...props}  fileList={this.state.fileList}>
              <Button>
                <Icon type="upload"/> 点击上传
              </Button>
            </Upload>,
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