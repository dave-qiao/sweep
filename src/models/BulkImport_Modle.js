
import {
  getFormWork,
  createUploadTask,
  asyncUploadFile,
  updateCreateTask,
  asyncCheckTaskState
} from "../services/BulkImport_service";

//控制轮询
let tag = false;

import { parse } from 'qs';
import  {delay} from "../utils/delay"
import {message} from "antd";
const BulkImport = {
  namespace:"bulkimport",
  //初始化的属性,传递给view的props
  state: {
    formwork:[],//总共多少个模板
    pickOnFormWork:"",//选中的当前模板 默认第一个
    path:"",   //上传后需要修改成文件名
    task_id:"",//
    token:"" ,//上传到7牛需要的token
    loading:false
  },
  //监听
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/bulk_import') {
          dispatch({
            type: 'queryFormWork',
            payload: location.query,
          });
        }else {
          //在离开当前组件的时候清缓存
          dispatch({type:"clearState"})
        }
      });
    },
  },
  //异步
  effects:{
    *queryFormWork({ payload }, { call, put,select}) {
      //获得用户信息 "全局login"
      const SELLER_ID = localStorage.getItem("seller_id");
      //获得模板
      const params =parse({seller_id:SELLER_ID});
      const {data} = yield call(getFormWork,params);
      //应对逻辑当前只有一个模板
      if(data.ok){
        const formwork = [
          {
            name:"标准模板1",
            url:data.url,
          }
        ];
        //请求模板后setState
        yield put({type:"querySuccess",payload:{formwork,pickOnFormWork:data.url}});
};
},
*createUploadTask({ payload }, { call, put,select}){
      //获得用户信息 "全局login"
      const SELLER_ID = localStorage.getItem("seller_id");
      const ACCOUNT_ID = localStorage.getItem("account_id");
      //创建上传任务
      const {data} = yield call(createUploadTask,{operator_id:ACCOUNT_ID,seller_id:SELLER_ID});
      if(data.path){
        //更新token和key
        yield put({type:"querySuccess",payload:data});
        const formdata = new FormData();
        formdata.append('key',data.path);
        formdata.append('token',data.token);
        formdata.append('file',payload.file);
        //上传文件
        yield put({type:"uploadFile",payload:formdata});
      }
      if(data.err_code == '403005'){
        message.error("商家未认证！");
      }
    },
    *updateUpLoadTask({ payload }, { call, put,select}){
      //获得用户信息 "全局login"
      const ACCOUNT_ID = localStorage.getItem("account_id");
      const params = {
        task_id:payload.task_id,
        bodyData:{
          operator_id:ACCOUNT_ID,
          upload_file_path:payload.upload_file_path
        }
      };
      //如果状态更新成功
      const {data} = yield call(updateCreateTask,params);
      if(data.ok){
        //轮询查看后端执行结果
        yield put({type:"showLoading"});
        yield put({type:"checkTaskState",payload:payload.task_id});
      }
    },
    *uploadFile({ payload }, { call, put,select}){
      const {data} = yield call(asyncUploadFile,payload);
      if(data.key){
        document.querySelector('#showUploadFile').innerHTML = `${payload.get('file').name}`;
        message.success('文件上传成功');
      }
    },
    *checkTaskState({ payload }, { call, put,select}){
      tag = false ;
      //查看任务状态 payload = task_id
      while (!tag){
        yield call(delay,1000);
        const {data}=yield call(asyncCheckTaskState,payload);
        if(data.state == 100){
          //后台完成解析
          tag = true;
          yield put({type:"hideLoading"});
          location.hash = `#/bulk_import_detail?task_id=${payload}`
        }
      }
     }
  }
  ,
  //state 生产器
  reducers:{
    querySuccess(state, action) {
      Object.assign(state,action.payload);
      return { ...state, loading: false };
    },
    updateSuccess(state, action){
      Object.assign(state,action.payload);
      return {...state,loading:false}
    },
    showLoading(state, action){
      return {...state,loading:true}
    },
    hideLoading(state, action){
      return {...state,loading:false}
    },
    clearState(state, action){
      tag = true;
      const obj = {
          formwork:[],//总共多少个模板
          pickOnFormWork:"",//选中的当前模板 默认第一个
          path:"",   //上传后需要修改成文件名
          task_id:"",//
          token:"" ,//上传到7牛需要的token
          loading:false
        };
      return {...obj};
    }
  }
};

export default BulkImport;
