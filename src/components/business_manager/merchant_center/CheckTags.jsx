//获取 审核组件

import React from "react";
import style from "./CheckTags.less";

export const ChecKTag = function ({verify_state}) {
  function getCheckStatusUI(verify_state) {
    switch (verify_state){
      case 100:
        return{
          status:"pass",
          text:"已审核"
        };
        break;
      case 0:
        return{
          status:"notsubmit",
          text:"待提交"
        };
        break;
      case 1:
        return{
          status:"waitCheck",
          text:"待审核"
        };
        break;
      case -100:
        return{
          status:"checkFail",
          text:"已驳回"
        };
        break;
      default:
        return{
          status:"waitCheck",
          text:"暂无"
        }
    }
  };
  const obj = getCheckStatusUI(verify_state);
  return(
    <div id={style.tag}>
      <section className={style[obj.status]} >
        {obj.text}
      </section>
    </div>
  )
};
