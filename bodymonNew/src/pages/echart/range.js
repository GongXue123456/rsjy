import React, { Fragment } from "react"
import {  Divider, Button, Form, Row, Col, Select, DatePicker  } from 'antd'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import ajax from '../../aixos/axios'
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { RangePicker } = DatePicker;
const { Option } = Select
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 }
};
class Range extends React.Component{
  state = { 
    params: {
      device_type: 2,
    },
    userlist: [],
    deviceHrList: [],
    deviceOxygenList: [],
    deviceStepList: [],
    deviceTempList: [],
  };
  componentDidMount() {
    let params = this.state.params
    this.init(params)
  }
  init = (params) => {
    ajax.get('pc/user/device_user', params).then((v) => {
      this.setState({
        userlist: v.userlist
      })
    }, (err) => {

    })
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let params = {
          user_code: values.user_code,
          begin_time: values.dateString[0].format('YYYY-MM-DD hh:mm:ss'),
          end_time: values.dateString[1].format('YYYY-MM-DD hh:mm:ss')
        }
        ajax.get("pc/wristband/range", params).then(v => {
          this.setState({
            deviceHrList: v.deviceHrList,
            deviceOxygenList: v.deviceOxygenList,
            deviceStepList: v.deviceStepList,
            deviceTempList: v.deviceTempList
          })
        })
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const hrData = {
      sel_time: {
        type: 'timeCat',
        alias: '日期'
      },
      hr: {
        alias: '心率'
      }
    };
    const oxygenData = {
      sel_time: {
        type: 'timeCat',
        alias: '日期'
      },
      oxygen: {
        alias: '血压'
      }
    };

    const stepData = {
      sel_time: {
        type: 'timeCat',
        alias: '日期'
      },
      step_number: {
        alias: '步数'
      }
    };

    const tempData = {
      sel_time: {
        type: 'timeCat',
        alias: '日期'
      },
      temp: {
        alias: '体温'
      }
    };

    return (
      <Fragment>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} {...formItemLayout} >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label='选择用户'>
                {getFieldDecorator('user_code', {
                  rules: [
                    {
                      required: true,
                      message: '请选择用户!',
                    },
                  ]
                })(
                  <Select placeholder="请选择">
                    {this.state.userlist.map(v => (
                        <Option key={v.user_code} value={v.user_code}>{v.login_name}-{v.user_name}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={16} >
              <Form.Item label='选择时间区间'>
              {getFieldDecorator('dateString', {
                  rules: [
                    {
                      required: true,
                      message: '必须选择时间段!',
                    },
                  ]
                })(
                  <RangePicker locale={locale} format="YYYY-MM-DD hh:mm:ss" renderExtraFooter={() => 'extra footer'} showTime />
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
            </Col>
          </Row>
        </Form>
        <Divider />
        <div>
          <Chart height={400} data={this.state.deviceHrList} scale={hrData} forceFit={true} >
            <Axis name="hr" title="心率" />
            <Axis name="sel_time" title="时间"  />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="sel_time*hr" color='#21cfae' />
          </Chart>
        </div>
        <div>
          <Chart height={400} data={this.state.deviceOxygenList} scale={oxygenData} forceFit={true} >
            <Axis name="oxygen" title="血压" />
            <Axis name="sel_time" title="时间" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="sel_time*oxygen" color='#21cfae' />
          </Chart>
        </div>
        <div>
          <Chart height={400} data={this.state.deviceStepList} scale={stepData} forceFit={true} >
            <Axis name="step_number" title="步数" />
            <Axis name="sel_time" title="时间" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="sel_time*step_number" color='#21cfae' />
          </Chart>
        </div>
        <div>
          <Chart height={400} data={this.state.deviceTempList} scale={tempData} forceFit={true} >
            <Axis name="temp" title="体温" />
            <Axis name="sel_time" title="时间" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="sel_time*temp" color='#21cfae' />
          </Chart>
        </div>
      </Fragment>
    )
  }
}
const WrappedNormalMaterial = Form.create({ name: 'normal_Material' })(Range);
export default WrappedNormalMaterial