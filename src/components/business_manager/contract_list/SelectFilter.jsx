import React from "react";
import { Select} from 'antd';
const Option = Select.Option;

//onChange={handleChange}
const SelectFilter = function ({selectFilter}) {
  return (
    <div style={{padding:10}}>
      <Select defaultValue="签约" style={{ width: 200 }} onChange={selectFilter}>
        <Option value="all">全部</Option>
        <Option value="sign">签约</Option>
        <Option value="unsign">解约</Option>
      </Select>
    </div>
  )
};
export default SelectFilter;
