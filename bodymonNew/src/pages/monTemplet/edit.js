import React, { Fragment } from "react"
import { Form, Input, Button, Select, InputNumber, Upload, Icon,message } from 'antd';
import ajax from '../../aixos/axios'
import {getToken} from '../../util/utils'
const { Option } = Select
const { TextArea } = Input
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
    mon_templet_code: '',
    mon_templet_desc: '',
    mon_templet_name: '',
    mon_templet_category_code_name: {key: '', label: ''},
    duration: '',
    award: '',
    fileList: [],
    children: []
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        
        this.setState({
          loading: true
        })
        
        
        if (values.upload) {
          if (values.upload.fileList) {
            if (values.upload.fileList.length !== 0) {
              values.mon_templet_logo = values.upload.file.response.data
              values.upload = null
            }
          }

        } else {
          values.mon_templet_logo = this.state.fileList[0].url
        }
        values.mon_templet_category_code = values.mon_templet_category_code_name.key
        values.category_name = values.mon_templet_category_code_name.label
        values.mon_templet_code = this.state.mon_templet_code

        ajax.put('/pc/monTemplet/update', values).then(v => {
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
    this.setState({
      mon_templet_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    let fileList = []
    ajax.get('/pc/monTemplet/single', { mon_templet_code: id }).then((v) => {
      if (v.monTemplet.mon_templet_logo) {
        fileList.push({
          uid: '-1',
          name: v.monTemplet.mon_templet_logo,
          status: 'default',
          response: '200', // custom error message to show
          url: v.monTemplet.mon_templet_logo,
        })
      }
      self.setState({
        mon_templet_category_code_name: {key:v.monTemplet.mon_templet_category_code, label:v.monTemplet.category_name},
        mon_templet_desc: v.monTemplet.mon_templet_desc,
        mon_templet_name: v.monTemplet.mon_templet_name,
        duration: v.monTemplet.duration,
        award: v.monTemplet.award,
        fileList: fileList
      })
    })
    ajax.get('/pc/monTempletCategory/list', {pager_openset: 99999}).then((v) => {
      this.setState({
        children: v.monTempletCategorylist
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
  }


  render() {
    let props = {
      name: 'file',
      action: '/pc/file/upload',
      headers: {
        token: getToken()
      },
      onChange: this.handleChange
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label='模板分类'>
            {getFieldDecorator('mon_templet_category_code_name', {
              initialValue: this.state.mon_templet_category_code_name,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Select placeholder="模板分类" labelInValue>
                {this.state.children.map((v) => (
                  <Option key={v.mon_templet_category_code}>{v.category_name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="模板表名称">
            {getFieldDecorator('mon_templet_name', {
              initialValue: this.state.mon_templet_name,
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
              initialValue: this.state.duration,
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
              initialValue: this.state.award,
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
              initialValue: this.state.fileList,
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
              initialValue: this.state.mon_templet_desc,
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
            <Button loading={this.state.loading} type="primary" htmlType="submit" style={{ marginRight: 20 }}>
              更新
              </Button>
            <Button onClick={() => { this.props.history.goBack() }}>
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