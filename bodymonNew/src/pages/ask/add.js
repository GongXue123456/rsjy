import React, { Fragment } from "react"
import { Form, Input, Button, Select, InputNumber, Radio, Row, Col, Checkbox, Icon,Divider,message,Upload } from 'antd';
import ajax from '../../aixos/axios'
import { findSystemCode } from '../../util/utils'
import axios from "../../aixos/axios";
import {getToken} from '../../util/utils'
const { Option } = Select
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
let id = 0;
class BodyAdd extends React.Component {
  state = {
    single_more: 1,
    options: [],
    loading: false,
    ask_type: 1,
    fileList: []
  }
  handleSelect = (v) => {
    this.setState({
      ask_type: v
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let ask_code = findSystemCode()
      let que_code = findSystemCode()
      if (!err) {
        this.setState({
          loading: true
        })
        values.askQuestionList = []
        values.more.forEach(v => {
          v.ask_code = ask_code
          v.que_code = que_code
          values.askQuestionList.push(v)
        })
        if (values.upload) {
          values.ask_logo = values.upload.file.response.data
          values.upload = null
        } 
        values.askPropertyList = []
        values.askPropertyListArr.forEach(r => {
          values.askPropertyList.push({
            property_code: r,
            ask_code: ask_code
          })
        })
        values.ask_code = ask_code
        ajax.post('/pc/ask/save', values).then(v => {
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
    id = 0
    let arr = []
    axios.get('/pc/property/list', {pager_openset: 99999}).then(v => {
      v.propertylist.forEach(r => {
        arr.push({
          label: r.property_name,
          value: r.property_code
        })
      })
      this.setState({
        options: arr
      })
    })
  }
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  add = (e) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    const nextKeys = keys.concat(id++);

    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleUpload1 = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    this.setState({ fileList });
    if (info.file.status === 'done') {
      message.success('图片上传成功');
    }
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const props = {
      name: 'file',
      action: '/pc/file/upload',
      headers: {
        authorization: 'authorization-text',
        token: getToken()
      },
      onChange: this.handleUpload1
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      let title = `(第${k + 1}条)选项名`
      return (
        <div key={k}>
          <Form.Item label={title}>
            {getFieldDecorator(`more[${k}].que_name`, {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="评分">
            {getFieldDecorator(`more[${k}].score`, {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber placeholder="评分" />)}
          </Form.Item>
          <Form.Item label="排序">
            {getFieldDecorator(`more[${k}].sort`, {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<InputNumber placeholder="排序" />)}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator(`more[${k}].state`, {
              initialValue: 1
            })(
              <Select style={{ width: 120 }}>
                <Option value={1}>启用</Option>
                <Option value={2}>禁用</Option>
              </Select>
            )}
            {keys.length > 0 ? (
              <Icon
                style={{ marginLeft: '20px'}}
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </Form.Item>
        </div>
      )
    })

    return (
      <Fragment>
        <div className="goBack" onClick={() => {this.props.history.goBack()}}>
          返回上一级
        </div>
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label="询问题目">
            {getFieldDecorator('ask_title', {
              rules: [
                {
                  required: true,
                  message: '不能为空!',
                },
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>


            <Form.Item label="起始年龄">
              {getFieldDecorator('age_start', {
                rules: [
                  {
                    required: true,
                    message: '不能为空!',
                  },
                ]
              })(<Input placeholder="请输入" />)}
            </Form.Item>


              <Form.Item label="截至年龄">
                {getFieldDecorator('age_end', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(<Input placeholder="请输入" />)}
              </Form.Item>


              <Form.Item label="起始身高值cm">
                {getFieldDecorator('height_start', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(<Input placeholder="请输入" />)}
              </Form.Item>



              <Form.Item label="截止身高值cm">
                {getFieldDecorator('height_end', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(<Input placeholder="请输入" />)}
              </Form.Item>





              <Form.Item label="起始体重kg">
                {getFieldDecorator('weight_start', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(<Input placeholder="请输入" />)}
              </Form.Item>



              <Form.Item label="截止体重kg">
                {getFieldDecorator('weight_end', {
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


              <Form.Item label="性别">
                {getFieldDecorator('sex', {
                  initialValue: 1,
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                    <Radio value={3}>不限</Radio>
                  </Radio.Group>
                )}
              </Form.Item>



              <Form.Item label="职业名称">
                {getFieldDecorator('pro_name', {
                  initialValue: '不限',
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <Select>
                    <Option value='军人'>军人</Option>
                    <Option value='学生'>学生</Option>
                    <Option value='不限'>不限</Option>
                  </Select>
                )}
              </Form.Item>



              <Form.Item label="排序">
                {getFieldDecorator('sort', {
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



              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: 1,
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <Select>
                    <Option value={1}>启动</Option>
                    <Option value={2}>禁用</Option>
                  </Select>
                )}
              </Form.Item>



              <Form.Item label="答题时间段">
                {getFieldDecorator('time_section', {
                  initialValue: '不限',
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <Select>
                    <Option value="不限">不限</Option>
                    <Option value="早上">早上</Option>
                    <Option value="中午">中午</Option>
                    <Option value="晚上">晚上</Option>
                  </Select>
                )}
              </Form.Item>



              <Form.Item label="固定时间推送">
                {getFieldDecorator('time_section_fix', {
                  initialValue: 1,
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <Select>
                    <Option value={1}>是</Option>
                    <Option value={2}>否</Option>
                  </Select>
                )}
              </Form.Item>



              <Form.Item label="推送项">
                {getFieldDecorator('st_type', {
                  initialValue: 1,
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <Select>
                    <Option value={1}>睡眠</Option>
                    <Option value={2}>饮食</Option>
                    <Option value={3}>运动</Option>
                    <Option value={4}>情绪</Option>
                    <Option value={5}>环境</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="询问类型">
                {getFieldDecorator('ask_type', {
                  initialValue: this.state.ask_type,
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <Select onSelect={this.handleSelect}>
                    <Option value={1}>生活习惯</Option>
                    <Option value={2}>小善询问</Option>
                  </Select>
                )}
              </Form.Item>
              {
                  this.state.ask_type === 1 ? (<Form.Item label="上传图片" extra="只传一张">
                    {/* task_material_url */}
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
                    </Upload>
                  )}
                </Form.Item>) : ''
                }

              <Form.Item label="是否多选">
                {getFieldDecorator('is_mul', {
                  initialValue: 2
                })(
                  <Radio.Group onChange={this.changeHandle}>
                    <Radio value={1}>单选</Radio>
                    <Radio value={2}>多选</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Row>
                <Col>
                  {formItems}
                </Col>
              </Row>
              <Form.Item label="添加选项">
                <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                  <Icon type="plus" /> 点击创建
                </Button>
              </Form.Item>


              <Form.Item label="影响身体部位">
                {getFieldDecorator('askPropertyListArr', {
                  rules: [
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]
                })(
                  <Checkbox.Group options={this.state.options} />
                )}
              </Form.Item>


              <Form.Item {...tailFormItemLayout}>
                <Button loading={this.state.loading} type="primary" htmlType="submit" style={{ marginRight: 20 }}>
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