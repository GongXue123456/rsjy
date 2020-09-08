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

class Home extends React.Component{
  userType = ['','超级管理员','平台管理员','APP用户']
  userState = ['', '启用', '禁用']
  state = {
    data: [],
    params: {
      user_name: '',
      type: '',
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
      params.user_name = values.user_name
      params.type = values.type
      params.state = values.state
      self.setState({
        params: params
      })
      self.init(params)
    });
  };
  deleteHandle = (record) => {
    this.setState({
      loading: true
    })
    let self = this
    ajax.delete('/pc/user/delete', {user_code: record.user_code}).then((v)=>{
      this.setState({
        loading: false
      })
      console.log(this.state.params)
      self.init(this.state.params)
    }, (err) =>{
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
    ajax.get('/pc/user/list', params).then((v) => {
      this.setState({
        data: v.userlist,
        total: v.pager_count,
        loading: false
      })
    }, (err) => {
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
        title: '用户名',
        dataIndex: 'login_name',
      },
      {
        title: '用户类型',
        dataIndex: 'type',
        render: (type) => (
          this.userType[type]
        )
      },
      {
        title: '用户状态',
        dataIndex: 'state',
        render: (state) => (
          this.userState[state]
        )
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <Link to={`/home/user/userEdit/${record.user_code}`}><img src={bianji} alt="" /></Link>
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
        <Spin size="large" spinning={this.state.loading}>
          <Form  className="ant-advanced-search-form" onSubmit={this.handleSearch} {...formItemLayout} >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label='用户名'>
                  {getFieldDecorator('user_name', {})(<Input placeholder="用户名" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='类型'>
                  {getFieldDecorator('type', {})(
                    <Select placeholder="用户类型">
                      <Option value="">用户类型</Option>
                      <Option value="1">超级管理员</Option>
                      <Option value="2">平台管理员</Option>
                      <Option value="3">APP用户</Option>
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
                <Button style={{ marginLeft: 8 }} type="primary"><Link to="/home/user/userAdd">添加用户</Link></Button>
              </Col>
            </Row>
          </Form>
          <Divider />
          <Table pagination={paginationProps} rowKey="login_name" columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalHome = Form.create({ name: 'normal_Home' })(Home);
export default WrappedNormalHome