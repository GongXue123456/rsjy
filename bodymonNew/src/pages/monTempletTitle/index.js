import React, {Fragment} from 'react'
import { Table, Divider, Button,Modal, Form, Row, Col, Spin } from 'antd'
import {Link} from "react-router-dom"
import ajax from '../../aixos/axios'
import {onpage} from '../../util/utils'
import bianji from '../../static/images/bianji@2x.png'
import shanchu from '../../static/images/shanchu@2x.png'
import zhCN from 'antd/es/locale-provider/zh_CN.js';
const { confirm } = Modal;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};



class Material extends React.Component{

  state = {
    data: [],
    params: {
      mon_templet_code: '',
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


  deleteHandle = (record) => {
    let self = this
    this.setState({
      loading: true
    })
    ajax.delete('/pc/monTempletTitle/delete', {mon_templet_title_code: record.mon_templet_title_code}).then((v)=>{
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
    params.mon_templet_code = this.props.match.params.id
    this.setState({
      bill_attr: params
    })
    
    this.init(params)
  }
  init = (params) => {
    this.setState({
      loading: true
    })
    ajax.get('/pc/monTempletTitle/list', params).then((v) => {
      this.setState({
        data: v.monTempletTitlelist,
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
        title: '题目',
        dataIndex: 'mon_templet_title_name'
      },
      {
        title: '分组',
        dataIndex: 'custom_title'
      },
      {
        title: '排序',
        dataIndex: 'sort'
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <Link to={`/test/monTemplet/monTempletTitle/monTempletTitleEdit/${record.mon_templet_title_code}`}><img src={bianji} alt="" /></Link>
            <Divider type="vertical" />
            <img src={shanchu} alt="" onClick={(e) =>{this.open(record)}} />
          </span>
        ),
      },
    ];

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
          <Row>
          <Col span={12}>
              <div className="goBack" onClick={() => {this.props.history.goBack()}}>
                返回上一级
              </div>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button style={{ marginLeft: 8 }} type="primary"><Link to={`/test/monTemplet/monTempletTitle/monTempletTitleAdd/${this.state.params.mon_templet_code}`}>添加</Link></Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Table pagination={paginationProps} rowKey="mon_templet_title_code" columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalMaterial = Form.create({ name: 'normal_Material' })(Material);
export default WrappedNormalMaterial