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
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};


const default_property_sex = ['', '男', '女', '不限']
const default_state = ['', '启用', '禁用']
class Body extends React.Component{

  state = {
    data: [],
    params: {
      property_name: '',
      property_sex: '',
      state: '',
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
      params.property_name = values.property_name
      params.property_sex = values.property_sex
      params.state = values.state
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
    ajax.delete('/pc/property/delete', {property_code: record.property_code}).then((v)=>{
      this.setState({
        loading: false
      })
      self.init(this.state.params)
    }, err => {
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
    ajax.get('/pc/property/list', params).then((v) => {
      this.setState({
        data: v.propertylist,
        total: v.pager_count,
      }, (err) => {
        this.setState({
          loading: false
        })
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
        title: '身体状况',
        dataIndex: 'property_name'
      },
      {
        title: '性别',
        dataIndex: 'property_sex',
        render: property_sex => (
          default_property_sex[property_sex]
        )
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: state => (
          default_state[state]
        )
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <Link to={`/body/body/bodyEdit/${record.property_code}`}><img src={bianji} alt="" /></Link>
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
                <Form.Item label='身体状况'>
                  {getFieldDecorator('property_name', {})(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='性别'>
                  {getFieldDecorator('property_sex', {})(
                    <Select placeholder="性别">
                      <Option value="">用户性别</Option>
                      <Option value="1">男</Option>
                      <Option value="2">女</Option>
                      <Option value="3">不限</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='状态'>
                  {getFieldDecorator('state', {})(
                      <Select placeholder="用户状态">
                        <Option value="">用户状态</Option>
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
                <Button style={{ marginLeft: 8 }} type="primary"><Link to="/body/body/bodyAdd">添加</Link></Button>
              </Col>
            </Row>
          </Form>
          <Divider />
          <Table pagination={paginationProps} rowKey="property_code" columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalBody = Form.create({ name: 'normal_Body' })(Body);
export default WrappedNormalBody