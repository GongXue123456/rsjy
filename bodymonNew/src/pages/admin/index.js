import React from 'react'
import { Layout, Menu, Avatar, Dropdown, Icon, Row, Col } from 'antd';
import {Link} from "react-router-dom"
import {local} from '../../util/utils'
import './index.less'
import shezhi from '../../static/images/shezhi@2x.png'
import tongzhi from '../../static/images/tongzhi@2x.png'

// import ajax from '../../aixos/axios'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Admin extends React.Component{

  state = {
    collapsed: false,
    selectedKeys: [],
    defaultOpenKeys: [],
    username: '',
    user_logo: ''
  };

  handleClick = ({ item, key }) => {
    this.setState({
      selectedKeys: [key]
    })
  }

  onOpenChange = (arr) => {
    this.setState({
      defaultOpenKeys: arr
    })
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount () {
    this.getUserName()
    this.getActive()
  }
  getActive = () => {
    let href = window.location.href
    let str = href.split('/#')[1].split('/')[1]
    let str2 = href.split('/#')[1].split('/')[2]
    this.setState({
      selectedKeys: [str2],
      defaultOpenKeys: [str]
    })
  } 

  getUserName = () => {
    let userinfo = local.get('userinfo')
    if (userinfo) {
      this.setState({
        username: userinfo.user_name,
        user_logo: userinfo.user_logo
      })
    } else {
      local.clear()
      return false
    }
  }

  logout = () => {
    local.clear()
    window.location.href="#/login"
    // let userinfo = local.get('userinfo')
    // let user_code = userinfo.user_code
    // ajax.post('/pc/user/loginout', {user_code: user_code})
  }

  render () {
    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.logout}>
           退出
          </span>
        </Menu.Item>
      </Menu>
    );
    
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="admin-header">
        <Row>
          <Col span={12} style={{fontSize: 18,paddingLeft: 25}}>元绪健康管理平台</Col>
          <Col span={12}>
            <div style={{'textAlign': 'right','paddingRight': '35px'}}>
              <div style={{display: 'inline-block'}}>
                <img src={shezhi} alt="" />
              </div>
              <div style={{display: 'inline-block',margin: '0 28px'}}>
                <img src={tongzhi} alt="" />
              </div>
              <Dropdown overlay={menu}>
                <span className="ant-dropdown-link">
                  用户名称: {this.state.username} <Icon type="down" />
                </span>
              </Dropdown>
              <Avatar style={{marginLeft: 20}} icon="user" srcSet={this.state.user_logo} />
            </div>
          </Col>
        </Row>

        </Header>

        <Layout>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ background: '#fff' }}>
            <div className="logo" />
            
            <Menu onOpenChange={this.onOpenChange} openKeys={this.state.defaultOpenKeys} onClick={this.handleClick} selectedKeys={this.state.selectedKeys} mode="inline">
              <SubMenu
                key="home"
                title={
                  <span>
                    <span className="iconfont">&#xe626;</span>&nbsp;
                    <span>系统管理</span>
                  </span>
                }
              >
              
                <Menu.Item key="user">
                  <span className="iconfont">&#xe64e;</span>&nbsp;
                  <span><Link to="/home/user/index"> 用户管理</Link></span>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="body">
              <span className="iconfont">&#xe636;</span>&nbsp;
                <span><Link to="/body/body/index"> 身体状况 </Link></span>
              </Menu.Item>

              <Menu.Item key="scoreManage">
                <span className="iconfont">&#xe6fd;</span>&nbsp;
                <span><Link to="/scoreManage/scoreManage/index"> 每日总分结果管理 </Link></span>
              </Menu.Item>

              <SubMenu
                key="task"
                title={
                  <span>
                    <span className="iconfont">&#xe647;</span>&nbsp;
                    <span>任务管理</span>
                  </span>
                }
              >
                <Menu.Item key="material">
                  <span className="iconfont">&#xe620;</span>&nbsp;
                  <span><Link to="/task/material/index"> 任务素材 </Link></span>
                </Menu.Item>
                <Menu.Item key="ontask">
                <span className="iconfont">&#xe60b;</span>&nbsp;
                  <span><Link to="/task/ontask/index"> 任务 </Link></span>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="test"
                title={
                  <span>
                    <span className="iconfont">&#xe693;</span>&nbsp;
                    <span>测评管理</span>
                  </span>
                }
              >
                <Menu.Item key="monTempletCategory">
                  <span className="iconfont">&#xe625;</span>&nbsp;
                  <span><Link to="/test/monTempletCategory/index"> 测试模板分类 </Link></span>
                </Menu.Item>
                <Menu.Item key="monTemplet">
                <span className="iconfont">&#xe76a;</span>&nbsp;
                  <span><Link to="/test/monTemplet/index"> 测试模板 </Link></span>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="device"
                title={
                  <span>
                   
                    <span className="iconfont">&#xe837;</span>&nbsp;
                    <span>设备管理</span>
                  </span>
                }
              >
                <Menu.Item key="manage">
                <span className="iconfont">&#xe619;</span>&nbsp;
                  <span><Link to="/device/manage/index"> 设备任务 </Link></span>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="ask"
                title={
                  <span>
                    
                    <span className="iconfont">&#xe628;</span>&nbsp;
                    <span>询问管理</span>
                  </span>
                }
              >
                <Menu.Item key="onask">
                <span className="iconfont">&#xe600;</span>&nbsp;
                
                  <span><Link to="/ask/onask/index"> 询问情况 </Link></span>
                </Menu.Item>
                <Menu.Item key="remind">
                <span className="iconfont">&#xe638;</span>&nbsp;
                  <span><Link to="/ask/remind/index"> 提醒 </Link></span>
                </Menu.Item>
                <Menu.Item key="scoreType">
                <span className="iconfont">&#xe61b;</span>&nbsp;
                  <span><Link to="/ask/scoreType/index"> 五项得分结果管理 </Link></span>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="echart"
                title={
                  <span>
                    
                    <span className="iconfont">&#xe628;</span>&nbsp;
                    <span>数据报表</span>
                  </span>
                }
              >
                <Menu.Item key="range">
                <span className="iconfont">&#xe600;</span>&nbsp;
                
                  <span><Link to="/echart/range"> 手环数据 </Link></span>
                </Menu.Item>
              </SubMenu>

  {/* 
              <Menu.Item key="score">
                <span><Link to="/score/index"> 得分等级 </Link></span>
              </Menu.Item> */}


              {/* <Menu.Item key="message">
                <span><Link to="/message"> 发送消息 </Link></span>
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Content style={{ margin: '16px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, borderRadius: 5 }}>
              {this.props.children}
            </div>
            <Footer style={{ textAlign: 'center' }}>元绪健康管理平台</Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Admin