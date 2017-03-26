import fetch from 'dva/fetch';
const create_Head = require('./createHead');
import config from "../../config";
const baseUrl = config.prod;//线上

/*
 *封装的请求方法
 * post 用的是Json 方法
 * */
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status == 500) {
    throw("网络错误");
    return response;
  }
  /*const error = new Error(response.statusText);
   error.response = response;
   throw error;*/
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 * 封装趣活X-TOKEN X-AUTH
 * //默认请求以x-token形式 method get
 */
function request(api, options, type) {
  let _options = {...options} || {method: 'GET'};
  let _api = baseUrl + api;
  _options.headers = {};
  if (['https://up.qbox.me'].indexOf(api) !== -1) {
    _api = api;
  }
  else {
    _options.headers = create_Head(type ? 'X-AUTH' : 'X-TOKEN');
    if (_options.method !== 'GET') {
      _options.headers["Content-Type"] = "application/json";
    }
    ;
  }

  Object.assign(_options, {
    "mode": "cors",
  });
  return fetch(_api, _options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({data}))
    .catch(function (err) {
      return err
    });
}

export  default  request;
