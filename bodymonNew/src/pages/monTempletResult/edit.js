import React, { Fragment } from "react"
import { Form, Input, Button, Select,Divider } from 'antd';
import ajax from '../../aixos/axios'
import BraftEditor from 'braft-editor'
import { getToken } from '../../util/utils'
import 'braft-editor/dist/index.css'
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
    mon_templet_result_code: '',
    result_start: '',
    result_end: '',
    tags: '',
    content: '',
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        values.content = values.content.toHTML()
        values.mon_templet_result_code = this.state.mon_templet_result_code
        ajax.put('/pc/monTempletResult/update', values).then(v => {
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
      mon_templet_result_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    ajax.get('/pc/monTempletResult/single', { mon_templet_result_code: id }).then((v) => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState(v.monTempletResult.content)
      })
      self.setState({
        result_start: v.monTempletResult.result_start,
        result_end: v.monTempletResult.result_end,
        tags: v.monTempletResult.tags
      })
    })

  }

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
    xhr.setRequestHeader("token", token);//header中token的设置
    xhr.send(fd)

  };
  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label="开始值">
            {getFieldDecorator('result_start', {
              initialValue: this.state.result_start,
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
          <Form.Item label="结束值">
            {getFieldDecorator('result_end', {
              initialValue: this.state.result_end,
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
          <Form.Item label="结果">
            {getFieldDecorator('tags', {
              initialValue: this.state.tags,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Select placeholder="结果">
                <Option value="正常">正常</Option>
                <Option value="不正常">不正常</Option>
              </Select>
            )}
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
                style={{ border: '1px solid #eee' }}
                media={{ uploadFn: this.uploadFn }}
              />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button loading={this.state.loading} type="primary" htmlType="submit" style={{ marginRight: 20 }}>
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