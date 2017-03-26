import React from 'react';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select, message} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Filter = Form.create()(React.createClass({

  handleSearch(e) {
    //获取表单所有表单数据
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (values.date) {
        //将表单值发送给父组件
        if (values.date.length) {
         let  _params = {
            start_date: values.date[0]._d,
            end_date: values.date[1]._d
          };
          this.props.submitSearch(_params);
        } else {
          message.error('请选择日期');
          return;
        }
      }
    });
  },

  render() {
    const dateFormat = 'YYYY-MM-DD';
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
              {getFieldDecorator(`date`, {
                initialValue: [moment(defaultTime.startDate, dateFormat), moment(defaultTime.endDate, dateFormat)]
              })(
                <RangePicker format={dateFormat} />
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
