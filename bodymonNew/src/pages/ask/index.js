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



class Material extends React.Component{

  state = {
    data: [],
    params: {
      pro_name: '',
      ask_title: '',
      time_section: '',
      ask_type: '',
      st_type: '',
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
      let params = {}
      params.pager_offset = 0
      params.state = values.state
      params.pro_name = values.pro_name
      params.staask_titlete = values.ask_title
      params.time_section = values.time_section
      params.ask_type = values.ask_type
      params.st_type = values.st_type
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
    ajax.delete('/pc/ask/delete', {ask_code: record.ask_code}).then((v)=>{
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
    ajax.get('/pc/ask/list', params).then((v) => {
      this.setState({
        data: v.asklist,
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
    const ctime_section_fix = ['', '是', '否']
    const cst_type = ['', '睡眠', '饮食', '运动','情绪', '环境']
    const cstate = ['', '启用', '禁用']
    const cask_type = ['', '生活习惯', '小善询问']
    const columns = [
      {
        title: '封面',
        dataIndex: 'ask_logo',
        render: (ask_logo, record) => {
          if (record.ask_type === 1) {
            return <img src={ask_logo} alt="" width={60} height={60} />
          }
        }
      },
      {
        title: '职业名称',
        dataIndex: 'pro_name'
      },
      {
        title: '询问标题',
        dataIndex: 'ask_title'
      },
      {
        title: '询问类型',
        dataIndex: 'ask_type',
        render: ask_type => (
          cask_type[ask_type]
        )
      },
      {
        title: '固定时间推送',
        dataIndex: 'time_section_fix',
        render: time_section_fix => (
          ctime_section_fix[time_section_fix]
        )
      },
      {
        title: '推送项',
        dataIndex: 'st_type',
        render: st_type => (
          cst_type[st_type]
        )
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: state => (
          cstate[state]
        )
      },
      {
        title: '答题时间段',
        dataIndex: 'time_section'
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <Link to={`/ask/onask/askEdit/${record.ask_code}`}><img src={bianji} alt="" /></Link>
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
              <Form.Item label='职业名称'>
                {getFieldDecorator('pro_name', {})(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='询问标题'>
                {getFieldDecorator('ask_title', {})(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='答题时间段'>
                {getFieldDecorator('time_section', {})(
                  <Select placeholder="不限">
                    <Option value="">不限</Option>
                    <Option value="早上">早上</Option>
                    <Option value="中午">中午</Option>
                    <Option value="晚上">晚上</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='询问类型'>
                {getFieldDecorator('ask_type', {})(
                  <Select placeholder="选择">
                    <Option value="">不限</Option>
                    <Option value={1}>生活习惯</Option>
                    <Option value={2}>小善询问</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='推送项'>
                {getFieldDecorator('st_type', {})(
                  <Select placeholder="选择">
                    <Option value="1">睡眠</Option>
                    <Option value="2">饮食</Option>
                    <Option value="3">运动</Option>
                    <Option value="4">情绪</Option>
                    <Option value="5">环境</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='状态'>
                {getFieldDecorator('state', {})(
                    <Select placeholder="状态">
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
              <Button style={{ marginLeft: 8 }} type="primary"><Link to="/ask/onask/askAdd">添加</Link></Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Table pagination={paginationProps} rowKey='ask_code' columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalMaterial = Form.create({ name: 'normal_Material' })(Material);
export default WrappedNormalMaterial