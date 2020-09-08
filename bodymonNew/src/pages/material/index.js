import React, {Fragment} from 'react'
import { Table, Divider, Button,Modal, Form, Row, Col, Input, Select, Spin } from 'antd'
import {Link} from "react-router-dom"
import ajax from '../../aixos/axios'
import {onpage} from '../../util/utils'
import bianji from '../../static/images/bianji@2x.png'
import shanchu from '../../static/images/shanchu@2x.png'
import zhCN from 'antd/es/locale-provider/zh_CN.js';
const { confirm } = Modal;
const { Option } = Select
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 }
};



const default_task_material_type = ['', '音频', '视频', '图文']
const default_state = ['', '启用', '禁用']
class Material extends React.Component{

  state = {
    data: [],
    params: {
      task_material_name: '',
      task_material_type: '',
      task_material_state: '',
      pager_offset: 0,
      pager_openset:10
    },
    total: 0,
    loading: false,
    locale: zhCN
  }

  open = (record) => {
    let self = this
    confirm({
      title: '确认删除?',
      content: '',
      cancelText: '取消',
      onOk() {
        self.deleteHandle(record)
      }
    })
  }

  handleSearch = e => {
    let self = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let params = JSON.parse(JSON.stringify(this.state.params))
      params.pager_offset = 0
      params.task_material_name = values.task_material_name
      params.task_material_type = values.task_material_type
      params.task_material_state = values.task_material_state
      self.setState({
        params: params
      })
      self.init(params)
    });
  };

  deleteHandle = (record) => {
    let self = this
    this.setState({
      loading: true
    })
    ajax.delete('/pc/taskMaterial/delete', {task_material_code: record.task_material_code}).then((v)=>{
      this.setState({
        loading: false
      })
      self.init(this.state.params)
    }, e => {
      this.setState({
        loading: false
      })
    })
  }

  componentDidMount() {
    let params = this.state.params
    this.init(params)
  }
  init = (params) => {
    this.setState({
      loading: true
    })
    ajax.get('/pc/taskMaterial/list', params).then((v) => {
      this.setState({
        data: v.taskMateriallist,
        total: v.pager_count,
      })
      this.setState({
        loading: false
      })
    }, e => {
      this.setState({
        loading: false
      })
    })
  }


  changePage = (current) => {
    let params = JSON.parse(JSON.stringify(this.state.params))
    params.pager_offset = onpage(current)
    this.setState({
      params: params
    })
    this.init(params)
  }

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <Button>上一页</Button>;
    }
    if (type === 'next') {
      return <Button>下一页</Button>;
    }
    return originalElement;
  }
  render(){
    const columns = [
      {
        title: '封面',
        dataIndex: 'task_material_logo',
        render: task_material_logo => (
          <img src={task_material_logo} alt="" width={60} height={60} />
        )
      },
      {
        title: '素材名称',
        dataIndex: 'task_material_name'
      },
      {
        title: '素材类型',
        dataIndex: 'task_material_type',
        render: task_material_type => (
          default_task_material_type[task_material_type]
        )
      },
      {
        title: '状态',
        dataIndex: 'task_material_state',
        render: task_material_state => (
          default_state[task_material_state]
        )
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <Link to={`/task/material/materialEdit/${record.task_material_code}`}><img src={bianji} alt="" /></Link>
            <Divider type="vertical" />
            <img src={shanchu} alt="" onClick={(e) =>{this.open(record)}} />
          </span>
        ),
      },
    ];

    const { getFieldDecorator } = this.props.form;

    let paginationProps = {
      total: this.state.total,
      defaultPageSize:10,
      onChange: (current) => this.changePage(current),
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      locale: this.state.locale.Pagination,
      itemRender: this.itemRender
    }
    return (
      <Fragment>
        <Spin spinning={this.state.loading}>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} {...formItemLayout} >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label='任务素材名称'>
                {getFieldDecorator('task_material_name', {})(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='任务素材类型'>
                {getFieldDecorator('task_material_type', {})(
                  <Select placeholder="选择">
                    <Option value="">选择素材类型</Option>
                    <Option value={1}>音频</Option>
                    <Option value={2}>视频</Option>
                    <Option value={3}>图文</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='状态'>
                {getFieldDecorator('task_material_state', {})(
                    <Select placeholder="状态">
                      <Option value="">状态</Option>
                      <Option value="1">启用</Option>
                      <Option value="2">禁用</Option>
                    </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} type="primary"><Link to="/task/material/materialAdd">添加</Link></Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Table pagination={paginationProps} rowKey="task_material_code" columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalMaterial = Form.create({ name: 'normal_Material' })(Material);
export default WrappedNormalMaterial