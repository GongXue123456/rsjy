import React, {Fragment} from 'react'
import { Table, Divider, Button,Modal, Form, Row, Col, Select,Input, Spin } from 'antd'
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


const default_state = ['', '启用', '禁用']
class Material extends React.Component{

  state = {
    data: [],
    params: {
      category_name: '',
      state: 0,
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
      params.category_name = values.category_name
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
    ajax.delete('/pc/monTempletCategory/delete', {mon_templet_category_code: record.mon_templet_category_code}).then((v)=>{
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
    ajax.get('/pc/monTempletCategory/list', params).then((v) => {
      this.setState({
        data: v.monTempletCategorylist,
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
        title: '饮食建议',
        dataIndex: 'category_name'
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
            <Link to={`/test/monTempletCategory/monTempletCategoryEdit/${record.mon_templet_category_code}`}><img src={bianji} alt="" /></Link>
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
          <Form.Item label="名称">
            {getFieldDecorator('category_name', {
            })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='状态'>
                {getFieldDecorator('state', {})(
                  <Select placeholder="状态">
                    <Option value="">状态</Option>
                    <Option value={1}>启用</Option>
                    <Option value={2}>禁用</Option>
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
              <Button style={{ marginLeft: 8 }} type="primary"><Link to="/test/monTempletCategory/monTempletCategoryAdd">添加</Link></Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Table pagination={paginationProps} rowKey="mon_templet_category_code" columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalMaterial = Form.create({ name: 'normal_Material' })(Material);
export default WrappedNormalMaterial