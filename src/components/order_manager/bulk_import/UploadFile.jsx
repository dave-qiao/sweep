import React  from "react";
import {Upload, message, Button, Icon, Form} from 'antd';

import style from "./BulkImport.less";

const UploadFile = function ({path, task_id, dispatch, form}) {
    //上传组件
    const props = {
      name: "file",
      action:"",
      showUploadList:false,
      beforeUpload(file) {
        const isExcel = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
          message.error('只能上传.xlsx文件');
          return;
        }
        //如果文件正确则创建任务
        dispatch({type: "bulkimport/createUploadTask", payload: {file: file}})
      },
    };

    return (
      <section id={style.upload} style={{marginBottom: 60}}>
       <span>
       上传文件:&nbsp;&nbsp;&nbsp;
       </span>
        <Upload {...props} >
          <Button type="ghost" className={style.ant_btn_ghost}>
            <Icon type="upload"/>
            请选择上传文件
          </Button>
        </Upload>
        <section style={{fontSize:12,marginLeft:74,marginTop:10}} id="showUploadFile"></section>
      </section>
    )
  }

export default UploadFile;

