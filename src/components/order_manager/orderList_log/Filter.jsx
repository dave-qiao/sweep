import React from "react";
import moment from 'moment';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select, message} from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Filter = Form.create()(React.createClass({
  /*
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
      if (!values.date) {
        message.error("请选择日期！");
        return;
      }
      //将表单值发送给父组件
      this.props.submitSearch(values);
    });
  },
  render() {
    const dateFormat = 'YYYY/MM/DD';
    const {getFieldDecorator} = this.props.form;
    const {defaultTime} = this.props;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    };

    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          <Col span={8} key={3}>
            <FormItem
              {...formItemLayout}
              label={`选择日期`}
            >
              {getFieldDecorator(`date`,{
                initialValue: [moment(defaultTime.startDate, dateFormat), moment(defaultTime.endDate, dateFormat)]
              })(
                <RangePicker format="YYYY-MM-DD"/>
              )}
            </FormItem>
          </Col>
          <Col span={5}>
            <Button type="primary" htmlType="submit">查询</Button>
          </Col>
        </Row>


      </Form>
    );
  },
}));

export default Filter;
