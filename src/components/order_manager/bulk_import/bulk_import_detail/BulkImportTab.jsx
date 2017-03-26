import React from "react";
import {Tabs, Button} from 'antd';

const TabPane = Tabs.TabPane;
const TabControl = function ({detailSuccessList, detailFailList, activeKey, changeTab}) {
  const panes = [
    {title: '预处理成功', content: detailSuccessList, key: 'success'},
    {title: '预处理失败', content: detailFailList, key: 'fail'},
  ];
  return (
    <div>
      <Tabs
        onChange={changeTab}
        activeKey={activeKey}
        type="card"
      >
        {panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
      </Tabs>
    </div>
  )
};


export default TabControl;
