import React, { Fragment } from "react"
import { Form, Input, Button, Select,Upload ,Icon,InputNumber,Divider,message } from 'antd';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
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
class BodyEdit extends React.Component {

  state = {
    fileList: [],
    fileList2: [],
    task_material_code: 0,
    loading: false,
    task_material_type: 1,
    task_material_url: '',
    task_material_intro: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.task_material_code = this.state.task_material_code
      if (!err) {
        this.setState({
          loading: true
        })
        
        values.task_material_desc = values.content.toHTML()
        values.content=null
        if (values.upload) {
          if (values.upload.fileList) {
            if (values.upload.fileList.length !== 0) {
              values.task_material_logo = values.upload.file.response.data
              values.upload = null
            }
          }

        } else {
          values.task_material_logo = this.state.fileList[0].url
        }
        if (values.hasOwnProperty("upload2")){
          if (values.upload2) {
            if (values.upload2.fileList) {
              if (values.upload2.fileList.length !== 0) {
                values.task_material_url = values.upload2.file.response.data
                values.upload2 = null
              }  else {
                message.error("请上传素材地址")
                this.setState({
                  loading: false
                })
                return
              }
            }
          } else {
            if (this.state.fileList2.length !== 0) {
              values.task_material_url = this.state.fileList2[0].url
            } else {
              message.error("请上传素材地址")
              this.setState({
                loading: false
              })
              return
            }
            
          }
        }
        // console.log(values)
        ajax.put('/pc/taskMaterial/update', values).then(v => {
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
      task_material_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    let fileList = []
    let fileList2 = []
    ajax.get('/pc/taskMaterial/single', {task_material_code: id}).then((v)=>{
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState(v.taskMaterial.task_material_desc),
        task_material_name: v.taskMaterial.task_material_name,
        task_material_state: v.taskMaterial.task_material_state,
        task_material_duration: v.taskMaterial.task_material_duration
      })
      this.setState({
        task_material_type: v.taskMaterial.task_material_type,
        task_material_intro: v.taskMaterial.task_material_intro
      })
      if (v.taskMaterial.task_material_logo) {
        fileList.push({
          uid: '-1',
          name: v.taskMaterial.task_material_logo,
          status: 'done',
          response: '200', // custom error message to show
          url: v.taskMaterial.task_material_logo,
        })
      }

      if (v.taskMaterial.task_material_url) {
        fileList2.push({
          uid: '-1',
          name: v.taskMaterial.task_material_url,
          status: 'done',
          response: '200', // custom error message to show
          url: v.taskMaterial.task_material_url,
        })
      }
      self.setState({
        fileList: fileList,
        fileList2: fileList2
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

  handleChange2 = info => {
    let fileList2 = [...info.fileList];

    fileList2 = fileList2.slice(-1);

    this.setState({ fileList2 });
    if (info.file.status === 'done') {
      message.success('图片上传成功');
    }
  };

  uploadFn = (param) => {
    const serverURL = '/pc/file/upload';//upload 是接口地址
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: JSON.parse(xhr.responseText).data,
        meta: {
          id: param.id,
          title: param.file.name,
          alt: param.file.name,
          loop: false, // 指定音视频是否循环播放
          autoPlay: false, // 指定音视频是否自动播放
          controls: false, // 指定音视频是否显示控制栏
          poster: '', // 指定视频播放器的封面
        }
      })
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)

    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    };

    xhr.upload.addEventListener("progress", progressFn, false);
    xhr.addEventListener("load", successFn, false);
    xhr.addEventListener("error", errorFn, false);
    xhr.addEventListener("abort", errorFn, false);

    fd.append('file', param.file);
    xhr.open('POST', serverURL, true);
    xhr.setRequestHeader("token", getToken());//header中token的设置
    xhr.send(fd)

  };
  handleSelect = (v) => {
    this.setState({
      task_material_type: v
    })
  }
  render() {

    let props = {
      name: 'file',
      action: '/pc/file/upload',
      headers: {
        authorization: 'authorization-text',
        token: getToken()
      },
      onChange: this.handleChange
    };
    let props2 = {
      name: 'file',
      action: '/pc/file/upload',
      headers: {
        authorization: 'authorization-text',
        token: getToken()
      },
      onChange: this.handleChange2
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="任务素材名称">
            {getFieldDecorator('task_material_name', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="任务素材封面" extra="只传一张">
          {getFieldDecorator('upload', {})(
            <Upload {...props} fileList={this.state.fileList}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>,
          )}
          </Form.Item>
          <Form.Item label="任务素材类型">
            {getFieldDecorator('task_material_type', {
              initialValue: this.state.task_material_type
            })(
              <Select placeholder="状态" onSelect={this.handleSelect}>
                <Option value={1}>音频</Option>
                <Option value={2}>视频</Option>
                <Option value={3}>图文</Option>
              </Select>
            )}
          </Form.Item>
          {
            this.state.task_material_type !==3 ? (
              <Form.Item label="上传素材"  extra="只传一张">
                {getFieldDecorator('upload2', {})(
                  <Upload {...props2} fileList={this.state.fileList2}>
                    <Button>
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>,
                )}
              </Form.Item>
            ):''
          }
          
          <Form.Item label="状态">
            {getFieldDecorator('task_material_state', {})(
              <Select placeholder="状态">
                <Option value={1}>启用</Option>
                <Option value={2}>禁用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="时长(分钟)">
            {getFieldDecorator('task_material_duration', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="简介">
            {getFieldDecorator('task_material_intro', {
              initialValue: this.state.task_material_intro,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<TextArea placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文内容')
                  } else {
                    callback()
                  }
                }
              }],
            })(
              <BraftEditor
                className="my-editor"
                placeholder="请输入正文内容"
                media={{ uploadFn: this.uploadFn }}
                style={{border: '1px solid #eee'}}
              />
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