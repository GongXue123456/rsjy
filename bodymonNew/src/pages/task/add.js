import React, { Fragment } from "react"
import { Form, Input, Button, InputNumber,Upload ,Icon,Select,Checkbox,Divider,message } from 'antd';
import ajax from '../../aixos/axios'
import { findSystemCode, getToken } from '../../util/utils'
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
    scoreLevellist: [],
    material: [],
    propertyList: [],
    loading: false
  }
  handleSubmit = e => {
    e.preventDefault();
    let task_code = findSystemCode()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        values.taskPropertyList = []
        if (values.upload) {
          values.task_logo = values.upload.file.response.data
          values.upload = null
        }
        values.task_code = task_code
        values.goal_count = values.taskMaterialList.length
        let newArr = this.getmaterialvalue(values.taskMaterialList)
        values.task_content = JSON.stringify({taskMaterialList: newArr})
        values.tPropertyList.forEach(v => {
          values.taskPropertyList.push({
            task_code: task_code,
            property_code: v
          })
        })

        ajax.post('/pc/task/save', values).then(v => {
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

  getmaterialvalue = (arr) => {
    let newArr = []
    arr.forEach(v => {
      let ele = JSON.parse(v)
      newArr.push({
        task_material_code: ele.task_material_code,
        task_material_desc: ele.task_material_desc,
        task_material_duration: ele.task_material_duration,
        task_material_finishstate: ele.task_material_finishstate,
        task_material_logo: ele.task_material_logo,
        task_material_name: ele.task_material_name,
        task_material_state: ele.task_material_state,
        task_material_type: ele.task_material_type,
        task_material_url: ele.task_material_url,
        task_material_intro: ele.task_material_intro
      })
    })
    return newArr
  }
  componentDidMount () {
    this.init()
  }

  init = () => {
    let self = this
    ajax.get('/pc/scoreLevel/list', {pager_openset: 99999}).then(v => {
      self.setState({
        scoreLevellist: v.scoreLevellist
      })
    })
    ajax.get('/pc/taskMaterial/list', {pager_openset: 99999}).then(v => {
      let arr = []
      v.taskMateriallist.forEach(p => {
        arr.push({
          label: p.task_material_name,
          value: JSON.stringify(p)
        })
      })
      self.setState({
        material: arr
      })
    })

    ajax.get('/pc/property/list', {pager_openset: 99999}).then(v => {
      let arr = []
      v.propertylist.forEach(p => {
        arr.push({
          label: p.property_name,
          value: p.property_code
        })
      })
      self.setState({
        propertyList: arr
      })
    })
    
  }

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
          <Form.Item label="任务名称">
            {getFieldDecorator('task_name', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="得分">
            {getFieldDecorator('score', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="任务时长(分钟)">
            {getFieldDecorator('task_duration', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber placeholder="请输入" />)}
          </Form.Item>
          
          <Form.Item label="任务封面logo" extra="只传一张">
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
          <Form.Item label="任务简介">
            {getFieldDecorator('task_desc', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入" />)}
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
          <Form.Item label="得分项类型">
            {getFieldDecorator('score_type_type', {
              initialValue: 1,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Select placeholder="分项类型">
                <Option value={1}>睡眠</Option>
                <Option value={2}>饮食</Option>
                <Option value={3}>运动</Option>
                <Option value={4}>情绪</Option>
                <Option value={5}>环境</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="任务状态">
            {getFieldDecorator('state', {
              initialValue: 1,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Select placeholder="任务状态">
                <Option value={1}>启用</Option>
                <Option value={2}>禁用</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="得分等级">
            {getFieldDecorator('score_level_code', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Select placeholder="得分等级">
                {
                  this.state.scoreLevellist.map(v => (
                    <Option key={v.score_level_code} value={v.score_level_code}>{v.score_level_name}</Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>

          <Form.Item label="选择素材">
            {getFieldDecorator('taskMaterialList', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Checkbox.Group options={this.state.material} />
            )}
          </Form.Item>

          <Form.Item label="选择身体部位">
            {getFieldDecorator('tPropertyList', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(
              <Checkbox.Group options={this.state.propertyList} />
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