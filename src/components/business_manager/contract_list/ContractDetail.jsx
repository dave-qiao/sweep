import React from "react";
import {connect} from "dva";
import {Card, Button, Link, Table, Breadcrumb,Row,Col} from "antd";
import style from "./ContractDetail.less";

const ContractDetail = function ({contractDetail}) {
  const {baseInfo} = contractDetail;

  //显示一口价
  function showStandPricePlan (list_details) {
    // 获取到定价方案对象
    const { price_plan } = list_details;
    // 获取基础定价
    const price = price_plan[0].base_price / 100;

    return (
      <div>
        <Row type="flex">
          <Col span={20} style={{lineHeight:4}}>
            <Row type="flex">
              <Col span={6} style={{textAlign:'right'}}>定价方案:</Col>
              <Col span={6}>&nbsp;{price} 元／单</Col>
            </Row>
            <Row type="flex">
              <Col span={6} style={{textAlign:'right'}}>说明:</Col>
              <Col span={6}>&nbsp;一口价，一律按订单计价，所有订单配送费不分距离、时间如：设置费用5元/单，1单配送费为5元</Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }

  function showLevelPricePlan (list_details) {
    const {price_plan} = list_details;
    if (price_plan.length) {
      let curr_time = null;
      if (price_plan) {
        curr_time = price_plan[0].time_span[0];
      }
      let [distanceData, pirceData, rowNum, colNum] = [[], [{}], 0, 0];

      price_plan.forEach((item, index) => {
        //判断是否换行 是否换列
        if (curr_time !== item.time_span[0]) {
          curr_time = item.time_span[0];
          pirceData.push({});
          colNum = 0;
          rowNum++;
        } else if (index !== 0) {
          colNum++;
        }
        if (rowNum === 0) {
          //收集第一行的距离个数
          distanceData.push(1);
        }
        ;
        pirceData[rowNum][`plan${colNum}`] = item;
      });
      let columns = distanceData.map((item, index) => {
        let _result = {
          title: '距离分段',
          dataIndex: `plan${index}`,
          key: `name_${index}`
        };
        if (index === 0) {
          _result.colSpan = distanceData.length;
          _result.render = (text, record, index2) => {
            const {max_distance, base_price} = text;
            if (index2 === 0) {
              return `小于${max_distance / 1000}km`;
            }
            ;
            return `${base_price / 100}元／${max_distance / 1000}km`;
          };
        } else {
          _result.colSpan = 0;
          _result.render = (text, record, index2) => {
            const {max_distance, min_distance, base_price, ext_price} = text;
            if (index2 === 0) {
              return `小于${max_distance / 1000}km`;
            }
            ;
            return `${base_price / 100}元／${min_distance / 1000}km + ${ext_price / 100}元／1km`;
          };
        }
        ;

        return _result;
      });


      let tableProps = {
        pagination: false,
        dataSource: [pirceData[0], ...pirceData],
        columns: [
          {
            title: '时间分段',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => {
              if (index === 0) {
                return '--';
              } else {
                const {time_span} = record.plan0;
                return `${time_span[0]}--${time_span[1]}`;
              }
              ;
            }
          },
          ...columns,
        ],
      };
      return (<Table {...tableProps}/>);
    }
  }

  //显示定价规则
  function show_price_plan(list_details) {
    // const { showStandPricePlan, showLevelPricePlan } = this;
    if(list_details.price_model == "一口价") {
      return showStandPricePlan(list_details);
    }else {
      return showLevelPricePlan(list_details);
    }
  }

  return (
    <div>
      <div style={{paddingLeft:10,paddingTop:7}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span>业务管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span><a href="#/contract_list">签约记录</a></span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>本地生活圈</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div id={style.baseInfo}>
        <div className={style.title}>基本信息</div>
        <div className={style.border}></div>
        <div>
          <Row type="flex">
            <Col span={20} style={{lineHeight:4}}>
              <Row type="flex">
                <Col span={6} style={{textAlign:'right'}}>签约ID:</Col>
                <Col span={6}>&nbsp;{baseInfo.contractId}</Col>
                <Col span={6} style={{textAlign:'right'}}>签约服务商:</Col>
                <Col span={6}>&nbsp;{baseInfo.vendorName}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign:'right'}}>业务模式:</Col>
                <Col span={6}>&nbsp;{baseInfo.biz_model}</Col>
                <Col span={6} style={{textAlign:'right'}}>配送时间:</Col>
                <Col span={6}>&nbsp;{baseInfo.delivery_time}(分钟)</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign:'right'}}>最新更新时间:</Col>
                <Col span={6}>&nbsp;{baseInfo.updated_at}</Col>
                <Col span={6} style={{textAlign:'right'}}>产品名称:</Col>
                <Col span={6}>&nbsp;{baseInfo.serviceName || '--'}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign:'right'}}>营业时间:</Col>
                <Col span={6}>&nbsp;{baseInfo.biz_time || '--'}</Col>
                <Col span={6} style={{textAlign:'right'}}>解约时间:</Col>
                <Col span={6}>&nbsp;{baseInfo.state === -100 ? baseInfo.unsigned_at : '--'}</Col>
              </Row>
            </Col>
          </Row>
        </div>
          {/*<div style={{overflow: "hidden"}}>
            <table className={style.table1}>
              <tbody>
              <tr>
                <td><b>签约服务商:</b>:</td>
                <td>{baseInfo.vendorName}</td>
              </tr>
              <tr>
                <td><b>业务模式:</b></td>
                <td>{baseInfo.biz_model}</td>
              </tr>
              <tr>
                <td><b>配送时间:</b></td>
                <td>{baseInfo.delivery_time}(分钟)</td>
              </tr>
              <tr>
                <td><b>最新更新时间:</b></td>
                <td>{baseInfo.updated_at}</td>
              </tr>
              </tbody>
            </table>
            <table className={style.table1}>
              <tbody>
              <tr>
                <td><b>产品名称:</b></td>
                <td>{baseInfo.serviceName || '--'}</td>
              </tr>
              <tr>
                <td><b>营业时间:</b></td>
                <td>{baseInfo.biz_time || '--'}</td>
              </tr>
              <tr>
                <td><b>签约时间:</b></td>
                <td>{baseInfo.created_at || '--'}</td>
              </tr>
              <tr>
                <td><b>解约时间:</b></td>
                <td>{baseInfo.state === -100 ? baseInfo.unsigned_at : '--'}</td>
              </tr>
              </tbody>
            </table>
          </div>*/}
        <div className={style.title}>产品定价</div>
        <div className={style.border}></div>
        <div>
          <div>
            <Row type="flex">
              <Col span={20} style={{lineHeight:4}}>
                <Row type="flex">
                  <Col span={6} style={{textAlign:'right'}}>定价模式:</Col>
                  <Col span={6}>&nbsp;{baseInfo.price_model}</Col>
                </Row>
                <Row type="flex">
                  <Col span={6} style={{textAlign:'right'}}>定价方案:</Col>
                  <Col span={6}>&nbsp;{baseInfo.price_plan_description}</Col>
                </Row>
              </Col>
            </Row>
          </div>
          {show_price_plan(baseInfo)}

          <div style={{textAlign: "center", marginTop: "60px"}}>
            <Button type="primary" size="large" style={{padding: "5px 100px"}}><a href="#/contract_list">返回</a></Button>
          </div>
        </div>
      </div>
    </div>
  )
};

//关联 view 和model
function mapStateToProps({contractDetail}) {
  return {contractDetail};
}

export default  connect(mapStateToProps)(ContractDetail)
