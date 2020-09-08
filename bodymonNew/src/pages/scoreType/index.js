import React, {Fragment} from 'react'
import { Table, Divider, Button,Modal, Form, Row, Col, Select, Spin } from 'antd'
import {Link} from "react-router-dom"
import ajax from '../../aixos/axios'
import {onpage} from '../../util/utils'
import bianji from '../../static/images/bianji@2x.png'
import shanchu from '../../static/images/shanchu@2x.png'
import zhCN from 'antd/es/locale-provider/zh_CN.js';
const { confirm } = Modal;
const { Option } = Select
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};


const default_score_type_type = ['', '睡眠', '饮食', '运动', '情绪', '环境']
class Material extends React.Component{

  state = {
    data: [],
    params: {
      score_type_type: '',
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
      params.score_type_type = values.score_type_type
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
    ajax.delete('/pc/scoreType/delete', {score_type_code: record.score_type_code}).then((v)=>{
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
    ajax.get('/pc/scoreType/list', params).then((v) => {
      this.setState({
        data: v.scoreTypelist,
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
        dataIndex: 'analyse_advise'
      },
      {
        title: '类型',
        dataIndex: 'score_type_type',
        render: score_type_type => (
          default_score_type_type[score_type_type]
        )
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <Link to={`/ask/scoreType/scoreTypeEdit/${record.score_type_code}`}><img src={bianji} alt="" /></Link>
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
              <Form.Item label='类型'>
                {getFieldDecorator('score_type_type', {})(
                  <Select placeholder="类型">
                  <Option value="">类型</Option>
                  <Option value={1}>睡眠</Option>
                  <Option value={2}>饮食</Option>
                  <Option value={3}>运动</Option>
                  <Option value={4}>情绪</Option>
                  <Option value={5}>环境</Option>
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
              <Button style={{ marginLeft: 8 }} type="primary"><Link to="/ask/scoreType/scoreTypeAdd">添加</Link></Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Table pagination={paginationProps} rowKey="score_type_code" columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalMaterial = Form.create({ name: 'normal_Material' })(Material);
export default WrappedNormalMaterial