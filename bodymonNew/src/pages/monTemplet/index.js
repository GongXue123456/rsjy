import React, {Fragment} from 'react'
import { Table, Divider, Button,Modal, Form, Row, Col,Input, Spin } from 'antd'
import {Link} from "react-router-dom"
import ajax from '../../aixos/axios'
import {onpage} from '../../util/utils'
import bianji from '../../static/images/bianji@2x.png'
import shanchu from '../../static/images/shanchu@2x.png'
import zhCN from 'antd/es/locale-provider/zh_CN.js';
const { confirm } = Modal;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};



class Material extends React.Component{

  state = {
    data: [],
    params: {
      mon_templet_name: '',
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
      params.mon_templet_name = values.mon_templet_name
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
    ajax.delete('/pc/monTemplet/delete', {mon_templet_code: record.mon_templet_code}).then((v)=>{
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
    ajax.get('/pc/monTemplet/list', params).then((v) => {
      this.setState({
        data: v.monTempletlist,
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
        dataIndex: 'mon_templet_logo',
        render: mon_templet_logo => (
          <img src={mon_templet_logo} alt="" width={60} height={60} />
        )
      },
      {
        title: '测试模板表名',
        dataIndex: 'mon_templet_name'
      },
      {
        title: '描述',
        state: 'mon_templet_desc'
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <Button><Link to={`/test/monTemplet/monTempletResult/index/${record.mon_templet_code}`}>添加模板结果</Link></Button>
            <Divider type="vertical" />
            <Button><Link to={`/test/monTemplet/monTempletTitle/index/${record.mon_templet_code}`}>添加模板题目</Link></Button>
            <Divider type="vertical" />
            <Link to={`/test/monTemplet/monTempletEdit/${record.mon_templet_code}`}><img src={bianji} alt="" /></Link>
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
              <Form.Item label="测试模板表名称">
                {getFieldDecorator('mon_templet_name', {
                })(
                  <Input placeholder="请输入" />
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
              <Button style={{ marginLeft: 8 }} type="primary"><Link to="/test/monTemplet/monTempletAdd">添加</Link></Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Table pagination={paginationProps} rowKey="mon_templet_code" columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalMaterial = Form.create({ name: 'normal_Material' })(Material);
export default WrappedNormalMaterial