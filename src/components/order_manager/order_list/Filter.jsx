import React from "react";
import { Form, Row, Col, Input, Button, Icon,DatePicker,Select } from 'antd';

const moment = require('moment');
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const Filter = Form.create()(React.createClass({
  /*
  * 原始写法组件 为了测试
  * 需要接收的 props
  *   form:{}
  *   submitSearch:{}
  * */
  handleSearch(e) {
    //获取表单所有表单数据
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //将表单值发送给父组件
      let params = {};
      params.orderState = ((values.orderState=='all'||values.orderState==undefined)?null:parseInt(values.orderState));
      params.phoneNumber = parseInt(values.phoneNumber)||null;
      params.orderNo = values.orderNo || null;
      if(values.date){
        if(values.date.length === 2){
          params.start_date = values.date[0]._d;
          params.end_date = values.date[1]._d;
        }
      }else{
        params.start_date = null;
        params.end_date = null;
      }
      this.props.submitSearch(params);
    });
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row >
          <Col span={8} key={`orderNo`}>
            <FormItem
              {...formItemLayout}
              label={`订单编号`}
            >
              {getFieldDecorator(`orderNo`)(
                <Input placeholder="请输入订单编号" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={`phoneNumber`}>
            <FormItem
              {...formItemLayout}
              label={`联系电话`}
            >
              {getFieldDecorator(`phoneNumber`)(
                <Input placeholder="请输入顾客电话" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={`date`}>
            <FormItem
              {...formItemLayout}
              label={`日期`}
            >
              {getFieldDecorator(`date`,{
                initialValue: [moment(),moment()]
              })(
                <RangePicker format="YYYY-MM-DD" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row >
          <Col span={8} key={'orderState'}>
            <FormItem
              {...formItemLayout}
              label={`订单状态`}
            >
              {getFieldDecorator('orderState')(
                <Select >
                  <Option value="all">全部</Option>
                  <Option value="0">已创建</Option>
                  <Option value="1">待发布</Option>
                  <Option value="20">已发布</Option>
                  <Option value="25">待调度</Option>
                  <Option value="-100">已关闭</Option>
                  <Option value="100">已完成</Option>
                  <Option value="-50">异常</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" style={{background:'#58e2c2',borderColor:''}}>查询</Button>
          </Col>
        </Row>
        <Row>

        </Row>
      </Form>
    );
  },
}));

export default Filter;
