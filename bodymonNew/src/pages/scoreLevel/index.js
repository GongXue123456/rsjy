import React, {Fragment} from 'react'
import { Table, Divider, Button,Modal, Form, Row, Col, Input, Spin } from 'antd'
import {Link} from "react-router-dom"
import ajax from '../../aixos/axios'
import {onpage} from '../../util/utils'
const { confirm } = Modal;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};



class Material extends React.Component{

  state = {
    data: [],
    params: {
      score_level_name: '',
      pager_offset: 0,
      pager_openset:10
    },
    total: 0,
    loading: false
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
      params.warn_type = values.warn_type
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
    ajax.delete('/pc/scoreLevel/delete', {score_level_code: record.score_level_code}).then((v)=>{
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
    ajax.get('/pc/scoreLevel/list', params).then((v) => {
      this.setState({
        data: v.scoreLevellist,
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
  render(){
    const columns = [
      {
        title: '得分等级名称',
        dataIndex: 'score_level_name'
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <Button><Link to={`/score/scoreEdit/${record.score_level_code}`}>编辑</Link></Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={(e) =>{this.open(record)}}>删除</Button>
          </span>
        ),
      },
    ];

    const { getFieldDecorator } = this.props.form;

    let paginationProps = {
      total: this.state.total,
      defaultPageSize:10,
      onChange: (current) => this.changePage(current)
    }
    return (
      <Fragment>
        <Spin spinning={this.state.loading}>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} {...formItemLayout} >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label='得分等级名称'>
                {getFieldDecorator('score_level_name', {})(
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
              <Button style={{ marginLeft: 8 }} type="primary"><Link to="/score/scoreAdd">添加</Link></Button>
            </Col>
          </Row>
        </Form>
        <Table pagination={paginationProps} rowKey="score_level_code" columns={columns} dataSource={this.state.data} />
        </Spin>
      </Fragment>
    )
  }
}


const WrappedNormalMaterial = Form.create({ name: 'normal_Material' })(Material);
export default WrappedNormalMaterial