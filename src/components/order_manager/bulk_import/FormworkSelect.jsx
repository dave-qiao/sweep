import React  from "react";
import { Select,Button,Tooltip,Icon} from 'antd';

const Option = Select.Option;
const tipsContent = (
  <article style={{fontSize: 12}}>
    <p><b>1.导入步骤</b></p>
    <p>1】下载订单模板到本地；</p>
    <p>2】本地填写订单信息；</p>
    <p>3】上传填有订单信息的订单文件；</p>
    <p>4】点击提交等待订单处理；</p>
    <p>5】处理成功的订单点击确认发布，订单发布成功；处理失败的订单下载修改后可重新导入；</p>
    <p style={{color: "rgb(65, 140, 175)"}}>备注：模板为新模板需删除掉举例数据；模版为历史导入记录订单文件需将导入结果行删除；</p>
    <p style={{marginTop:10}}><b>2.订单信息填写规则说明：</b></p>
    <p>1】必填项：顾客姓名、顾客电话、顾客地址、期望送达日期、期望送达时间；</p>
    <p>2】选填项：发货店铺ID、订单金额、小费、捎句话、详细地址；</p>
    <p>3】顾客地址：要求填到市区街道：如（北京市朝阳区酒仙桥兆维华灯大厦A1区3-321）；</p>
    <p>4】期望送达时间：不能早于当前时间；且减去配送时间需在签约服务商营业时间之内；</p>
    <p>5】格式说明：联系电话格式（可以是手机或者座机：例如：010-29689889；两者二选一填）；</p>
    <p>期望送达日期格式：2016/11/11;期望送达时间格式：12：30；所有金额格式需要保留到小数点后两位如：0.00；</p>
    <p>6】捎句话：限数20字内；</p>
    <p style={{marginTop:10}}><b>3.订单结算方式默认均为现金；</b></p>
  </article>);

const FormworkSelect = function ({formwork,changeFormWork,pickOnFormWork}) {

  function renderSelect(formwork) {
    if(formwork.length>0){
      let newArr = [];
      formwork.forEach(ele => {newArr.push( <Option key={ele.url} value={ele.url}>{ele.name}</Option>)});

      return (
        <Select size="large" defaultValue={formwork[0].name } style={{ width: 300 }} onChange={changeFormWork}>
          {newArr}
        </Select>);
    }
  }
  return(
    <div style={{marginBottom:60}}>
      <span>下载模板:&nbsp;&nbsp;&nbsp;</span>
      { renderSelect(formwork)}
      <Button type="primary" style={{marginLeft:30,padding:"6px 20px"}}><a href={pickOnFormWork}>下载</a></Button>&nbsp;&nbsp;
      {/*<Tooltip title={tipsContent}>
        <span><Icon type="question-circle-o" style={{fontSize:20}}/></span>
      </Tooltip>*/}
    </div>
    )
}
export default FormworkSelect;
