import React, { Fragment } from "react"
import { Form, Input, Button, InputNumber,Upload ,Icon, Select,Checkbox,Divider, message } from 'antd';
import ajax from '../../aixos/axios'
import { getToken } from '../../util/utils'
const { Option} = Select
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
    task_code: '',
    task_name: '',
    score: '',
    task_duration: '',
    task_desc: '',
    award: '',
    score_type_type: '',
    state: '',
    fileList: [],
    scoreLevellist: [],
    material: [],
    materialdefault: [],
    propertyList: [],
    propertyListdefault: []
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.task_code = this.state.task_code
      
      if (!err) {
        this.setState({
          loading: true
        })
        let taskMaterialList
        if (values.upload) {
          if (values.upload.fileList) {
            if (values.upload.fileList.length !== 0) {
              values.task_logo = values.upload.file.response.data
              values.upload = null
            }
          }

        } else {
          values.task_logo = this.state.fileList[0].url
        }

        values.taskPropertyList = []
        values.goal_count = values.taskMaterialList.length
        taskMaterialList = this.getmaterialvalue(this.state.material,values.taskMaterialList)
        values.task_content = JSON.stringify({taskMaterialList: taskMaterialList})

        values.tPropertyList.forEach(v => {
          values.taskPropertyList.push({
            task_code: this.state.task_code,
            property_code: v
          })
        })
        ajax.put('/pc/task/update', values).then(v => {
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

  getmaterialvalue = (arr1 ,arr2) => {
    let arr = []
    arr1.forEach(v => {
      arr2.forEach(r => {
        if (v.value === r) {
          arr.push({
            task_material_code: v.ele.task_material_code,
            task_material_desc: v.ele.task_material_desc,
            task_material_duration: v.ele.task_material_duration,
            task_material_finishstate: v.ele.task_material_finishstate,
            task_material_logo: v.ele.task_material_logo,
            task_material_name: v.ele.task_material_name,
            task_material_state: v.ele.task_material_state,
            task_material_type: v.ele.task_material_type,
            task_material_url: v.ele.task_material_url,
            task_material_intro: v.ele.task_material_intro
          })
        }
      })
    })
    return arr
  }

  componentDidMount () {
    this.setState({
      task_code: this.props.match.params.id
    })
    this.init(this.props.match.params.id)
  }

  init = (id) => {
    let self = this
    let fileList = []
    let propertyListdefault = []
    let materialdefault = []
    ajax.get('/pc/task/single', {task_code: id}).then((v)=>{
      let task_content = JSON.parse(v.task.task_content)
      
      let taskMaterialList = task_content.taskMaterialList
      taskMaterialList.forEach(r => {
        materialdefault.push(r.task_material_code)
      })
      if (v.task.task_logo) {
        fileList.push({
          uid: '-1',
          name: v.task.task_logo,
          status: 'done',
          response: '200', // custom error message to show
          url: v.task.task_logo,
        })
      }

      v.propertyList.forEach(r => {
        propertyListdefault.push(r.property_code)
      })
      self.setState({
        task_name: v.task.task_name,
        score: v.task.score,
        task_duration: v.task.task_duration,
        task_desc: v.task.task_desc,
        award: v.task.award,
        fileList: fileList,
        score_type_type: v.task.score_type_type,
        state: v.task.state,
        score_level_code: v.task.score_level_code,
        propertyListdefault: propertyListdefault,
        materialdefault: materialdefault
      })
    })

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
          value: p.task_material_code,
          ele: p
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
        token: getToken()
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
          <Form.Item label="任务名称">
            {getFieldDecorator('task_name', {
              initialValue: this.state.task_name,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入用户账号" />)}
          </Form.Item>
          <Form.Item label="得分">
            {getFieldDecorator('score', {
              initialValue: this.state.score,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="任务时长(分钟)">
            {getFieldDecorator('task_duration', {
              initialValue: this.state.task_duration,
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
              initialValue: this.state.task_desc,
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
              initialValue: this.state.award,
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber />)}
          </Form.Item>

          <Form.Item label="得分项类型">
            {getFieldDecorator('score_type_type', {
              initialValue: this.state.score_type_type,
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
              initialValue: this.state.state,
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
              initialValue: this.state.score_level_code,
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
              initialValue: this.state.materialdefault,
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
              initialValue: this.state.propertyListdefault,
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